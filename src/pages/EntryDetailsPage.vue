<template>
  <v-row no-gutters>
    <v-col cols="12" class="mb-1">
      <v-btn variant="outlined" color="info" density="compact" @click="router.push({ name: 'FlockManager'})">
        <v-icon >mdi-arrow-left</v-icon> Flock Manager

      </v-btn>
    </v-col>
    <display-entry-card :entry-id="id" ></display-entry-card>
  </v-row>

</template>

<script setup>
import DisplayEntryCard from '@/components/DisplayEntryCard.vue'
import router from '@/plugins/router'

defineProps({
  id: { type: String, required: true, default: 'n/a' }
})
</script>

<style scoped></style>