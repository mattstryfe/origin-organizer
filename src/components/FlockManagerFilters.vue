<template>
  <!-- filters -->
  <v-col cols="12">
    <v-chip-group
      v-model="filter"
      column
      multiple
      selected-class="text-green-darken-3"
    >
      <v-icon class="pt-1 mr-3">mdi-filter-variant-plus</v-icon>

      <v-chip
        v-for="n in 5"
        :key="n"
        class="mr-1"
        density="compact"
        variant="outlined"
        filter
      >
        Criteria
      </v-chip>
    </v-chip-group>
    <span class="text-caption mr-2">Filter choices: {{ filter }}</span>

    <!-- Add filtering components here populated by info from queries -->
  </v-col>
</template>

<script setup>
import { ref } from 'vue'

const filter = ref([])
</script>

<style scoped></style>
