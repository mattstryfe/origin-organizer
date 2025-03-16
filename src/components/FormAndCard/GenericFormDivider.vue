<template>
  <v-col
    class="d-flex align-center py-0"
    cols="12"
  >
    <span class="text-caption text-capitalize text-blue-accent-1">
      {{ textToDisplay }}
    </span>
    <v-divider
      v-if="showDivider"
      class="flex-grow-1 mx-2"
    />
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
