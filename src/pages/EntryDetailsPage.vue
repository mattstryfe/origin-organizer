<template>
  <v-row class="flex-wrap">
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

  <v-row class="flex-wrap">
    <!-- displayEntryCard expects entry-id to be populated -->
    <display-entry-card
      v-if="isDoneLoadingEntries"
      :entry-id="entry.id"
    ></display-entry-card>
  </v-row>
</template>

<script setup>
import { computed, inject } from 'vue'
import router from '@/plugins/router'
import { useEntryFormStore } from '@/stores/entryFormStore'
import DisplayEntryCard from '@/components/Cards/DisplayEntryCard.vue'

import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'

const entryFormStore = useEntryFormStore()
const { isDoneLoadingEntries } = storeToRefs(entryFormStore)

const route = useRoute()
// a few components need to gracefully handle direct navigation.  This is one of them.
// because of that, we have 2 hooks which need to be de-conflicted

// This mostly handles direct navigation by watching for the query to come back
// When the user is within the app, this information is already available so rendering can
// be handled via mounted
// the router finishes before the queries do.
const entry = computed(() => entryFormStore.getEntryById(route.params.id))
</script>

<style scoped></style>
