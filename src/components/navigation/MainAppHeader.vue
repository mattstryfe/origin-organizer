<template>
  <v-app-bar
    class="cust-o"
    density="compact"
    :elevation="2"
    rounded
    :scroll-behavior="smAndUp ? '' : 'hide'"
  >
    <template #prepend>
      <v-btn
        class="ms-n1 hover-spin-continuous"
        color="primary"
        icon="mdi-orbit"
        @click="router.push({ name: 'LandingPage' })"
      ></v-btn>
      <v-divider vertical></v-divider>
    </template>

    <template #title>
      <span class="ms-0 text-subtitle-1 text-sm-h6">Origin Organizer</span>
    </template>
    <main-app-search-field />

    <template #append>
      <div v-if="smAndUp">
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
      </div>

      <waffle-menu v-if="smAndUp"></waffle-menu>
      <user-account-menu></user-account-menu>
    </template>
  </v-app-bar>
</template>

<script setup>
import WaffleMenu from '@/components/navigation/MainWaffleMenu.vue'
import UserAccountMenu from '@/components/navigation/MainUserAccountMenu.vue'
import { routes } from '@/schemas/routerLinksSchema'
import { computed, inject } from 'vue'
import MainAppSearchField from '@/components/navigation/MainAppSearchField.vue'
import router from '@/plugins/router'
const smAndUp = inject('smAndUp')

const routesToUse = computed(() => routes.filter((r) => !r.hideInMainNav))
</script>

<style scoped>
/* Ensure text wraps and overrides flexbox constraints */
.wrap-title {
  white-space: normal; /* Allow wrapping */
  word-break: break-word; /* Ensure breaking for long words */
  text-align: left; /* Align text within the available space */
  flex-shrink: 1; /* Shrink if necessary */
  max-width: 150px; /* Set a maximum width to trigger wrapping */
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
.cust-o {
  overflow: visible !important;
}
</style>
