import { defineStore } from 'pinia'
import { useUserStore } from '@/stores/userStore'
import { collection, doc, getDocs, addDoc } from 'firebase/firestore'
import db from '@/plugins/firebase'

export const useEntryFormStore = defineStore('entryFormStore', {
  state: () => ({
    formData: {},
    entries: []
  }),

  getters: {

  },

  actions: {
    async getExistingEntries() {
      const userStore = useUserStore()

      // prevents firing before logged in
      if (!userStore.userInfo)
        return

      const flockId = userStore.getUserUid

      // get snapshot of entries
      const querySnapshot = await getDocs(collection(db, 'flocks', flockId, 'entries'))

      // map over entries
      this.entries = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))

    },
    async saveEntryToDb() {
      const userStore = useUserStore()

      console.log('saving entry... ', userStore.getUserUid)
      const flockId = userStore.getUserUid
      // const entryName =
      console.log('flockId ', flockId)
      const flockDocRef = await doc(db, "flocks", flockId);
      // await setDoc(flockDocRef)
      const entriesCollectionRef = collection(flockDocRef, 'entries');
      // for (const entry of entriesData) {
      await addDoc(entriesCollectionRef, this.formData);
      // }

      // Now also requery to resync everything
      await this.getExistingEntries()
    },
    updateField(field, value) {
      this.formData[field] = value
    }
  }
})