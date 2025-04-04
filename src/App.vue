<template>
  <v-app>
    <main-app-header />
    <v-main>
      <v-pull-to-refresh
        class=""
        :disabled="!isNative"
        :pull-down-threshold="100"
        @load="refreshApp"
      >
        <v-container class="d-flex flex-column px-4 fill-height" fluid>
          <notification-banner />

          <confirmation-dialog />
          <router-view />
        </v-container>
      </v-pull-to-refresh>
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
import { Capacitor } from '@capacitor/core'

onMounted(() => {
  if (import.meta.env.MODE === 'development') {
    const userStore = useUserStore()
    userStore.handleLogin(true)
  }
})

const isNative = Capacitor.isNativePlatform()

async function refreshApp({ done }) {
  console.log('🔁 App-level refresh triggered', isNative)
  await new Promise((resolve) => setTimeout(() => resolve(), 2000))
  done('ok')
}
</script>

<style>
/*Fixes alignment & layout issues caused from this being in labs probably.*/
.v-pull-to-refresh,
.v-pull-to-refresh__scroll-container {
  height: 100%;
}

:root {
  --inset-top: env(safe-area-inset-top);
}

body,
.v-navigation-drawer,
.v-overlay__content > .v-card {
  padding-top: var(--inset-top) !important;
}

.v-app-bar {
  padding-top: var(--inset-top) !important;
}
.v-bottom-navigation {
  padding-bottom: 35px !important;
}
</style>
