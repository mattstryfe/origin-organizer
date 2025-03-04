<template>
  <v-btn-toggle
    v-model="phase"
    class=""
    :class="displayVertical ? 'flex-column fill-height' : ''"
    color="green-darken-3"
  >
    <v-btn
      v-for="(opt, index) in schemaPhaseOptions"
      :key="index"
      class="border mr-2 mb-2"
      :value="opt.phase"
    >
      <template v-if="opt.component">
        <v-icon size="35">
          <component :is="opt.component"></component>
        </v-icon>
      </template>

      <template v-else>
        <v-icon size="35">
          {{ opt.icon }}
        </v-icon>
      </template>
    </v-btn>
  </v-btn-toggle>
</template>

<script setup>
import { schemaPhaseOptions } from '@/schemas/entryFormSchema'

const phase = defineModel('phase', {})

defineProps({
  displayVertical: {
    type: Boolean,
    default: false
  }
})
</script>

<style scoped></style>
