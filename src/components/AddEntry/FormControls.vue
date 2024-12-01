<template>
  <v-row no-gutters class="px-4 mt-2 justify-end">
    <v-btn
      @click="entryFormStore.saveEntryToDb()"
      variant="outlined"
      color="success"
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
