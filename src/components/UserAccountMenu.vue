<template>
  <v-menu v-model="accountMenu" :close-on-content-click="false" location="end">
    <template #activator="{ props }">
      <v-chip
        v-if="!userInfo"
        variant="outlined"
        color="primary"
        @click="handleAuth()"
      >
        <v-icon start>mdi-account-outline</v-icon>
        Sign in
      </v-chip>
      <!-- v-bind props opens menu -->
      <v-avatar v-else v-bind="props">
        <v-img :src="`${userInfo.photoURL}`"></v-img>
      </v-avatar>
    </template>

    <v-card>
      <v-list>
        <v-list-item
          :prepend-avatar="`${userInfo.photoURL}`"
          :subtitle="userInfo.currentUser.email"
          :title="userInfo.currentUser.displayName"
        >
          <template #append>
            <v-btn
              :class="fav ? 'text-red' : ''"
              icon="mdi-heart"
              variant="text"
              @click="fav = !fav"
            ></v-btn>
          </template>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <user-account-menu-actions></user-account-menu-actions>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn variant="tonal" @click="accountMenu = false"> Cancel </v-btn>
        <v-btn color="primary" variant="tonal" @click="accountMenu = false">
          Save
        </v-btn>
        <v-chip @click="deleteUser()">Delete User</v-chip>
      </v-card-actions>
    </v-card>
  </v-menu>
</template>

<script setup>
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import {
  setDoc,
  doc,
  getDoc,
  deleteDoc
} from 'firebase/firestore'
import db from '../plugins/firebase'
import { ref } from 'vue'
import UserAccountMenuActions from '@/components/UserAccountMenuActions.vue'

// menu
const accountMenu = ref(false)
const fav = ref()
const auth = getAuth()
const userInfo = ref() // TODO: move this to store
const provider = new GoogleAuthProvider()

const handleAuth = async () => {
  //initialize firebase auth
  const authResponse = await signInWithPopup(auth, provider)
  console.log('authResponse', authResponse.user)

  const userDoc = await getDoc(doc(db, 'users', authResponse.user.uid))
  if (!userDoc.exists()) {
    try {
      await setDoc(doc(db, 'users', authResponse.user.uid), {
        displayName: authResponse.user.displayName,
        autoSave: false,
        photoURL: authResponse.user.photoURL
      })
      console.log('uthResponse.user.photoURL', authResponse.user.photoURL)
      userInfo.value = {
        currentUser: authResponse.user,
        uid: authResponse.user.uid,
        photoURL: authResponse.user.photoURL
      }
    } catch (e) {
      console.error('Error adding document: ', e)
    }
  } else {
    const savedUserData = userDoc.data()
    userInfo.value = {
      currentUser: savedUserData.displayName,
      uid: authResponse.user.uid,
      photoURL: savedUserData.photoURL
    }
  }
  console.log('userInfo.value', userInfo.value.photoURL)
}

// // TODO: move this to user store and run this from UserAccountMenuActions
// const deleteUser = async () => {
//   await deleteDoc(doc(db, 'users', userInfo.value.uid))
//   userInfo.value = null
// }
</script>

<style scoped></style>
