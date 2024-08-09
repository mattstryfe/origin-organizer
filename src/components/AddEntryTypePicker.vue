<template>
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
</template>

<script setup>
import { schemaPhaseOptions } from '@/entryFormSchema'
import { storeToRefs } from 'pinia'
import { useEntryFormStore } from '@/stores/entryFormStore'

const entryFormStore = useEntryFormStore()
const { formData } = storeToRefs(entryFormStore)

</script>

<style scoped>

</style>