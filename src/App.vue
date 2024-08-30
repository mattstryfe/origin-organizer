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
</script>

<style scoped>

</style>
