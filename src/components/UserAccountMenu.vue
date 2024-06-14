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
      <div v-else>
        <v-avatar v-bind="props">
          <v-img :src="`${userInfo.photoURL}`"></v-img>
        </v-avatar>
        <v-chip @click="deleteUser()">Delete User</v-chip>
      </div>
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

const auth = getAuth()
const userInfo = ref(null)
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
        photoUrl: authResponse.user.photoURL
      })
    } catch (e) {
      console.error('Error adding document: ', e)
    }

    userInfo.value = {
      currentUser: authResponse.user,
      uid: authResponse.user.uid,
      photoURL: authResponse.user.photoURL
    }
  } else {
    const savedUserData = userDoc.data()
    console.log('userDoc', userDoc.id)
    userInfo.value = {
      currentUser: savedUserData.displayName,
      uid: authResponse.user.uid,
      photoURL: savedUserData.photoURL
    }
  }
}

const deleteUser = async () => {
  await deleteDoc(doc(db, 'users', userInfo.value.uid))
  userInfo.value = null
}
</script>

<style scoped></style>
