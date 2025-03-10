import { defineStore } from 'pinia'
import { useUserStore } from '@/stores/userStore'
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
  onSnapshot
} from 'firebase/firestore'
import { db, storage } from '@/plugins/firebase'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { useNotificationsStore } from '@/stores/notificationsStore'

export const useEntryFormStore = defineStore('entryFormStore', {
  state: () => ({
    formData: {},
    entries: [],
    hasEntryChanged: false,
    editModeToggle: false,
    selectionIds: new Map(), // Putting selections here because it might be used for multiple features (breeding, comparison, etc)
    isDoneLoadingEntries: null,
    showBottomSheet: false,
    attachments: [],
    filterByFavoriteAndFoundation: false
  }),
  getters: {
    disableBottomSheetButton: (state) => state.selectionIds.size !== 2,
    filteredEntriesForMotherDropdown: (state) => {
      const baseFilter = state.filterByFavoriteAndFoundation
        ? state.entries.filter((e) => e.isFoundation || e.isFavorited)
        : state.entries

      return baseFilter.filter((e) => e.sex === 'female')
    },
    filteredEntriesForFatherDropdown: (state) => {
      const baseFilter = state.filterByFavoriteAndFoundation
        ? state.entries.filter((e) => e.isFoundation || e.isFavorited)
        : state.entries

      return baseFilter.filter((e) => e.sex === 'male')
    }
  },
  actions: {
    // **🔥 Use VueFire to Make Queries Reactive**
    setupEntriesListener() {
      const userStore = useUserStore()
      const notificationsStore = useNotificationsStore()
      const flockId = userStore.getUserUid
      if (!flockId || this.isListening) return

      const entriesCollection = collection(db, 'flocks', flockId, 'entries')

      this.isListening = true // ✅ Mark as active listener  GPT says to do this?

      onSnapshot(
        entriesCollection,
        (querySnapshot) => {
          console.log('🔄 Firestore updated, syncing entries...', querySnapshot)

          const updatedEntriesMap = new Map()
          const currentIds = new Set(this.entries.map((e) => e.entryId))

          // Listener that is always running
          querySnapshot.docChanges().forEach((change) => {
            // unpack entries and attach imageGetter
            const newEntry = {
              entryId: change.doc.id,
              ...change.doc.data(),
              imageUrlGetter: (entry) => this.getEntryImageUrls(entry)
            }

            console.log('change!', change)
            updatedEntriesMap.set(newEntry.entryId, newEntry)

            const handlers = {
              added: () => {
                if (!currentIds.has(newEntry.entryId)) {
                  this.entries.push(newEntry)
                  notificationsStore.addNotification('found', newEntry.entryId)
                }
              },
              modified: () => {
                const existingEntry = this.entries.find(
                  (e) => e.entryId === newEntry.entryId
                )
                if (existingEntry) {
                  Object.assign(existingEntry, newEntry) // Keeps Vue reactivity
                  notificationsStore.addNotification(
                    'update',
                    existingEntry.entryId
                  )
                }
              },
              removed: () => {
                this.entries = this.entries.filter(
                  (e) => e.entryId !== newEntry.entryId
                )
                notificationsStore.addNotification('removed', newEntry.entryId)
              }
            }

            // Execute object literal logic
            handlers[change.type]?.()
          })
          this.isDoneLoadingEntries = true
        },
        (error) => {
          notificationsStore.addNotification('error')
          console.error('Error fetching entries:', error)
        }
      )
      console.log('this.entries', this.entries)
    },
    clearFormData() {
      this.formData = {}
    },
    async removeThisEntry(entryId) {
      const isConfirmed =
        await useNotificationsStore().waitForDeleteConfirmationResponse()
      if (!isConfirmed) return

      const userStore = useUserStore()
      const flockId = userStore.getUserUid

      // Create reference to the nested document
      const entryRef = doc(db, 'flocks', flockId, 'entries', entryId)

      await deleteDoc(entryRef)
    },
    async foundationThisEntry(entryId, isFoundation) {
      const userStore = useUserStore()
      const flockId = userStore.getUserUid

      // Create reference to the nested document
      const entryRef = doc(db, 'flocks', flockId, 'entries', entryId)

      await updateDoc(entryRef, {
        isFoundation: !isFoundation,
        updatedAt: new Date()
      })
    },
    async favoriteThisEntry(entryId, isFavorite) {
      const userStore = useUserStore()
      const flockId = userStore.getUserUid

      // Create reference to the nested document
      const entryRef = doc(db, 'flocks', flockId, 'entries', entryId)

      await updateDoc(entryRef, {
        isFavorited: !isFavorite,
        updatedAt: new Date()
      })
    },
    getEntryById(entryId) {
      // When we do this, also append the selected entry to formData
      // this allows hydration of the form from top down...
      // this.formData =
      return this.entries.find((entry) => entry.entryId === entryId)
    },
    async getEntryImageUrls(entry) {
      const userStore = useUserStore()
      const flockId = userStore.getUserUid
      const { entryId } = entry
      const imageId = entry?.photoIds?.[0] ?? null

      if (!imageId) {
        entry.imageUrl = 'https://cdn.vuetifyjs.com/images/cards/docks.jpg'
        return
      }

      try {
        const storageRef = ref(storage, `${flockId}/${entryId}/${imageId}.jpg`)
        entry.imageUrl = await getDownloadURL(storageRef)
      } catch (error) {
        console.error('Error fetching image URL:', error)
        return ''
      }
    },
    async saveEntryToDb() {
      const userStore = useUserStore()
      const flockId = userStore.getUserUid

      // check to see if attachments are being added
      // We need to break this up and do this now in order to insert this value into the entriesCollection DB
      // If we don't do this before & after we would have to make 2 queries.
      if (this.attachments.length > 0) {
        this.formData.photoIds = [crypto.randomUUID()]
      }

      const flockDocRef = await doc(db, 'flocks', flockId)
      const entriesCollectionRef = collection(flockDocRef, 'entries')
      const { entryId } = await addDoc(entriesCollectionRef, this.formData)

      // Now upload file
      if (this.attachments.length > 0) {
        await this.uploadImages(flockId, entryId, this.formData.photoIds[0])
      }
    },
    async updateEntryInDb(entryId) {
      console.log('entryId ', entryId)
      const userStore = useUserStore()
      const flockId = userStore.getUserUid
      const entryShallowCopy = this.getEntryById(entryId)

      // Create reference to the nested document
      const entryRef = doc(db, 'flocks', flockId, 'entries', entryId)

      // Cannot append functions to firestore, this gets re-added
      // TODO: probably a better way to do this
      delete entryShallowCopy.imageUrlGetter

      await updateDoc(entryRef, {
        ...entryShallowCopy, // todo this is only temp
        updatedAt: new Date()
      })

      this.editModeToggle = false
    },
    async uploadImages(flockId, entryId, uniqueId) {
      // Now upload file
      // TODO: Convert this to unpacking method to hydrate the apps cards
      const storageRef = ref(storage, `${flockId}/${entryId}/${uniqueId}.jpg`)

      // For now, only handle 1 gracefully...
      await uploadBytes(storageRef, this.attachments[0])

      // const ref = storageRef(storage, `${flockId}/${entryId}/${this.formData.photoIds[0]}`)
      const url = await getDownloadURL(storageRef)
    }
  }
})
