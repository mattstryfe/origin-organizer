import { defineStore } from 'pinia'
import { useUserStore } from '@/stores/userStore'
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc
} from 'firebase/firestore'
import { db, storage } from '@/plugins/firebase'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'

export const useEntryFormStore = defineStore('entryFormStore', {
  state: () => ({
    formData: {},
    entries: [],
    selectionIds: new Map(), // Putting selections here because it might be used for multiple features (breeding, comparison, etc)
    isDoneLoadingEntries: null,
    showBottomSheet: false,
    attachments: []
  }),
  getters: {
    disableBottomSheetButton: (state) => state.selectionIds.size !== 2
  },
  actions: {
    async removeThisEntry(entryId) {
      const userStore = useUserStore()
      const flockId = userStore.getUserUid

      // Create reference to the nested document
      const entryRef = doc(db, 'flocks', flockId, 'entries', entryId)

      await deleteDoc(entryRef)

      // Now also re-query to re-sync everything
      await this.getExistingEntries()
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

      // Now also re-query to re-sync everything
      await this.getExistingEntries()
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

      // Now also re-query to re-sync everything
      await this.getExistingEntries()
    },
    getEntryById(entryId) {
      return this.entries.find((entry) => entry.entryId === entryId)
    },
    async getEntryImageUrls(entry) {
      const userStore = useUserStore()
      const flockId = userStore.getUserUid
      const { entryId } = entry
      const imageId = entry?.photoIds?.[0] ?? null

      if (!imageId) return

      try {
        const storageRef = ref(storage, `${flockId}/${entryId}/${imageId}.jpg`)
        entry.imageUrl = await getDownloadURL(storageRef)
      } catch (error) {
        console.error('Error fetching image URL:', error)
        return ''
      }
    },
    async getExistingEntries() {
      this.isDoneLoadingEntries = false
      const userStore = useUserStore()

      // prevents firing before logged in
      if (!userStore.userInfo) return

      const flockId = userStore.getUserUid

      // get snapshot of entries
      const querySnapshot = await getDocs(
        collection(db, 'flocks', flockId, 'entries')
      )

      // map over entries
      this.entries = querySnapshot.docs.map((doc) => {
        const docData = doc.data()
        const entryId = doc.id
        return {
          entryId,
          ...docData,
          imageUrlGetter: (entry) => this.getEntryImageUrls(entry)
        }
      })
      console.log('this.entries', this.entries)
      this.isDoneLoadingEntries = true
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

      // Now also re-query to re-sync everything
      await this.getExistingEntries()
    },
    updateField(field, value) {
      this.formData[field] = value
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
