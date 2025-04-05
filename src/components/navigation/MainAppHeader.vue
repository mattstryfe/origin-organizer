<template>
  <v-app-bar
    app
    density="compact"
    rounded
    v-scroll="onScroll"
    :style="{
      transform: isHidden ? 'translateY(-50%)' : 'translateY(0%)'
    }"
  >
    <template #prepend v-if="!isHidden">
      <v-btn
        class="ms-n1 hover-spin-continuous"
        color="primary"
        icon="mdi-orbit"
        @click="router.push({ name: 'LandingPage' })"
      />
      <v-divider vertical />
    </template>

    <template #title v-if="!isHidden">
      <span class="ms-0 text-subtitle-1 text-sm-h6">Origin Organizer</span>
    </template>

    <template #append v-if="!isHidden">
      <template v-if="useLayoutStore().smAndUp">
        <v-icon
          v-for="r in routesToUse"
          :key="r.name"
          class="pa-1 ma-1 v-icon--size-x-small"
          :color="r.color"
          :disabled="r.disabled"
          :name="r.name"
          @click="router.push({ name: r.name })"
        >
          {{ r.icon }}
        </v-icon>
      </template>

      <waffle-menu v-if="useLayoutStore().smAndUp" />
      <user-account-menu />
    </template>
  </v-app-bar>
</template>

<script setup>
import WaffleMenu from '@/components/navigation/MainWaffleMenu.vue'
import UserAccountMenu from '@/components/navigation/MainUserAccountMenu.vue'
import { routes } from '@/schemas/routerLinksSchema'
import { computed, ref } from 'vue'
import router from '@/plugins/router'
import { useLayoutStore } from '@/stores/layoutStore.js'

const routesToUse = computed(() => routes.filter((r) => !r.hideInMainNav))

const isHidden = ref(false) // Controls hiding behavior
const lastScrollY = ref(0) // Tracks last scroll position

// Mimic `v-app-bar` scroll behavior
const onScroll = () => {
  const currentScrollY = window.scrollY
  isHidden.value = currentScrollY > lastScrollY.value || currentScrollY > 0
  lastScrollY.value = currentScrollY
}
</script>

<style scoped>
/* Smooth transition */
.v-app-bar {
  transition:
    transform 0.3s ease-in-out,
    opacity 0.3s ease-in-out;
  will-change: transform, opacity; /* Boost performance */
}
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.hover-spin-continuous {
  animation: spin 5s linear infinite;
}
</style>
