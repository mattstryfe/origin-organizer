<template>
  <v-app>
    <main-app-header />
    <v-main>
      <v-pull-to-refresh class="" :pull-down-threshold="100" @load="refreshApp">
        <template #pullDownPanel>
          <v-row class="mt-3">
            <v-col class="text-center" col="3">
              <v-progress-circular
                color="primary"
                indeterminate
                :size="40"
                :width="6"
              ></v-progress-circular>
              <h6 class="text-caption mt-2">Refreshing data...</h6>
            </v-col>
          </v-row>
        </template>
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
import { useEntryFormStore } from '@/stores/entryFormStore.js'

onMounted(() => {
  if (import.meta.env.MODE === 'development') {
    const userStore = useUserStore()
    userStore.handleLogin(true)
  }
})

async function refreshApp({ done }) {
  // Resets entire store
  useEntryFormStore().$reset()

  // Re-init entry store to repopulate from ground up
  await useEntryFormStore().setupEntriesListener()
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
</style>
