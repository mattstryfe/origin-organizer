<template>
  <v-form>
    <component
      :is="getFieldComponent(field.type)"
      v-for="(field, index) in schemaToUse"
      :key="index"
      v-model="formData[field.model]"
      :items="field.items"
      :label="field.label"
      persistent-placeholder
      density="compact"
      variant="outlined"
      :multiple="field.multiple"
      :chips="field.chips"
    />
  </v-form>
</template>

<script setup>
import { useEntryFormStore } from '@/stores/entryFormStore'
import { baseSchema } from '@/entryFormSchema'
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
const entryFormStore = useEntryFormStore()

const schemaToUse = ref(baseSchema)
const { formData } = storeToRefs(entryFormStore)

const getFieldComponent = (type) => {
  switch (type) {
    case 'slider':
      return 'v-slider'
    case 'checkbox':
      return 'v-checkbox'
    case 'dropdown':
      return 'v-select'
    case 'email':
      return 'EmailInput'
    case 'text-area':
      return 'v-textarea'
    default:
      return 'v-text-field'
  }
}
</script>

<style scoped></style>