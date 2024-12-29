<template>
  <v-row no-gutters class="px-4 mb-3">
    <v-col cols="12">
      <v-file-upload
        density="compact"
        scrim="primary"
        v-model="attachments"
        show-size
        accept="image/*"
      ></v-file-upload>
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
