<template>
  <v-layout>
    <main-app-header></main-app-header>

    <v-main
      class="d-flex align-center justify-center"
      style="min-height: 300px"
    >
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-layout>
</template>

<script setup>
import MainAppHeader from '@/components/navigation/MainAppHeader.vue'
// Vuetify Shorthand for responsiveness across app
// saves from needing to import and destructure in each component.
import { useDisplay } from 'vuetify'
import { onMounted, provide } from 'vue'
import { useUserStore } from '@/stores/userStore'
// Destructure the specific breakpoint properties you want to provide
const { mdAndUp, smAndUp } = useDisplay()

// Provide these properties globally
provide('mdAndUp', mdAndUp)
provide('smAndUp', smAndUp)

onMounted(() => {
  if (import.meta.env.MODE === 'development') {
    const userStore = useUserStore()
    userStore.handleLogin(true)
  }
})

</script>

<style>
/* MOBILE - prevents swiping down from refreshing the app*/
html,
body {
  overscroll-behavior: none;
}
</style>
