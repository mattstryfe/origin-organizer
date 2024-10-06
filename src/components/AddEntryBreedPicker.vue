<template>
  <v-fab
    :active="true"
    class="ms-1"
    icon="mdi-plus"
    location="bottom start"
    size="xx-small"
    color="green-darken-3"
    variant="outlined"
  ></v-fab>

  <v-chip-group v-model="formData['breed']" column multiple class="pl-4">
    <v-chip
      v-for="(breed, index) in sortedBreeds"
      :key="index"
      variant="outlined"
      density="compact"
      :value="breed"
      color="green-darken-3"
    >
      <span class="grey">{{ breed }}</span>
    </v-chip>
  </v-chip-group>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useEntryFormStore } from '@/stores/entryFormStore'
import { schemaChickenBreedOptions } from '@/schemas/entryFormSchema'
import { computed } from 'vue'
const entryFormStore = useEntryFormStore()
const sortedBreeds = computed(() => schemaChickenBreedOptions.sort())
const { formData } = storeToRefs(entryFormStore)
</script>

<style scoped></style>
