<template>
  characteristicsToUse {{ characteristicsToUse }}
  <v-chip-group
    v-model="formData['characteristics']"
    class="pl-4 d-block"
    column
    multiple
  >
    <v-chip
      v-for="(field, index) in characteristicsToUse"
      :key="index"
      class="mb-1"
      :class="{ 'read-only-chip': !editModeToggle }"
      color="green-darken-3"
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
import { ref, watch } from 'vue'
import { rawSchemaCharacteristicOptions } from '@/schemas/entryFormSchema'

const entryFormStore = useEntryFormStore()
const { formData, editModeToggle } =
  storeToRefs(entryFormStore)

const { characteristics } = defineProps({
  characteristics: {
    type: Array,
    default: () => []
  }
})

const characteristicsToUse = ref([])
const schemaCharacteristicOptions = structuredClone(rawSchemaCharacteristicOptions);
// Characteristics need to be wired up to the schema AND the options available (during edit mode)
// because of this, we need to tether and re-tether reactivity during editMode toggles
watch(
  () => editModeToggle.value,
  (newValue) => {
    characteristicsToUse.value = newValue
      ? [...new Set([...characteristics, ...schemaCharacteristicOptions])]
      : [...characteristics]

    formData.value['characteristics'] = [...characteristics]
    console.log('formData.value[\'characteristics\']', formData.value['characteristics'])

  },
  { immediate: true }
)
</script>

<style scoped>
.read-only-chip {
  pointer-events: none;
  opacity: 0.8;
  border-color: rgba(26, 195, 11, 0.3);
}
</style>
