<template>
  <v-card class="">
    <v-icon size="small" class="position-absolute ma-1">mdi-gender-male</v-icon>

    <v-img
      height="100"
      src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
      cover
      class="text-black align-end mb-1 opacity-50"
    >
      <!-- Bottom-left rating -->
      <v-rating
        density="compact"
        size="small"
        readonly
        :model-value="3"
        color="amber"
        class="align-self-start"
      ></v-rating>
    </v-img>
  </v-card>
</template>

<script setup></script>

<style scoped></style>
