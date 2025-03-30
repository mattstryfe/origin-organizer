<template>
  <v-app class="">
    <main-app-header />
    <v-main class="safe-area-bottom">
      <v-container class="d-flex flex-column fill-height px-4" fluid>
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
.custom-mobile {
  //height: 100%;
  //padding: 20px !important;
}
/* MOBILE - prevents swiping down from refreshing the app*/
/*html,
body {
  overscroll-behavior: none;
}*/

:root {
  --inset-top: env(safe-area-inset-top);
  --inset-bottom: env(safe-area-inset-bottom);
}

body,
.v-navigation-drawer,
.v-overlay__content > .v-card {
  padding-top: var(--inset-top) !important;
  padding-bottom: var(--inset-bottom) !important;
}

.v-app-bar {
  padding-top: var(--inset-top) !important;
}
.v-bottom-navigation {
  /*padding-bottom: var(--inset-bottom) !important;*/
  padding-bottom: 35px !important;
}

/* Apply bottom safe-area inset to v-main */
.safe-area-bottom {
  /*padding-bottom: env(safe-area-inset-bottom) !important;*/
}
</style>
