<template>
  <v-col cols="12">
    <v-chip-group v-model="characteristics" class="d-block" column multiple>
      <v-chip
        v-for="field in characteristicsToUse"
        :key="field"
        class="mb-1"
        :class="{ 'read-only-chip': !editModeToggle }"
        color="secondary"
        label
        size="small"
        :value="field"
        variant="outlined"
      >
        <span>{{ field }}</span>
      </v-chip>
    </v-chip-group>
  </v-col>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useEntryFormStore } from '@/stores/entryFormStore'
import { computed } from 'vue'
import { rawSchemaCharacteristicOptions } from '@/schemas/entryFormSchema'

const entryFormStore = useEntryFormStore()
const { editModeToggle } = storeToRefs(entryFormStore)

const characteristics = defineModel('characteristics', {
  type: Array,
  default: () => []
})

const schemaCharacteristicOptions = structuredClone(
  rawSchemaCharacteristicOptions
)
// editModeToggle is used for adding new entries and controlled in router.js
// gracefully deals with appending entries while in editMode.
const characteristicsToUse = computed(() => {
  return editModeToggle.value
    ? [...new Set([...characteristics.value, ...schemaCharacteristicOptions])]
    : characteristics.value
})
</script>

<style scoped>
.read-only-chip {
  pointer-events: none;
}
</style>
