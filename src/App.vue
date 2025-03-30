<template>
  <v-app class="">
    <main-app-header />
    <v-main class="safe-area-top">
      <v-container class="d-flex flex-column px-4 safe-area-top" fluid>
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
/*html,
body {
  overscroll-behavior: none;
}*/

:root {
  --inset-top: env(safe-area-inset-top);
}

body,
.v-navigation-drawer,
.v-overlay__content > .v-card {
  padding-top: var(--inset-top) !important;
}

.safe-area-top {
  /*height: 90vh;*/
  /*margin-top: var(--inset-top) !important;*/
  /*padding-top: var(--inset-top) !important;*/
}
.v-app-bar {
  padding-top: var(--inset-top) !important;
}
.v-bottom-navigation {
  padding-bottom: 35px !important;
}
</style>
