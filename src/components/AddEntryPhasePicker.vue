<template>
  <v-btn-toggle
    v-model="formData['phase']"
    color="green-darken-3"
    class="flex-wrap fill-height"
  >
    <v-btn
      v-for="(opt, index) in schemaPhaseOptions"
      :key="index"
      class="border mr-2 mb-2"
      :value="opt.phase"
    >
      <template v-if="opt.component">
        <v-icon :size="opt.iconSize" class="px-2">
          <component :is="opt.component"></component>
        </v-icon>
      </template>

      <template v-else>
        <v-icon :size="opt.iconSize">
          {{ opt.icon }}
        </v-icon>
      </template>
    </v-btn>
  </v-btn-toggle>
</template>

<script setup>
import { schemaPhaseOptions } from '@/schemas/entryFormSchema'
import { storeToRefs } from 'pinia'
import { useEntryFormStore } from '@/stores/entryFormStore'

const entryFormStore = useEntryFormStore()
const { formData } = storeToRefs(entryFormStore)

</script>

<style scoped>

</style>