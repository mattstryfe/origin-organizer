<template>
  <v-row class="flex-wrap" :class="smAndDown ? 'justify-center' : ''">
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

  <v-row  class="flex-wrap" :class="smAndDown ? 'justify-center' : ''">
    <v-col v-if="!isDoneLoadingEntries">
      <v-skeleton-loader
        v-for="i in 1"
        :key="i"
        width="300"
        height="400"
        class="v-card ma-1 pa-1 border-sm"
        type="card-avatar, article, actions"
      ></v-skeleton-loader>
    </v-col>

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
import DisplayEntryCard from '@/components/DisplayEntryCard.vue'

import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'

const smAndDown = inject('smAndDown')
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
