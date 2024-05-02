// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBuKE7bhrh3mdeNlZ_kry-zZiYkcA5UTOE",
  authDomain: "origin-organizer.firebaseapp.com",
  projectId: "origin-organizer",
  storageBucket: "origin-organizer.appspot.com",
  messagingSenderId: "54163027071",
  appId: "1:54163027071:web:1c2e729a5e4d269a75bb4a"
};

// Initialize Firebase
const baseApp = initializeApp(firebaseConfig)

// auth
//initialize firebase auth
// const auth = getAuth()
// console.log('auth', auth)

// db
const db = getFirestore(baseApp)

export default db