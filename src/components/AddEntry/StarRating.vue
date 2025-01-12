<template>
  <v-rating
    class="cust-width d-flex justify-center"
    dense
    half-increments
    v-model="formData['rating']"
  ></v-rating>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useEntryFormStore } from '@/stores/entryFormStore'
const entryFormStore = useEntryFormStore()

const { formData } = storeToRefs(entryFormStore)
</script>

<style scoped>
.cust-width {
  max-width: 99%;
}
</style>
