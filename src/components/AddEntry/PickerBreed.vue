<template>
  <v-chip-group v-model="breed" column multiple>
    <v-chip
      v-for="b in breedsToUse"
      :key="b"
      :class="{ 'read-only-chip': !editModeToggle }"
      color="secondary"
      label
      size="small"
      :value="b"
      variant="outlined"
    >
      <span>{{ b }}</span>
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

/*.cust-selected-chip {
  color: rgba(34, 139, 34, 0.57);
}*/
</style>
