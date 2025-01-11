<template>
  <v-app-bar
    :elevation="2"
    rounded
    class="cust-o"
    density="compact"
    :scroll-behavior="smAndUp ? '' : 'hide'"
  >
    <template #prepend>
      <v-btn
        @click="router.push({ name: 'LandingPage' })"
        icon="mdi-orbit"
        color="primary"
        class="ms-n1 hover-spin-continuous"
      ></v-btn>
      <v-divider vertical></v-divider>
    </template>

    <template #title>
      <span class="ms-0 text-subtitle-1 text-sm-h6">Origin Organizer</span>
    </template>
    <main-app-search-field/>

    <template #append>
      <div v-if="smAndUp">
        <v-icon
          v-for="w in routerLinksSchema"
          :key="w.name"
          @click="router.push({ name: w.routeName })"
          :name="w.name"
          class="pa-1 ma-1 v-icon--size-x-small"
          :color="w.color"
          :disabled="!w.routeName"
        >
          {{ w.icon }}
        </v-icon>
      </div>

      <waffle-menu v-if="smAndUp"></waffle-menu>
      <user-account-menu></user-account-menu>
    </template>
  </v-app-bar>
</template>

<script setup>
// TODO: Used w in routerLinksSchema to follow same pattern in MainWaffleMenu -> Easier refactor.
import WaffleMenu from '@/components/navigation/MainWaffleMenu.vue'
import UserAccountMenu from '@/components/navigation/MainUserAccountMenu.vue'
import routerLinksSchema from '@/schemas/routerLinksSchema'
import router from '@/plugins/router'
import { inject } from 'vue'
import MainAppSearchField from '@/components/navigation/MainAppSearchField.vue'
const smAndUp = inject('smAndUp')
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
