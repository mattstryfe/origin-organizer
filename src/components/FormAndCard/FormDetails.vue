<template>
  <v-row
    class="px-4 mt-2"
    no-gutters
  >
    <component
      :is="getFieldComponent(field.type)"
      v-for="(field, index) in schemaToUse"
      :key="index"
      v-model="formData[field.model]"
      :append-inner-icon="field.appendIcon"
      :chips="field.chips"
      :class="field.class || 'v-col-12'"
      density="compact"
      :items="field.items"
      :label="field.label"
      :multiple="field.multiple"
      persistent-placeholder
      :placeholder="field.placeholder"
      variant="outlined"
      @click:append-inner="genericAppendAction(field)"
    />
  </v-row>
</template>

<script setup>
import { useEntryFormStore } from '@/stores/entryFormStore'
import { baseSchema } from '@/schemas/entryFormSchema'
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
const entryFormStore = useEntryFormStore()

const schemaToUse = ref(baseSchema)
const { formData } = storeToRefs(entryFormStore)

// This simply makes choosing a date less annoying
const genericAppendAction = (field) => {
  switch (field.appendInnerAction) {
    case 'autoPopulateToToday':
      formData.value.DoB = field.placeholder
  }
}
const getFieldComponent = (type) => {
  switch (type) {
    case 'checkbox':
      return 'v-checkbox'
    case 'dropdown':
      return 'v-select'
    case 'text-area':
      return 'v-textarea'
    default:
      return 'v-text-field'
  }
}
</script>

<style scoped></style>
