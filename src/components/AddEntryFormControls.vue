<template>
  <v-row no-gutters class="px-4 mt-2 justify-end">
    <v-btn variant="outlined" color="success" @click="entryFormStore.saveEntryToDb()">Save</v-btn>

  </v-row>
</template>

<script setup>
import { useEntryFormStore } from '@/stores/entryFormStore'

const entryFormStore = useEntryFormStore()

</script>

<style scoped>

</style>