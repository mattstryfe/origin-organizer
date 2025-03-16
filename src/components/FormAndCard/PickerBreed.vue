<template>
  <v-col cols="12">
    <v-chip-group
      v-model="breed"
      class="d-flex"
      column
      multiple
    >
      <v-slide-y-transition group>
        <v-chip
          v-for="b in breedsToUse"
          :key="b"
          class=""
          :class="{ 'read-only-chip': !editModeToggle }"
          color="secondary"
          label
          size="small"
          :value="b"
          variant="outlined"
        >
          <span>{{ b }}</span>
        </v-chip>
      </v-slide-y-transition>
    </v-chip-group>
  </v-col>
</template>

<script setup>
import { schemaChickenBreedOptions } from '@/schemas/entryFormSchema'
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useEntryFormStore } from '@/stores/entryFormStore'

const breed = defineModel('breed', { type: Array, default: () => [] })
const { editModeToggle } = storeToRefs(useEntryFormStore())

// editModeToggle is used for adding new entries and controlled in router.js
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
