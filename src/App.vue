<template>
  <v-layout>
    <v-app-bar :elevation="2" rounded title="Origin Organizer">
      <template #prepend>
        <v-btn icon="mdi-orbit" class="mr-2"></v-btn>
        <v-divider vertical></v-divider>
      </template>

      <template #append>
        <v-btn icon="mdi-dots-grid"></v-btn>
        <v-avatar>
          <v-btn v-if="!userInfo" icon="mdi-account" @click="handleAuth()">Login </v-btn>
          <v-img
            v-else
            :src="`${userInfo.photoURL}`"
          ></v-img>
        </v-avatar>
      </template>
    </v-app-bar>

    <v-main
      class="d-flex align-center justify-center"
      style="min-height: 300px"
    >
      Main Content
      <v-card>
        userInfo: {{ userInfo }} <br />
        uid: {{ uid }} <br />
        photoURL: {{ photoURL }} <br />
      </v-card>
    </v-main>
  </v-layout>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import { collection, getDocs } from 'firebase/firestore'
import db from '@/plugins/firebase'
import { getAuth, signInWithPopup, onAuthStateChanged } from 'firebase/auth'
import { GoogleAuthProvider } from 'firebase/auth'

const provider = new GoogleAuthProvider()
const auth = getAuth()

const userInfo = ref(null)
const uid = ref()
const photoURL = ref()

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    // console.log('users', user)
    // uid.value = user.uid
    // photoURL.value = user.photoURL
    // ...
  } else {
    // User is signed out
    // ...
  }
})

const handleAuth = async () => {
  // auth
  //initialize firebase auth
  const authResponse = await signInWithPopup(auth, provider)
  console.log('authResponse', authResponse)
  // const res = await getRedirectResult(auth)
  // console.log(res)
  userInfo.value = {
    currentUser: authResponse.user,
    uid: authResponse.user.uid,
    photoURL: authResponse.user.photoURL
  }
  // console.log('auth', auth)
}

onMounted(async () => {
  // const querySnapshot = await getDocs(collection(db, 'users'))
  // querySnapshot.forEach((doc) => {
  //
  //   users.value.push(doc.data())
  //   console.log('user', users.value)
  // })
})
</script>
