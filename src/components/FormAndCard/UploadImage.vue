<template>
  <v-row
    class="px-4 mb-3"
    no-gutters
  >
    <v-col cols="12">
      <v-file-upload
        accept="image/*"
        density="compact"
        scrim="primary"
        v-model="attachments"
        show-size
      />
    </v-col>
  </v-row>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useEntryFormStore } from '@/stores/entryFormStore'

const entryFormStore = useEntryFormStore()
const { attachments } = storeToRefs(entryFormStore)
</script>

<style scoped></style>
