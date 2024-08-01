import { defineStore } from 'pinia'
import { useUserStore } from '@/stores/userStore'
import { collection, doc, setDoc, addDoc } from 'firebase/firestore'
import db from '@/plugins/firebase'

export const useEntryFormStore = defineStore('entryFormStore', {
  state: () => ({
    formData: {}
  }),

  getters: {

  },

  actions: {
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
    },
    updateField(field, value) {
      this.formData[field] = value
    }
  }
})