<template>
  <v-layout>

    <main-app-header></main-app-header>

    <v-main
      class="d-flex align-center justify-center"
      style="min-height: 300px"
    >
      <v-container fluid>

        <router-view></router-view>
      </v-container>
    </v-main>
  </v-layout>
</template>

<script setup>
import MainAppHeader from '@/components/MainAppHeader.vue'

// Vuetify Shorthand for responsiveness across app
// saves from needing to import and destructure in each component.
import { useDisplay } from 'vuetify';
import { provide } from 'vue';
// Destructure the specific breakpoint properties you want to provide
const { mdAndUp } = useDisplay();

// Provide these properties globally
provide('mdAndUp', mdAndUp);

</script>

<style scoped>

</style>
