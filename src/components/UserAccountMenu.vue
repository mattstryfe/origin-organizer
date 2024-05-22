<template>
  <v-menu
    v-model="accountMenu"
    :close-on-content-click="false"
    location="end"
  >
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
      </v-card-actions>

    </v-card>
  </v-menu>
</template>

<script setup>
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
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
  userInfo.value = {
    currentUser: authResponse.user,
    uid: authResponse.user.uid,
    photoURL: authResponse.user.photoURL
  }
  console.log('currentUser', userInfo.value.currentUser)
}
</script>

<style scoped></style>
