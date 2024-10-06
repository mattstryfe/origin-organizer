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
          <v-row no-gutters dense class="ma-2">
            <v-col>
              <add-entry-species-picker></add-entry-species-picker>
            </v-col>
            <v-col><add-entry-sex-picker></add-entry-sex-picker></v-col>
            <v-col>
              <add-entry-phase-picker></add-entry-phase-picker>
            </v-col>
          </v-row>

          <v-divider></v-divider>

          <add-entry-breed-picker></add-entry-breed-picker>
          <!-- Form Body -->
          <add-entry-form-details></add-entry-form-details>

          <!-- Form Controls -->
          <add-entry-form-controls></add-entry-form-controls>
        </v-form>
      </v-card>

      <!-- temporary entries display -->
      <v-row class="flex-wrap mt-2 justify-center">
        <display-entry-card
          v-for="entry in entries"
          :key="entry"
          :entry-id="entry.id"
        ></display-entry-card>
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
        <v-card-title>Live Reactive/Object</v-card-title>
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
import AddEntryPhasePicker from '@/components/AddEntryPhasePicker.vue'
import AddEntryFormDetails from '@/components/AddEntryFormDetails.vue'
import { onMounted } from 'vue'
import AddEntrySpeciesPicker from '@/components/AddEntrySpeciesPicker.vue'
import AddEntrySexPicker from '@/components/AddEntrySexPicker.vue'
import AddEntryBreedPicker from '@/components/AddEntryBreedPicker.vue'
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
