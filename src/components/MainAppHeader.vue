<template>
  <v-app-bar :elevation="2" rounded title="Origin Organizer">
    <template #prepend>
      <v-btn
        icon="mdi-orbit"
        color="primary"
        class="mr-2 hover-spin-continuous"
        @click="$router.push({ name: 'landingPage'})"
      ></v-btn>
      <v-divider vertical></v-divider>
    </template>

    <template #append>
      <waffle-menu></waffle-menu>
      <user-account-menu></user-account-menu>
    </template>
  </v-app-bar>
</template>

<script setup>
import WaffleMenu from '@/components/MainWaffleMenu.vue'
import UserAccountMenu from '@/components/MainUserAccountMenu.vue'
</script>

<style scoped>
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
