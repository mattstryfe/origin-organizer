<template>
  <v-form>
    <v-row no-gutters dense>
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
      >
      </component>
    </v-row>


    <!-- special/ complex components -->
    <v-card border class="bg-transparent overflow-visible mb-4">
      <v-card-subtitle class="mt-n3 ml-n1 bg-grey-darken-4">Characteristics</v-card-subtitle>


      <v-chip-group v-model="formData['characteristics']" column class="pa-2" multiple>
        <!-- TODO: this v-for target is trash. need to make better -->
        <v-chip
          v-for="(field, index) in chickSchema[0].items"
          :key="index"
          variant="outlined"
          density="compact"
          :value="field"
          color="green-accent-4"
        >
          <!-- customise the filter slot, which in our cars is when they're selected -->
          <!-- #filter is same(shorthand) for v-slot:filter -->
          <template #filter>
          </template>
          <span class="grey">{{ field }}</span>

        </v-chip>
      </v-chip-group>
    </v-card>

  </v-form>
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
