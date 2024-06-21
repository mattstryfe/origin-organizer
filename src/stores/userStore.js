import { defineStore } from 'pinia'
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { doc, getDoc, setDoc, deleteDoc } from 'firebase/firestore'
import db from '@/plugins/firebase'

export const useUserStore = defineStore('userStore', {
  state: () => ({
    userInfo: null
  }),

  getters: {
    getUserDisplayName: (state) => state.userInfo.displayName,
    getUserPhotoURL: (state) => state.userInfo.photoURL,
    getUserUid: (state) => state.userInfo.uid
  },

  actions: {
    async nukeUserAccount() {
      console.log('this.getUserUid()', this.getUserUid())
      await deleteDoc(doc(db, 'users', this.getUserUid()))
      this.userInfo = null
    },
    async handleLogin() {
      const auth = getAuth()
      const provider = new GoogleAuthProvider()
      //initialize firebase auth
      const authResponse = await signInWithPopup(auth, provider)
      // Pull this outside scope to use as SoT
      let userDoc

      try {
        userDoc = await getDoc(doc(db, 'users', authResponse.user.uid))
        // If user entry DOESN'T exists, make it
        if (!userDoc.exists()) {
          await setDoc(doc(db, 'users', authResponse.user.uid), {
            displayName: authResponse.user.displayName,
            autoSave: false,
            photoURL: authResponse.user.photoURL
          })
        }
      }
      catch (e) {
        console.log('no worky', e)
      }
      finally {
        console.log('userDoc.data()', userDoc.data())
        this.userInfo = userDoc.data()
      }
    }
  }
})
