import { defineStore } from 'pinia'
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'
import { doc, getDoc, setDoc, deleteDoc } from 'firebase/firestore'
import db from '@/plugins/firebase'

export const useUserStore = defineStore('userStore', {
  state: () => ({
    accountMenu: false,
    userInfo: null,
    hasProfileBeenRepaired: {},  // empty but truthy.  Important for loader to have 3 states
    userInfoKeysToTrack: ['displayName', 'photoURL', 'email', 'enableAutoSave', 'enableDarkMode']
  }),

  getters: {
    // ?. is used to prevent logout from throwing console errors for now.
    getUserDisplayName: (state) => state.userInfo?.displayName,
    getUserPhotoURL: (state) => state.userInfo?.photoURL,
    getUserUid: (state) => state.userInfo?.uid,
    getUserEmail: (state) => state.userInfo?.email,
  },

  actions: {
    async repairUserAccount() {
      this.hasProfileBeenRepaired = false
      // the idea here is to gracefully fix/update keys and objects as they change.
      const userDoc = await getDoc(doc(db, 'users', this.userInfo.uid))
      const hasAllKeys = this.userInfoKeysToTrack.every(key => key in userDoc.data())
      // Fake promise
      await new Promise(resolve => setTimeout(resolve, 3000));
      this.hasProfileBeenRepaired = true
    },
    async nukeUserAccount() {
      // Hide menu because it de-populates during logout
      this.accountMenu = false

      await deleteDoc(doc(db, 'users', this.getUserUid))
      this.userInfo = null
    },
    async handleLogout() {
      // Hide menu because it de-populates during logout
      this.accountMenu = false
      const auth = getAuth()
      await signOut(auth)
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
            photoURL: authResponse.user.photoURL,
            email: authResponse.user.email,
            uid: authResponse.user.uid,
            enableAutoSave: false,
            enableDarkMode: false
          })
        }
      }
      catch (e) {
        console.log('no worky', e)
      }
      finally {
        // Get the doc now...
        userDoc = await getDoc(doc(db, 'users', authResponse.user.uid))
        // Always get userData from the stored doc, even if it's being created right now.
        // Update the store with this value so all components who depend on it, pull from here
        // and updating happens seamlessly.
        this.userInfo = userDoc.data()
      }
    }
  }
})
