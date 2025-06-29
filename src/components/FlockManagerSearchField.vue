<template>
  <!-- Search box -->
  <v-col cols="6">
    <v-text-field
      v-model="entryFormStore.searchParams"
      density="compact"
      hide-details
      label="Search"
      placeholder=" "
      prepend-inner-icon="mdi-magnify"
      variant="solo"
    ></v-text-field>
  </v-col>
</template>

<script setup>
import { useEntryFormStore } from '../stores/entryFormStore'

const entryFormStore = useEntryFormStore()
</script>

<style scoped></style>
