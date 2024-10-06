<template>
  <v-fab
    :active="true"
    class="pl-4"
    icon="mdi-plus"
    location="bottom start"
    size="xx-small"
    color="green-darken-3"
    variant="outlined"
  ></v-fab>

  <v-chip-group
    v-model="formData['characteristics']"
    column
    class="pl-4"
    multiple
  >
    <!-- TODO: this v-for target is trash. need to make better -->
    <v-chip
      v-for="(field, index) in schemaCharacteristicOptions"
      :key="index"
      variant="outlined"
      density="compact"
      :value="field"
      color="green-darken-3"
    >
      <!-- customise the filter slot, which in our case is when they're selected -->
      <!-- #filter is same(shorthand) for v-slot:filter -->
      <template #filter></template>
      <span class="grey">{{ field }}</span>
    </v-chip>
  </v-chip-group>
</template>

<script setup>
import { schemaCharacteristicOptions } from '@/schemas/entryFormSchema'
import { storeToRefs } from 'pinia'
import { useEntryFormStore } from '@/stores/entryFormStore'
const entryFormStore = useEntryFormStore()
const { formData } = storeToRefs(entryFormStore)
</script>

<style scoped></style>
