<template>
  <v-row class="flex-wrap px-3">
    <flock-manager-filters />
    <FlockManagerSearchField />
    <template v-if="!isDoneLoadingEntries">
      <v-skeleton-loader
        v-for="i in 12"
        :key="i"
        class="v-card ma-1 pa-1 border-sm w-100"
        :height="useLayoutStore().calculatedHeight"
        type="card-avatar, article, actions"
      />
    </template>

    <template v-if="isDoneLoadingEntries">
      <display-entry-card
        v-for="(entry, index) in searchedEntries"
        :key="entry.entryId"
        :ref="(el) => (entryRefs[index] = el)"
        :allow-card-deselection="allowCardDeselection"
        class="cust-border-trans"
        :class="highlightThisCard(entry.entryId)"
        :entry-id="entry.entryId"
      />
    </template>

    <create-breeding-navigation-drawer />
    <v-btn
      class="v-btn--fixed v-btn--top v-btn--right border-thin"
      :disabled="disableBottomSheetButton"
      fab
      icon="mdi-atom"
      :variant="disableBottomSheetButton ? 'outlined' : 'elevated'"
      @click="showBottomSheet = !showBottomSheet"
    >
      <v-icon class="hover-spin-continuous" color="success" size="30">
        mdi-atom
      </v-icon>
    </v-btn>
  </v-row>
</template>

<script setup>
import DisplayEntryCard from '@/components/Cards/DisplayEntryCard.vue'
import { storeToRefs } from 'pinia'
import { useEntryFormStore } from '@/stores/entryFormStore'
import { nextTick, ref, watch } from 'vue'
import { onLongPress } from '@vueuse/core'
import CreateBreedingNavigationDrawer from '@/components/CreateBreeding/CreateBreedingNavigationDrawer.vue'
import FlockManagerFilters from '@/components/FlockManagerFilters.vue'
import { useLayoutStore } from '@/stores/layoutStore.js'
import FlockManagerSearchField from '../components/FlockManagerSearchField.vue'

const entryFormStore = useEntryFormStore()
const {
  entries,
  searchedEntries,
  selectionIds,
  isDoneLoadingEntries,
  showBottomSheet,
  disableBottomSheetButton
} = storeToRefs(entryFormStore)
const entryRefs = ref([])
const allowCardDeselection = ref(false)

const highlightThisCard = (id) => {
  if (selectionIds.value.has(id)) {
    return 'cust-card-highlight'
  }
}

// Long press logic - applied in watch()
const handleLongPress = (entry) => {
  // This should work but there's no way of testing it until this is deployed...
  if (navigator.vibrate) {
    navigator.vibrate([100, 50, 100]) // Vibrate pattern
  }

  // Manually set deselection back to false.  Will currently impact ALL cards.
  // This is acceptable for now.
  allowCardDeselection.value = false

  // If exists, delete and exit
  if (selectionIds.value.has(entry.entryId)) {
    selectionIds.value.delete(entry.entryId)
    return
  }
  // passing in the ACTUAL entry here.  [entry.value === entries[0]] is true
  selectionIds.value.set(entry.entryId)

  // Also start a timeout to prevent collision with
  setTimeout(() => {
    allowCardDeselection.value = true
  }, 500)
}

// Entries updates from store.  Needs to fire each time it changes.
// However, it also needs to wait for the DOM to update (v-for)
watch(entries, async () => {
  await nextTick()
  // Required because refs need to be applied to v-for element AFTER render
  // this ONLY needs to happen because this is being attached via [listener/ref]
  // This now only runs once and in a watcher instead of deconflicting an onMounted()
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

/*Needed to prevent bouncing when blue selection border is added */
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
  right: 0.5rem;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.hover-spin-continuous {
  animation: spin 5s linear infinite;
}
.cust-o {
  overflow: visible !important;
}
</style>
