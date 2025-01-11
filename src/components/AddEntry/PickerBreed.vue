<template>
  <v-fab
    :active="true"
    class="pl-4"
    color="green-darken-3"
    icon="mdi-plus"
    location="bottom start"
    size="xx-small"
    variant="outlined"
  ></v-fab>

  <v-chip-group v-model="formData['breed']" class="pl-4" column multiple>
    <v-chip
      v-for="(breed, index) in sortedBreeds"
      :key="index"
      class="text-no-wrap text-truncate"
      color="green-darken-3"
      density="compact"
      :value="breed"
      variant="outlined"
    >
      <p class="grey">{{ breed }}</p>
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

<style scoped>
.cust-width {
  max-width: 99%;
}
</style>
