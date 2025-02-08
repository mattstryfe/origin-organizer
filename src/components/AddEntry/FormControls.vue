<template>
  <v-row class="px-4 mt-2 justify-end" no-gutters>
    <v-switch
      v-model="isMultiple"
      class="mr-5"
      color="green-lighten-2"
      density="compact"
      label="Multiple"
    ></v-switch>
    <v-btn color="success" variant="outlined" @click="handleSave">Save</v-btn>
  </v-row>
</template>

<script setup>
import { useEntryFormStore } from '@/stores/entryFormStore'
import { ref } from 'vue'

const isMultiple = ref(false)

const entryFormStore = useEntryFormStore()

const handleSave = async () => {
  await entryFormStore.saveEntryToDb()
  if (!isMultiple.value) {
    console.log(' here')
    entryFormStore.clearFormData()
  }
}
</script>

<style scoped></style>
