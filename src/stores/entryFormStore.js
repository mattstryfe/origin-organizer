import { defineStore } from 'pinia'
import { useUserStore } from '@/stores/userStore'
import { collection, doc, getDocs, addDoc } from 'firebase/firestore'
import db from '@/plugins/firebase'

export const useEntryFormStore = defineStore('entryFormStore', {
  state: () => ({
    formData: {},
    entries: [],
    selectionIds: new Map(), // Putting selections here because it might be used for multiple features (breeding, comparison, etc)
    isDoneLoadingEntries: null,
    showBottomSheet: false,
  }),
  getters: {
    disableBottomSheetButton: state => state.selectionIds.size !== 2
  },
  actions: {
    getEntryById(entryId) {
      return this.entries.find(entry => entry.id === entryId)
    },
    async getExistingEntries() {
      this.isDoneLoadingEntries = false
      const userStore = useUserStore()

      // prevents firing before logged in
      if (!userStore.userInfo)
        return

      const flockId = userStore.getUserUid

      // get snapshot of entries
      const querySnapshot = await getDocs(collection(db, 'flocks', flockId, 'entries'))

      // map over entries
      this.entries = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      this.isDoneLoadingEntries = true
    },
    async saveEntryToDb() {
      const userStore = useUserStore()

      const flockId = userStore.getUserUid
      // const entryName =
      const flockDocRef = await doc(db, "flocks", flockId);
      // await setDoc(flockDocRef)
      const entriesCollectionRef = collection(flockDocRef, 'entries');
      // for (const entry of entriesData) {
      await addDoc(entriesCollectionRef, this.formData);
      // }

      // Now also re-query to re-sync everything
      await this.getExistingEntries()
    },
    updateField(field, value) {
      this.formData[field] = value
    }
  }
})