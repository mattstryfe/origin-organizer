<template>
  <v-col class="d-flex align-center" cols="12">
    <span class="text-caption text-capitalize">{{ textToDisplay }}</span>
    <v-divider v-if="showDivider" class="flex-grow-1 mx-2" />
  </v-col>
</template>

<script setup>
const { textToDisplay } = defineProps({
  textToDisplay: {
    type: String,
    default: 'heading'
  },
  showDivider: {
    type: Boolean,
    default: true
  }
})
</script>

<style scoped></style>
