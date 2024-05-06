<template>
  <v-chip
    v-if="!userInfo"
    variant="outlined"
    color="primary"
    @click="handleAuth()"
  >
    <v-icon start>mdi-account-outline</v-icon>
    Sign in
  </v-chip>
  <v-avatar v-else>
    <v-img :src="`${userInfo.photoURL}`"></v-img>
  </v-avatar>
</template>

<script setup>
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { ref } from 'vue'

const auth = getAuth()
const userInfo = ref(null)
const provider = new GoogleAuthProvider()

const handleAuth = async () => {
  //initialize firebase auth
  const authResponse = await signInWithPopup(auth, provider)
  userInfo.value = {
    currentUser: authResponse.user,
    uid: authResponse.user.uid,
    photoURL: authResponse.user.photoURL
  }
}
</script>

<style scoped>

</style>