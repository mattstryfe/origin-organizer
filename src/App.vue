<template>
  <v-layout>
   <main-app-header></main-app-header>

    <v-main
      class="d-flex align-center justify-center"
      style="min-height: 300px"
    >
      Main Content
      <v-card>
      </v-card>
    </v-main>
  </v-layout>
</template>

<script setup>
import { onMounted } from 'vue'
import { collection, getDocs } from 'firebase/firestore'
import db from '@/plugins/firebase'
import MainAppHeader from '@/components/MainAppHeader.vue'

onMounted(async () => {
  // const querySnapshot = await getDocs(collection(db, 'users'))
  // querySnapshot.forEach((doc) => {
  //
  //   users.value.push(doc.data())
  //   console.log('user', users.value)
  // })
})
</script>
