<template>
  <v-btn-toggle
    v-model="sex"
    :class="displayVertical ? 'flex-column fill-height' : ''"
    color="green-darken-3"
  >
    <v-btn
      v-for="(opt, index) in schemaSexOptions"
      :key="index"
      class="border mr-2 mb-2"
      :value="opt.sex"
    >
      <v-icon size="35">
        {{ opt.icon }}
      </v-icon>
    </v-btn>
  </v-btn-toggle>
</template>

<script setup>
import { schemaSexOptions } from '@/schemas/entryFormSchema'
const sex = defineModel('sex', { type: Object })

defineProps({
  displayVertical: {
    type: Boolean,
    default: false
  }
})
</script>

<style scoped></style>
