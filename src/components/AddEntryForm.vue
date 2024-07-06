<template>
  <v-row no-gutters class="px-4 mt-2">
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
      :class="field.class || 'v-col-12'"
      :placeholder="field.placeholder"
      :append-inner-icon="field.appendIcon"
      @click:append-inner="genericAppendAction(field)"
    >
    </component>
  </v-row>

  <!-- special/ complex components -->
  <v-card-title>Characteristics</v-card-title>
  <v-chip-group
    v-model="formData['characteristics']"
    column
    class="pl-4"
    multiple
  >
    <!-- TODO: this v-for target is trash. need to make better -->
    <v-chip
      v-for="(field, index) in chickSchema[0].items"
      :key="index"
      variant="outlined"
      density="compact"
      :value="field"
      color="green-darken-3"
    >
      <!-- customise the filter slot, which in our cars is when they're selected -->
      <!-- #filter is same(shorthand) for v-slot:filter -->
      <template #filter> </template>
      <span class="grey">{{ field }}</span>
    </v-chip>
  </v-chip-group>
</template>

<script setup>
import { useEntryFormStore } from '@/stores/entryFormStore'
import { baseSchema } from '@/entryFormSchema'
import { chickSchema } from '@/entryFormSchema'
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
const entryFormStore = useEntryFormStore()

const schemaToUse = ref(baseSchema)
// const chickSchema = ref(chickSchema)
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
