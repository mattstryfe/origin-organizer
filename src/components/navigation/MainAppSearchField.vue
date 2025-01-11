<template>
  <!-- Search box -->
  <v-text-field
    v-model="searchParams"
    placeholder=" "
    prepend-inner-icon="mdi-magnify"
    density="compact"
    variant="solo"
    hide-details
    label="Search"
  ></v-text-field>
</template>

<script setup>
import { ref } from 'vue'

const searchParams = ref('')
</script>

<style scoped>

</style>