<template>
  <!-- Search box -->
  <v-text-field
    v-model="searchParams"
    placeholder="Search"
    prepend-inner-icon="mdi-magnify"
    density="compact"
    variant="solo-filled"
    hide-details
  ></v-text-field>
</template>

<script setup>
import { ref } from 'vue'

const searchParams = ref()
</script>

<style scoped>

</style>