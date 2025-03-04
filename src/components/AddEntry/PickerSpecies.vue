<template>
  <v-btn-toggle
    v-model="formData['species']"
    class="fill-height flex-column"
    color="green-darken-3"
  >
    <v-btn
      v-for="(opt, index) in schemaSpeciesOptions"
      :key="index"
      class="border mr-2 mb-2"
      :value="opt.species"
    >
      <v-icon size="35">
        <component :is="opt.component"></component>
      </v-icon>
    </v-btn>
  </v-btn-toggle>
</template>

<script setup>
import { schemaSpeciesOptions } from '@/schemas/entryFormSchema'
import { useEntryFormStore } from '@/stores/entryFormStore'
import { storeToRefs } from 'pinia'
const entryFormStore = useEntryFormStore()
const { formData } = storeToRefs(entryFormStore)
</script>

<style scoped></style>
