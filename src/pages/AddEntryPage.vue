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
                <picker-phase
                  v-model:phase="formData['phase']"
                  :display-vertical="true"
                />
                <picker-sex
                  v-model:sex="formData['sex']"
                  :display-vertical="true"
                />
              </v-col>
              <v-col><star-rating /></v-col>

              <v-col>
                <drop-down-parents
                  target="mother"
                  v-model:parent="formData['mother']"
                />
                <drop-down-parents
                  target="father"
                  v-model:parent="formData['father']"
                />
              </v-col>

              <!-- Form Body -->
              <v-divider></v-divider>
              <form-details />
              <span class="ml-4 text-body-2">Notes:</span>
              <textarea-notes
                v-model:active-note="formData['notes']['active']"
                :archived-notes="formData['notes']['archived']"
                class="px-4"
              />
              <upload-image />

              <!-- TODO: update this one to work with new v-model pattern -->
              <picker-characteristics />
            </v-col>

            <v-col cols="4">
              <picker-breed v-model:breed="formData['breed']" />
            </v-col>
          </v-row>

          <v-divider></v-divider>
          <!-- Form Controls -->
          <form-controls />
        </v-form>
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
import FormControls from '@/components/FormAndCard/FormControls.vue'
import PickerPhase from '@/components/FormAndCard/PickerPhase.vue'
import FormDetails from '@/components/FormAndCard/FormDetails.vue'
import PickerSpecies from '@/components/FormAndCard/PickerSpecies.vue'
import PickerSex from '@/components/FormAndCard/PickerSex.vue'
import PickerBreed from '@/components/FormAndCard/PickerBreed.vue'
import PickerCharacteristics from '@/components/FormAndCard/PickerCharacteristics.vue'
import ProgressTracker from '@/components/FormAndCard/ProgressTracker.vue'
import StarRating from '@/components/FormAndCard/StarRating.vue'
import UploadImage from '@/components/FormAndCard/UploadImage.vue'
import DropDownParents from '@/components/FormAndCard/DropDownParents.vue'
import TextareaNotes from '@/components/FormAndCard/TextareaNotes.vue'

const entryFormStore = useEntryFormStore()
const { formData } = storeToRefs(entryFormStore)
</script>

<style scoped>
pre {
  white-space: pre-wrap;
}
</style>
