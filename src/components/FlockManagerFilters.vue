<template>
  <!-- filters -->
  <v-col class="ma-0 pa-0" cols="6">
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
        filter
        variant="outlined"
      >
        Criteria
      </v-chip>
    </v-chip-group>
  </v-col>
</template>

<script setup>
import { ref } from 'vue'

const filter = ref([])
</script>

<style scoped></style>
