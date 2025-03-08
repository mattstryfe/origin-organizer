<template>
  <v-chip-group v-model="breed" class="d-flex" column multiple>
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
.dynamic-truncate {
  white-space: nowrap !important;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
  max-width: 100% !important;
  display: block !important; /* Ensure it's not flex or inline-flex */
}

.read-only-chip {
  pointer-events: none;
}

.cust-trunc {
  /*
  display: -webkit-box;
  */
  /*  display: inline-block;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;*/
}
</style>
