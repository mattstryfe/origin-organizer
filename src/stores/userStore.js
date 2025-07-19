// stores/userStore.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import {
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut
} from 'firebase/auth'
import { doc, getDoc, setDoc, deleteDoc } from 'firebase/firestore'
import { db } from '@/plugins/firebase'
import { useEntryFormStore } from '@/stores/entryFormStore'

export const useUserStore = defineStore('userStore', () => {
  // --- State ---
  const userIsAuthenticated = ref(false)
  const accountMenu = ref(false)
  const userInfo = ref(null)
  const hasProfileBeenRepaired = ref({})
  const userInfoKeysToTrack = [
    'displayName',
    'photoURL',
    'email',
    'enableAutoSave',
    'enableDarkMode'
  ]

  // --- Getters ---
  const getUserDisplayName = computed(() => userInfo.value?.displayName)
  const getUserPhotoURL = computed(
    () =>
      userInfo.value?.photoURL ||
      'https://randomuser.me/api/portraits/lego/1.jpg'
  )
  const getUserUid = computed(() => userInfo.value?.uid)
  const getUserEmail = computed(() => userInfo.value?.email)

  // --- Actions ---
  const repairUserAccount = async () => {
    hasProfileBeenRepaired.value = false

    const userDoc = await getDoc(doc(db, 'users', getUserUid.value))
    userInfoKeysToTrack.every((key) => key in userDoc.data())

    await new Promise((resolve) => setTimeout(resolve, 3000))
    hasProfileBeenRepaired.value = true
  }

  const nukeUserAccount = async () => {
    accountMenu.value = false
    await deleteDoc(doc(db, 'users', getUserUid.value))
    userInfo.value = null
  }

  const handleLogout = async () => {
    accountMenu.value = false
    const auth = getAuth()
    await signOut(auth)
    userInfo.value = null
    userIsAuthenticated.value = false
  }

  const handleLogin = async (useTestAccount) => {
    const auth = getAuth()
    let userDoc, authResponse

    try {
      if (useTestAccount) {
        const testEmail = import.meta.env.VITE_TEST_USER_EMAIL
        const testPassword = import.meta.env.VITE_TEST_USER_PASSWORD
        authResponse = await signInWithEmailAndPassword(
          auth,
          testEmail,
          testPassword
        )
      } else {
        const provider = new GoogleAuthProvider()
        authResponse = await signInWithPopup(auth, provider)
      }

      const userRef = doc(db, 'users', authResponse.user.uid)
      userDoc = await getDoc(userRef)

      if (!userDoc.exists()) {
        await setDoc(userRef, {
          displayName: authResponse.user.displayName || 'Test User',
          photoURL: authResponse.user.photoURL,
          email: authResponse.user.email,
          uid: authResponse.user.uid,
          enableAutoSave: false,
          enableDarkMode: false
        })
      }

      userIsAuthenticated.value = true

      // Always pull fresh doc after create
      userDoc = await getDoc(userRef)
      userInfo.value = userDoc.data()

      // Init entry form listener
      await useEntryFormStore().setupEntriesListener()
    } catch (e) {
      console.log('no worky', e)
    }
  }

  return {
    // state
    userIsAuthenticated,
    accountMenu,
    userInfo,
    hasProfileBeenRepaired,
    userInfoKeysToTrack,

    // getters
    getUserDisplayName,
    getUserPhotoURL,
    getUserUid,
    getUserEmail,

    // actions
    repairUserAccount,
    nukeUserAccount,
    handleLogout,
    handleLogin
  }
})
