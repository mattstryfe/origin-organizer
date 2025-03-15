<template>
  <!-- in edit mode, this will show -->
  <v-col cols="12">
    <v-textarea
      density="compact"
      rows="3"
      variant="outlined"
      v-model="activeNote"
    ></v-textarea>
  </v-col>
  <!-- this area will show a list of last 3 entries in read mode-->
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

const { archivedNotes } = defineProps({
  archivedNotes: {
    type: Array,
    default: () => []
  }
})
// const appendedNotes = computed(() => notes.fi)
const test = ['there are some notes', '2 notes here..', '3 notes here..']
</script>

<style scoped></style>
