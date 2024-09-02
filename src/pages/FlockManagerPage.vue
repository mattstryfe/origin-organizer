<template>
  <v-row class="flex-wrap justify-center">
    <flock-manager-filters></flock-manager-filters>

    <v-col v-if="isLoadingEntries" class="v-row">
      <v-skeleton-loader
        v-for="i in 12"
        :key="i"
        width="300"
        height="400"
        class="v-card ma-1 pa-1 border-sm"
        type="card-avatar, article, actions"
      >
      </v-skeleton-loader>
    </v-col>

    <display-entry-card
      v-for="entry in entries"
      :key="entry.id"
      ref="entryRefs"
      :entry-id="entry.id"
      class="cust-border-trans"
      :class="highlightThisCard(entry.id)"
    ></display-entry-card>

    <create-breeding-navigation-drawer> </create-breeding-navigation-drawer>
    <v-btn
      fab
      color="primary"
      icon="mdi-atom"
      class="v-btn--fixed v-btn--top v-btn--right"
      @click="showBottomSheet = !showBottomSheet"
    >
      <v-icon>mdi-atom</v-icon>
    </v-btn>
  </v-row>
</template>

<script setup>
import DisplayEntryCard from '@/components/DisplayEntryCard.vue'
import { storeToRefs } from 'pinia'
import { useEntryFormStore } from '@/stores/entryFormStore'
import { nextTick, onMounted, ref, watch } from 'vue'
import { onLongPress } from '@vueuse/core'
import CreateBreedingNavigationDrawer from '@/components/CreateBreedingNavigationDrawer.vue'
import FlockManagerFilters from '@/components/FlockManagerFilters.vue'

const entryFormStore = useEntryFormStore()
const { entries, selectionIds, isLoadingEntries, showBottomSheet } = storeToRefs(entryFormStore)
const entryRefs = ref([])

const highlightThisCard = (id) => {
  if (selectionIds.value.has(id)) {
    return 'cust-card-highlight'
  }
}

// Long press logic - applied in watch()
const handleLongPress = (entry) => {
  // If exists, delete and exit
  if (selectionIds.value.has(entry.id)) {
    selectionIds.value.delete(entry.id)
    return
  }
  // passing in the ACTUAL entry here.  [entry.value === entries[0]] is true
  selectionIds.value.set(entry.id)
}

// Entries updates from store.  Needs to fire each time it changes.
// However, it also needs to wait for the DOM to update (v-for)
watch(entries, async () => {
  // Required because refs need to be applied to v-for element AFTER render
  // this ONLY needs to happen because this is being attached via [listener/ref]
  await nextTick()

  entryRefs.value.forEach((entryRef, index) => {
    if (entryRef) {
      onLongPress(entryRef, () => handleLongPress(entries.value[index]), {
        delay: 200 // long press duration in ms
      })
    }
  })
})

onMounted(() => {
  // if the watcher already fired...
  if (entryRefs.value.length !== 0) {
    entryRefs.value.forEach((entryRef, index) => {
      if (entryRef) {
        onLongPress(entryRef, () => handleLongPress(entries.value[index]), {
          delay: 200 // long press duration in ms
        })
      }
    })
  }
})
</script>

<style scoped>
.cust-card-highlight {
  border-color: #1976d2 !important;
  border-width: 0.3em !important;
}
.cust-border-trans {
  border-color: blue;
  transition: border-width 0.1s ease;
}

.v-btn--fixed {
  position: fixed !important;
}
.v-btn--top {
  top: 5.5rem;
}
.v-btn--right {
  right: .5rem;
}
</style>
