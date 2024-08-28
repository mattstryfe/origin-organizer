<template>
  <v-row dense no-gutters>
    <add-entry-header></add-entry-header>

    <v-divider class="mb-2"></v-divider>

    <v-col class="v-col-md-6">
      <!-- Custom Entry Type Picker -->
      <v-card border class="pb-2 mb-2">
        <v-form>

          <!-- Species Picker -->
          <add-entry-species-picker></add-entry-species-picker>
          <v-divider></v-divider>

          <!-- Entry Type Picker -->
          <add-entry-type-picker></add-entry-type-picker>

          <!-- Basic Form -->
          <add-entry-form-details></add-entry-form-details>

          <add-entry-form-controls></add-entry-form-controls>
        </v-form>
      </v-card>

      <!-- temporary entries display -->
      <v-card class="border pa-4 mb-2">
        <v-row class="flex-wrap">
          <display-entry-card v-for="entry in entries" :key="entry" :entry-id="entry.id"></display-entry-card>
        </v-row>
      </v-card>

      <!-- some placeholder info -->
      <v-card class="border pb-2">
        <v-card-title>Power User Tools</v-card-title>
        <v-card-subtitle>Add Another?</v-card-subtitle>
        <v-card-subtitle>Add Multiple?</v-card-subtitle>
        <v-card-subtitle>Save as template?</v-card-subtitle>
      </v-card>
    </v-col>

    <!-- Right side widget to hold Object for DEV-ing -->
    <v-col class="pl-3 v-col-md-6">
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
import AddEntryTypePicker from '@/components/AddEntryTypePicker.vue'
import AddEntryFormDetails from '@/components/AddEntryFormDetails.vue'
import { onMounted } from 'vue'
import AddEntrySpeciesPicker from '@/components/AddEntrySpeciesPicker.vue'
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
