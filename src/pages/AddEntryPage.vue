<template>
  <v-row dense no-gutters>
    <v-col cols="12">
      <progress-tracker />
    </v-col>

    <v-divider class="mb-2"></v-divider>

    <v-col class="v-col-md-6">
      <v-card border class="pb-2 mb-2">
        <v-form>
          <!-- Species Picker -->
          <v-row class="mt-2" no-gutters>
            <v-col cols="8">
              <v-col class="d-flex justify-space-around">
                <picker-species />
                <picker-phase />
                <picker-sex />
              </v-col>

              <v-col>
                <drop-down-parents/>
              </v-col>

              <!-- Form Body -->
              <v-divider></v-divider>
              <form-details />
              <upload-image />

              <picker-characteristics />
            </v-col>

            <v-col cols="4">
              <picker-breed />
            </v-col>
          </v-row>

          <v-divider></v-divider>
          <!-- Form Controls -->
          <form-controls />
        </v-form>
      </v-card>

      <!-- temporary entries display -->
      <v-row class="flex-wrap mt-2 justify-center">
        <display-entry-card
          v-for="entry in entries"
          :key="entry"
          :entry-id="entry.entryId"
          :sex="entry.sex"
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
      <v-card class="overflow-auto" min-height="1000">
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
import { onMounted } from 'vue'

import FormControls from '@/components/AddEntry/FormControls.vue'
import DisplayEntryCard from '@/components/Cards/DisplayEntryCard.vue'
import PickerPhase from '@/components/AddEntry/PickerPhase.vue'
import FormDetails from '@/components/AddEntry/FormDetails.vue'
import PickerSpecies from '@/components/AddEntry/PickerSpecies.vue'
import PickerSex from '@/components/AddEntry/PickerSex.vue'
import PickerBreed from '@/components/AddEntry/PickerBreed.vue'
import PickerCharacteristics from '@/components/AddEntry/PickerCharacteristics.vue'
import ProgressTracker from '@/components/AddEntry/ProgressTracker.vue'
import UploadImage from '@/components/AddEntry/UploadImage.vue'
import DropDownParents from '@/components/AddEntry/DropDownParents.vue'

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
