<template>
  <v-layout>
    <v-app-bar :elevation="2" rounded title="Origin Organizer">
      <template #prepend>
        <v-btn icon="mdi-orbit" class="mr-2"></v-btn>
        <v-divider vertical></v-divider>

      </template>

      <template #append>
        <v-btn icon="mdi-dots-grid"></v-btn>
        <v-btn icon="mdi-account"></v-btn>
      </template>
    </v-app-bar>

    <v-main class="d-flex align-center justify-center" style="min-height: 300px;">
      <RouterView />
    </v-main>
  </v-layout>
</template>
<script setup lang="ts">
import { RouterView } from 'vue-router';

</script>