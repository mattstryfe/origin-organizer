<template>
  <v-row dense no-gutters>
    <v-col cols="12">
      <add-entry-header></add-entry-header>

    </v-col>

    <v-divider class="mb-2"></v-divider>

    <v-col class="v-col-md-6">
      <v-card border class="pb-2 mb-2">
        <v-form>
          <!-- Species Picker -->
          <add-entry-species-picker></add-entry-species-picker>
          <v-divider></v-divider>

          <add-entry-sex-picker></add-entry-sex-picker>

          <add-entry-type-picker></add-entry-type-picker>

          <!-- Form Body -->
          <add-entry-form-details></add-entry-form-details>

          <!-- Form Controls -->
          <add-entry-form-controls></add-entry-form-controls>
        </v-form>
      </v-card>

      <!-- temporary entries display -->
      <v-row class="flex-wrap mt-2 justify-center">
        <display-entry-card v-for="entry in entries" :key="entry" :entry-id="entry.id"></display-entry-card>
      </v-row>

      <!-- some placeholder info -->
      <v-card class="border pb-2">
        <v-card-title>Power User Tools</v-card-title>
        <v-card-subtitle>Add Another?</v-card-subtitle>
        <v-card-subtitle>Add Multiple?</v-card-subtitle>
        <v-card-subtitle>Save as template?</v-card-subtitle>
      </v-card>
    </v-col>

    <!-- Right side widget to hold Object for DEV-ing -->
    <v-col class="pl-3" cols="12" md="6">
      <v-card min-height="1000" class="overflow-auto">
        <v-card-title> Live Reactive/Object</v-card-title>
        <v-card-text>
          <pre>
            {{ formData }}
          </pre>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useEntryFormStore } from '@/stores/entryFormStore'
import AddEntryFormControls from '@/components/AddEntryFormControls.vue'
import DisplayEntryCard from '@/components/DisplayEntryCard.vue'
import AddEntryHeader from '@/components/AddEntryHeader.vue'
import AddEntryTypePicker from '@/components/AddEntryPhasePicker.vue'
import AddEntryFormDetails from '@/components/AddEntryFormDetails.vue'
import { onMounted } from 'vue'
import AddEntrySpeciesPicker from '@/components/AddEntrySpeciesPicker.vue'
import AddEntrySexPicker from '@/components/AddEntrySexPicker.vue'
const entryFormStore = useEntryFormStore()
const { formData, entries } = storeToRefs(entryFormStore)

onMounted(() => {
  entryFormStore.getExistingEntries()
})
</script>

<style scoped>
pre {
  white-space: pre-wrap;
}
</style>
