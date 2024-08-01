<template>
  <v-row dense no-gutters>
    <v-col cols="12" class="mb-4">
      <v-card border class="pb-2">
        <v-card-title>Add Entry</v-card-title>
        <v-card-subtitle>Advanced Add/Expansion</v-card-subtitle>
        <v-card-subtitle>Add multiple?</v-card-subtitle>
        <v-card-subtitle>How many?</v-card-subtitle>
        <v-card-subtitle>Display them and edit manually?</v-card-subtitle>
      </v-card>
    </v-col>
    <v-divider class="mb-2"></v-divider>
    <v-col class="v-col-md-6">
      <!-- Custom Entry Type Picker -->
      <v-card border class="pb-2 mb-2">
        <v-form>

          <!-- Entry Type Picker -->
          <v-btn-toggle
            v-model="formData['type']"
            color="green-darken-3"
            class="ma-4 flex-wrap fill-height"
          >
            <v-btn
              v-for="(opt, index) in schemaPhaseOptions"
              :key="index"
              class="border mr-2 mb-2"
              :value="opt.type"
              height="40"
            >
              <v-icon v-for="i in opt.icon" :key="i" :size="opt.iconSize" >
                {{ i }}
              </v-icon>
            </v-btn>
          </v-btn-toggle>

          <!-- Basic Form -->
          <add-entry-form></add-entry-form>

          <add-entry-form-controls></add-entry-form-controls>
        </v-form>
      </v-card>

      <!-- some placeholder info -->
      <v-card class="pb-2">
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
import AddEntryForm from '@/components/AddEntryForm.vue'
import { storeToRefs } from 'pinia'
import { useEntryFormStore } from '@/stores/entryFormStore'
const entryFormStore = useEntryFormStore()
const { formData } = storeToRefs(entryFormStore)
import { schemaPhaseOptions } from '@/entryFormSchema'
import AddEntryFormControls from '@/components/AddEntryFormControls.vue'
</script>

<style scoped>
pre {
  white-space: pre-wrap;
}
</style>
