<template>
  <v-app>
    <main-app-header />
    <v-main
      class="d-flex align-center justify-center"
      style="min-height: 300px"
    >
      <v-container class="" fluid>
        <notification-banner />

        <confirmation-dialog />
        <router-view />
      </v-container>
    </v-main>
    <mobile-bottom-navigation-menu />
  </v-app>
</template>

<script setup>
import MainAppHeader from '@/components/navigation/MainAppHeader.vue'
import { onMounted } from 'vue'
import { useUserStore } from '@/stores/userStore'
import MobileBottomNavigationMenu from '@/components/navigation/MobileBottomNavigationMenu.vue'
import NotificationBanner from '@/components/NotificationBanner.vue'
import ConfirmationDialog from '@/components/ConfirmationDialog.vue'

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
