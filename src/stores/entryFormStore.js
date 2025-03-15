import { defineStore } from 'pinia'
import { useUserStore } from '@/stores/userStore'
import {
  collection,
  deleteDoc,
  doc,
  updateDoc,
  onSnapshot,
  setDoc,
  Timestamp,
  serverTimestamp
} from 'firebase/firestore'
import { db, storage } from '@/plugins/firebase'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { useNotificationsStore } from '@/stores/notificationsStore'
import { notesValidator } from '@/utils/generalUtils.js'

export const useEntryFormStore = defineStore('entryFormStore', {
  state: () => ({
    formData: {
      notes: {
        active: [],
        archived: []
      }
    },
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
    // Gets the firestore document REF
    getEntryRef: () => {
      return (entryId) =>
        doc(db, 'flocks', useUserStore().getUserUid, 'entries', entryId)
    },
    disableBottomSheetButton: (state) => state.selectionIds.size !== 2
  },
  actions: {
    filterEntryListBy(sex) {
      // quick conversion for display purposes...
      const valToUse = sex === 'mother' ? 'female' : 'male'

      const baseFilter = this.filterByFavoriteAndFoundation
        ? this.entries.filter((e) => e.isFoundation || e.isFavorited)
        : this.entries

      return baseFilter.filter((e) => e.sex === valToUse)
    },

    // **🔥 Use VueFire to Make Queries Reactive**
    setupEntriesListener() {
      const notificationsStore = useNotificationsStore()
      const flockId = useUserStore().getUserUid
      if (!flockId || this.isListening) return

      const entriesCollection = collection(db, 'flocks', flockId, 'entries')

      this.isListening = true // ✅ Mark as active listener  GPT says to do this?

      onSnapshot(
        entriesCollection,
        (querySnapshot) => {
          const updatedEntriesMap = new Map()
          const currentIds = new Set(this.entries.map((e) => e.entryId))

          // Listener that is always running
          querySnapshot.docChanges().forEach((change) => {
            // unpack entries and attach imageGetter
            const entry = {
              entryId: change.doc.id,
              ...change.doc.data(),
              notes: notesValidator(change.doc.data().notes), // Ensure notes field exists & fixes if broken/old
              imageUrlGetter: (entry) => this.getEntryImageUrls(entry)
            }

            updatedEntriesMap.set(entry.entryId, entry)

            const handlers = {
              added: () => {
                if (!currentIds.has(entry.entryId)) {
                  this.entries.push(entry)
                  notificationsStore.addNotification('found', entry.entryId)
                }
              },
              modified: () => {
                const existingEntry = this.entries.find(
                  (e) => e.entryId === entry.entryId
                )
                // IMPORTANT! Keeps Vue reactivity, especially with arrays and nested data.
                Object.assign(existingEntry, entry)
                notificationsStore.addNotification(
                  'update',
                  existingEntry.entryId
                )
              },
              removed: () => {
                this.entries = this.entries.filter(
                  (e) => e.entryId !== entry.entryId
                )
                notificationsStore.addNotification('removed', entry.entryId)
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
    },
    clearFormData() {
      this.formData = {}
    },
    async removeThisEntry(entryId) {
      const isConfirmed =
        await useNotificationsStore().waitForDeleteConfirmationResponse()
      if (!isConfirmed) return

      await deleteDoc(this.getEntryRef(entryId))
    },
    async foundationThisEntry(entryId, isFoundation) {
      await updateDoc(this.getEntryRef(entryId), {
        isFoundation: !isFoundation,
        updatedAt: new Date()
      })
    },
    async favoriteThisEntry(entryId, isFavorite) {
      await updateDoc(this.getEntryRef(entryId), {
        isFavorited: !isFavorite,
        updatedAt: new Date()
      })
    },
    getEntryById(entryId) {
      return this.entries.find((entry) => entry.entryId === entryId)
    },
    async updateEntryInDb(entryId) {
      const timestamp = Timestamp.now()
      const entryLocalCopy = this.getEntryById(entryId)

      // Cannot append functions to firestore, this gets re-added
      delete entryLocalCopy.imageUrlGetter

      // before write to DB, manage notes appropriately
      if (entryLocalCopy.notes.active.length > 0) {
        entryLocalCopy.notes.archived.push({
          timestamp,
          content: entryLocalCopy.notes.active
        })
        entryLocalCopy.notes.active = ''
      }

      await updateDoc(this.getEntryRef(entryId), {
        ...entryLocalCopy,
        updatedAt: timestamp
      })

      this.editModeToggle = false
    },
    async getEntryImageUrls(entry) {
      const flockId = useUserStore().getUserUid
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
      const flockId = useUserStore().getUserUid

      // check to see if attachments are being added
      // We need to break this up and do this now in order to insert this value into the entriesCollection DB
      // If we don't do this before & after we would have to make 2 queries.
      if (this.attachments.length > 0) {
        this.formData.photoIds = [crypto.randomUUID()]
      }

      const flockDocRef = await doc(db, 'flocks', flockId)
      const entriesCollectionRef = collection(flockDocRef, 'entries')
      const { entryId } = await setDoc(entriesCollectionRef, {
        ...this.formData,
        updatedAt: serverTimestamp(),
        createdAt: serverTimestamp()
      })

      // Now upload file
      if (this.attachments.length > 0) {
        await this.uploadImages(flockId, entryId, this.formData.photoIds[0])
      }
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
