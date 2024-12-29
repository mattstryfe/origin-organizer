// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: 'origin-organizer.firebaseapp.com',
  projectId: 'origin-organizer',
  storageBucket: 'origin-organizer.firebasestorage.app',
  messagingSenderId: '54163027071',
  appId: '1:54163027071:web:1c2e729a5e4d269a75bb4a'
}

// Initialize Firebase
const baseApp = initializeApp(firebaseConfig)
const db = getFirestore(baseApp)

// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(baseApp);

export { db, storage }
