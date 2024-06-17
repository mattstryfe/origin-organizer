<template>

  <v-app-bar :elevation="2" rounded title="Origin Organizer">
    <template #prepend>
      <v-btn icon="mdi-orbit" color="primary" class="mr-2"></v-btn>
      <v-divider vertical></v-divider>
      <v-fab location="bottom start" color="blue" absolute icon="mdi-plus"></v-fab>

    </template>

    <template #append>
      <addDialog></addDialog>
      <waffle-menu></waffle-menu>
      <user-account-menu></user-account-menu>
    </template>

  </v-app-bar>
</template>

<script setup>
import WaffleMenu from '@/components/WaffleMenu.vue'
import UserAccountMenu from '@/components/UserAccountMenu.vue'
import addDialog from '@/components/AddDialog.vue'

</script>

<style scoped></style>
