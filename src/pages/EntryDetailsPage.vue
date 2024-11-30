<template>
  <v-row no-gutters>
    <v-col cols="12" class="mb-1">
      <v-btn
        @click="router.push({ name: 'FlockManager' })"
        variant="outlined"
        color="info"
        density="compact"
      >
        <v-icon>mdi-arrow-left</v-icon>
        Flock Manager
      </v-btn>
    </v-col>
  </v-row>

  <v-row>
    <display-entry-card
      :entry-id="birdDetails?.id"
      sex="birdDetails?.sex"
    ></display-entry-card>
  </v-row>
</template>

<script setup>
import { onBeforeMount, ref } from 'vue'
import router from '@/plugins/router'
import { useEntryFormStore } from '@/stores/entryFormStore'
import DisplayEntryCard from '@/components/DisplayEntryCard.vue'

import { useRoute } from 'vue-router'

const entryFormStore = useEntryFormStore()
const birdDetails = ref()
const route = useRoute()

onBeforeMount(() => {
  // // Use entryID prop to lookup entries in pinia store
  birdDetails.value = entryFormStore.getEntryById(route.params.id)
})
</script>

<style scoped></style>
