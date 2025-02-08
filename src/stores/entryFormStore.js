import { defineStore } from 'pinia'
import { useUserStore } from '@/stores/userStore'
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
  onSnapshot
} from 'firebase/firestore'
import { db, storage } from '@/plugins/firebase'
import { useFirestore, useCollection } from 'vuefire'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'

export const useEntryFormStore = defineStore('entryFormStore', {
  state: () => ({
    // schemaCharacteristicOptions: structuredClone(schemaCharacteristicOptions),
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
      const flockId = userStore.getUserUid
      if (!flockId) return

      const entriesCollection = collection(db, 'flocks', flockId, 'entries')

      onSnapshot(
        entriesCollection,
        (querySnapshot) => {
          console.log('🔄 Firestore updated, syncing entries...')

          const updatedEntries = querySnapshot.docs.map((doc) => ({
            entryId: doc.id,
            ...doc.data(),
            imageUrlGetter: (entry) => this.getEntryImageUrls(entry)
          }))

          // ✅ Instead of replacing the entire array, update each entry
          updatedEntries.forEach((newEntry) => {
            const existingEntry = this.entries.find(
              (entry) => entry.entryId === newEntry.entryId
            )

            if (existingEntry) {
              // ✅ Update existing entry object properties (keeps deep reactivity)
              Object.assign(existingEntry, newEntry)
            } else {
              // ✅ If entry is new, add it
              this.entries.push(newEntry)
            }
          })

          // ✅ Remove any deleted entries
          this.entries = this.entries.filter((entry) =>
            updatedEntries.some((e) => e.entryId === entry.entryId)
          )

          this.isDoneLoadingEntries = true
        },
        (error) => {
          console.error('Error fetching entries:', error)
        }
      )
    },
    clearFormData() {
      this.formData = {}
    },
    async removeThisEntry(entryId) {
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
      const userStore = useUserStore()
      const flockId = userStore.getUserUid
      const entry = this.getEntryById(entryId)

      // Create reference to the nested document
      const entryRef = doc(db, 'flocks', flockId, 'entries', entryId)

      await updateDoc(entryRef, {
        characteristics: entry.characteristics, // todo this is only temp
        updatedAt: new Date()
      })

      // Now also re-query to re-sync everything
      // await this.getExistingEntries()
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
