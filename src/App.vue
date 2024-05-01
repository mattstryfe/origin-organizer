<template>
  <v-layout>
    <v-app-bar :elevation="2" rounded title="Origin Organizer">
      <template #prepend>
        <v-btn icon="mdi-orbit" class="mr-2"></v-btn>
        <v-divider vertical></v-divider>

      </template>

      <template #append>
        <v-btn icon="mdi-dots-grid"></v-btn>
        <v-btn icon="mdi-account"></v-btn>
      </template>
    </v-app-bar>

    <v-main class="d-flex align-center justify-center" style="min-height: 300px;">
      Main Content
    </v-main>
  </v-layout>
</template>
<script setup>

import { onMounted, ref } from 'vue'
import { collection, getDocs } from 'firebase/firestore'
import db from '@/plugins/firebase'

const users = ref([])

onMounted(async () => {
  const querySnapshot = await getDocs(collection(db, 'users'))
  querySnapshot.forEach((doc) => {

    users.value.push(doc.data())
    console.log('user', users.value)
  })
})
</script>