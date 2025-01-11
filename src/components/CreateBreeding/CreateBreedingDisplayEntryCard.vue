<template>
  <v-card class="">
    <v-icon class="position-absolute ma-1" size="small">mdi-gender-male</v-icon>
    <v-img
      class="text-black align-end mb-1 opacity-50"
      cover
      height="125"
      src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
    >
      <!-- Bottom-left rating -->
      <v-rating
        class="align-self-start"
        color="amber"
        density="compact"
        :model-value="3"
        readonly
        size="small"
      ></v-rating>
      {{ entryId }}
    </v-img>
  </v-card>
</template>

<script setup>
const { entryId } = defineProps({
  entryId: {
    type: String,
    default: 'xxx'
  }
})
</script>

<style scoped></style>
