<template>
  <v-chip-group v-model="breed" class="d-flex" column multiple>
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
        <span class="cust-trunc">{{ b }}</span>
      </v-chip>
    </v-slide-y-transition>
  </v-chip-group>
</template>

<script setup>
import { schemaChickenBreedOptions } from '@/schemas/entryFormSchema'
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useEntryFormStore } from '@/stores/entryFormStore'

const breed = defineModel('breed', { type: Array, default: () => [] })
console.log('breed', breed.value)
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
