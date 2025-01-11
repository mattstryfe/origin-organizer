<template>
  <v-row class="px-4 mt-2 justify-end" no-gutters>
    <v-btn
      color="success"
      variant="outlined"
      @click="entryFormStore.saveEntryToDb()"
    >
      Save
    </v-btn>
  </v-row>
</template>

<script setup>
import { useEntryFormStore } from '@/stores/entryFormStore'

const entryFormStore = useEntryFormStore()
</script>

<style scoped></style>
