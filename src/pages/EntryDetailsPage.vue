<template>
  <v-row class="flex-wrap">
    <v-col class="mb-1" cols="12">
      <v-btn
        color="info"
        density="compact"
        variant="outlined"
        @click="router.push({ name: 'FlockManager' })"
      >
        <v-icon>mdi-arrow-left</v-icon>
        Flock Manager
      </v-btn>
      <v-btn class="ml-2" color="info" density="compact" @click="editModeToggle = !editModeToggle">
        <v-icon>mdi-note-edit</v-icon>
      </v-btn>
    </v-col>
    <v-col>
      Editing? - {{ editModeToggle }}
    </v-col>
  </v-row>

  <v-row class="flex-wrap">
    <display-entry-card
      v-if="isDoneLoadingEntries"
      :card-height="smAndUp ? 800 : 600"
      :card-width="smAndUp ? 600 : 450"
      :entry-id="entry.entryId"
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
const smAndUp = inject('smAndUp')

const entryFormStore = useEntryFormStore()
const { isDoneLoadingEntries, editModeToggle } = storeToRefs(entryFormStore)

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
