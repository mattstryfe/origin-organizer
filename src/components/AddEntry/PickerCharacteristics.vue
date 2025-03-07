<template>
  <v-chip-group v-model="characteristics" class="d-block" column multiple>
    <v-chip
      v-for="field in characteristicsToUse"
      :key="field"
      class="mb-1"
      :class="{ 'read-only-chip': !editModeToggle }"
      label
      selected-class="cust-selected-chip"
      size="small"
      :value="field"
      variant="outlined"
    >
      <span class="grey">{{ field }}</span>
    </v-chip>
  </v-chip-group>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useEntryFormStore } from '@/stores/entryFormStore'
import { computed } from 'vue'
import { rawSchemaCharacteristicOptions } from '@/schemas/entryFormSchema'

const entryFormStore = useEntryFormStore()
const { editModeToggle } = storeToRefs(entryFormStore)

const characteristics = defineModel('characteristics', { default: () => [] })

// TODO: Look using vueUse for snapshotting this and checking differences...
const schemaCharacteristicOptions = structuredClone(
  rawSchemaCharacteristicOptions
)

// gracefully deals with appending entries while in editMode.
const characteristicsToUse = computed(() => {
  return editModeToggle.value
    ? [...new Set([...characteristics.value, ...schemaCharacteristicOptions])]
    : characteristics.value
})
</script>

<style scoped>
.cust-selected-chip {
  color: rgba(34, 139, 34, 0.57);
}
.chip {
  max-width: 75px;
  text-align: center;
  white-space: nowrap;
}
.read-only-chip {
  pointer-events: none;
}
</style>
