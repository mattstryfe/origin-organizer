<template>
  <v-row dense no-gutters>
    <v-col cols="12" class="mb-2">
      <v-card color="" border>
        <v-card-title>Add Entry</v-card-title>
        <v-card-subtitle>Advanced Add/Expansion</v-card-subtitle>
        <v-card-subtitle>Add multiple?</v-card-subtitle>
        <v-card-subtitle>How many?</v-card-subtitle>
        <v-card-subtitle>Display them and edit manually?</v-card-subtitle>
      </v-card>
    </v-col>
    <v-col cols="6">
      <v-btn-toggle
        v-for="(opt, index) in schemaOptions"
        :key="index"
        v-model="formData['type']"
        class="my-2"
      >
        <v-btn class="mr-1 border" :value="opt.type">
          <v-icon v-for="i in opt.icon" :key="i" :size="opt.iconSize">
            {{ i }}
          </v-icon>
        </v-btn>
      </v-btn-toggle>
      <add-entry-form></add-entry-form>
      <v-card>
        <v-card-subtitle>Add Another?</v-card-subtitle>
        <v-card-subtitle>Add Multiple?</v-card-subtitle>
        <v-card-subtitle>Save as template?</v-card-subtitle>
      </v-card>
    </v-col>
    <v-col class="ml-3">
      <v-card min-height="500">
        <v-card-title> Live Reactive/Object</v-card-title>
        <v-card-text>
          <pre>
            {{ formData }}
<!--            {{ entryType }}-->
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
import { schemaOptions } from '@/entryFormSchema'
import { ref } from 'vue'

const entryType = ref({})
</script>

<style scoped></style>
