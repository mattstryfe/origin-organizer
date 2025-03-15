<template>
  <v-col cols="12">
    <v-textarea
      density="compact"
      :disabled="disabled"
      rows="3"
      variant="outlined"
      v-model="activeNote"
    ></v-textarea>
  </v-col>
  <v-card v-for="n in archivedNotes" :key="n">
    <v-card-title>author:</v-card-title>
    <v-card-subtitle>
      {{ n }}
    </v-card-subtitle>
  </v-card>
</template>

<script setup>
const activeNote = defineModel('activeNote', {
  type: String,
  default: 'default note...'
})

const { archivedNotes, disabled } = defineProps({
  archivedNotes: {
    type: Array,
    default: () => []
  },
  disabled: {
    type: Boolean,
    default: true
  }
})
</script>

<style scoped></style>
