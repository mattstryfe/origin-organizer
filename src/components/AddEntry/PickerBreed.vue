<template>
  <v-chip-group v-model="breed" column multiple>
    <v-chip
      v-for="b in breedsToUse"
      :key="b"
      class="text-no-wrap text-truncate"
      :class="{ 'read-only-chip': !editModeToggle }"
      color="green-darken-3"
      density="compact"
      :value="b"
      variant="outlined"
    >
      <p class="grey">{{ b }}</p>
    </v-chip>
  </v-chip-group>
</template>

<script setup>
import { schemaChickenBreedOptions } from '@/schemas/entryFormSchema'
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useEntryFormStore } from '@/stores/entryFormStore'

const breed = defineModel('breed', { default: () => [] })
const { editModeToggle } = storeToRefs(useEntryFormStore())

// gracefully deals with appending entries while in editMode.
const breedsToUse = computed(() => {
  return editModeToggle.value
    ? [...new Set([...breed.value, ...schemaChickenBreedOptions.sort()])]
    : breed.value
})
</script>

<style scoped>
.read-only-chip {
  pointer-events: none;
}
</style>
