<template>
  <v-textarea
    density="compact"
    rows="3"
    variant="outlined"
    v-model="notes"
  ></v-textarea>
</template>

<script setup>
const notes = defineModel('notes', { type: String })
</script>

<style scoped></style>
