<template>
  <v-row dense no-gutters>
    <v-col class="v-col-md-6">
      <v-card border class="pb-2 mb-2">
        <v-form>
          <!-- Species Picker -->
          <v-row class="mt-2" no-gutters>
            <v-col cols="8">
              <generic-form-divider show-divider text-to-display="details" />

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

              <form-details />

              <generic-form-divider show-divider text-to-display="notes" />
              <textarea-notes
                v-model:active-note="formData['notes']['active']"
                :disabled="false"
              />

              <generic-form-divider
                show-divider
                text-to-display="characteristics"
              />
              <picker-characteristics
                v-model:characteristics="formData['characteristics']"
              />
              <upload-image />
            </v-col>

            <v-col cols="4">
              <generic-form-divider show-divider text-to-display="breed(s)" />
              <picker-breed v-model:breed="formData['breed']" />
            </v-col>
          </v-row>

          <v-divider />
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
import StarRating from '@/components/FormAndCard/StarRating.vue'
import UploadImage from '@/components/FormAndCard/UploadImage.vue'
import DropDownParents from '@/components/FormAndCard/DropDownParents.vue'
import TextareaNotes from '@/components/FormAndCard/TextareaNotes.vue'
import GenericFormDivider from '@/components/FormAndCard/GenericFormDivider.vue'

const entryFormStore = useEntryFormStore()
const { formData } = storeToRefs(entryFormStore)
</script>

<style scoped>
pre {
  white-space: pre-wrap;
}
</style>
