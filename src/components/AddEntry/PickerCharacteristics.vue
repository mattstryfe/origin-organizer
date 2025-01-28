<template>
  <template v-if="editModeToggle">
    <v-fab
      :active="true"
      class="pl-4"
      color="green-darken-3"
      icon="mdi-plus"
      location="bottom start"
      size="xx-small"
      variant="outlined"
    ></v-fab>

    <v-chip-group
      v-model="formData['characteristics']"
      class="pl-4"
      column
      multiple
    >
      <!-- TODO: this v-for target is trash. need to make better -->
      <v-chip
        v-for="(field, index) in schemaCharacteristicOptions"
        :key="index"
        color="green-darken-3"
        density="compact"
        :value="field"
        variant="outlined"
      >
        <!-- customise the filter slot, which in our case is when they're selected -->
        <!-- #filter is same(shorthand) for v-slot:filter -->
        <template #filter></template>
        <span class="grey">{{ field }}</span>
      </v-chip>
    </v-chip-group>
  </template>
  <template v-else>
    <v-col class="overflow-y-auto" style="max-height: 60px">
      <v-chip
        v-for="(field, index) in schemaCharacteristicOptions"
        :key="index"
        class="mr-1 text-grey lighten-2 mb-1"
        size="x-small"
        variant="outlined"
      >
        {{ field }}
      </v-chip>
    </v-col>
  </template>
</template>

<script setup>
import { schemaCharacteristicOptions } from '@/schemas/entryFormSchema'
import { storeToRefs } from 'pinia'
import { useEntryFormStore } from '@/stores/entryFormStore'
const entryFormStore = useEntryFormStore()
const { formData, editModeToggle } = storeToRefs(entryFormStore)
</script>

<style scoped></style>
