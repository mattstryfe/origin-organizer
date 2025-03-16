<template>
  <!-- Search box -->
  <v-text-field
    v-model="searchParams"
    density="compact"
    hide-details
    label="Search"
    placeholder=" "
    prepend-inner-icon="mdi-magnify"
    variant="solo"
  />
</template>

<script setup>
import { ref } from 'vue'

const searchParams = ref('')
</script>

<style scoped>

</style>