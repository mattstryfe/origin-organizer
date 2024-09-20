<template>
  <v-row class="flex-wrap" :class="mdAndUp ? '' : 'justify-center'">
    <flock-manager-filters></flock-manager-filters>

    <v-col v-if="isLoadingEntries" class="v-row">
      <v-skeleton-loader
        v-for="i in 12"
        :key="i"
        width="300"
        height="400"
        class="v-card ma-1 pa-1 border-sm"
        type="card-avatar, article, actions"
      ></v-skeleton-loader>
    </v-col>

    <display-entry-card
      v-for="entry in entries"
      :key="entry.id"
      ref="entryRefs"
      :entry-id="entry.id"
      :allow-card-deselection="allowCardDeselection"
      class="cust-border-trans"
      :class="highlightThisCard(entry.id)"
    ></display-entry-card>

    <create-breeding-navigation-drawer></create-breeding-navigation-drawer>
    <v-btn
      @click="showBottomSheet = !showBottomSheet"
      fab
      :variant="disableBottomSheetButton ? 'outlined' : 'elevated'"
      :disabled="disableBottomSheetButton"
      icon="mdi-atom"
      class="v-btn--fixed v-btn--top v-btn--right border-thin"
    >
      <v-icon size="30" color="success" class="hover-spin-continuous">
        mdi-atom
      </v-icon>
    </v-btn>
  </v-row>
</template>

<script setup>
import DisplayEntryCard from '@/components/DisplayEntryCard.vue'
import { storeToRefs } from 'pinia'
import { useEntryFormStore } from '@/stores/entryFormStore'
import { inject, nextTick, onMounted, ref, watch } from 'vue'
import { onLongPress } from '@vueuse/core'
import CreateBreedingNavigationDrawer from '@/components/CreateBreedingNavigationDrawer.vue'
import FlockManagerFilters from '@/components/FlockManagerFilters.vue'

const mdAndUp = inject('mdAndUp')
const entryFormStore = useEntryFormStore()
const {
  entries,
  selectionIds,
  isLoadingEntries,
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
  // Manually set deselction back to false.  Will currently impact ALL cards.
  // This is acceptable for now.
  allowCardDeselection.value = false

  // If exists, delete and exit
  if (selectionIds.value.has(entry.id)) {
    selectionIds.value.delete(entry.id)
    return
  }
  // passing in the ACTUAL entry here.  [entry.value === entries[0]] is true
  selectionIds.value.set(entry.id)

  // Also start a timeout to prevent collision with
  setTimeout(() => {
    allowCardDeselection.value = true
  }, 500)
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
