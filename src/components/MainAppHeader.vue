<template>
  <v-app-bar :elevation="2" rounded title="Origin Organizer">
    <template #prepend>
      <v-btn icon="mdi-orbit" color="primary" class="mr-2"></v-btn>
      <v-divider vertical></v-divider>
    </template>

    <template #append>
      <waffle-menu></waffle-menu>
      <user-account-menu></user-account-menu>
    </template>
  </v-app-bar>
</template>

<script setup>
import WaffleMenu from '@/components/WaffleMenu.vue'
import UserAccountMenu from '@/components/UserAccountMenu.vue'

</script>

<style scoped></style>
