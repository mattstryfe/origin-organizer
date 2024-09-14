<template>
  <v-bottom-sheet v-model="showBottomSheet"  :scrim="false" persistent>
    <v-btn
      variant="flat"
      size="small"
      icon="mdi-close"
      class="position-absolute right-0 mt-n9 bg-surface border-thin"
      @click="showBottomSheet = false"
    >
    </v-btn>
    <v-row class="bg-surface pa-2 align-center border-t-thin " no-gutters>
      <create-breeding-display-entry-card></create-breeding-display-entry-card>
      <v-btn
        variant="outlined"
        color="success"
        class="mx-auto justify-end"
        :class="mdAndUp ? '' : ''"
        height="50"
        :disabled="selectionIds.size !== 2"
      >
        Generate
        <v-icon size="35" color="success" class="hover-spin-continuous ml-3"
          >mdi-atom</v-icon
        >
      </v-btn>
      <create-breeding-display-entry-card></create-breeding-display-entry-card>
    </v-row>
  </v-bottom-sheet>
</template>

<script setup>
import { inject, shallowRef, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useEntryFormStore } from '@/stores/entryFormStore'
import CreateBreedingDisplayEntryCard from '@/components/CreateBreedingDisplayEntryCard.vue'
const mdAndUp = inject('mdAndUp')

const entryFormStore = useEntryFormStore()
const { showBottomSheet, selectionIds } = storeToRefs(entryFormStore)
const oldSize = shallowRef(); // used because Map() in pinia is stupid and won't provide oldVal

watch( selectionIds.value,
  (newValue) => {
  // Only popup the navigation drawer the first time the user
  // adds 1, then 2.
  if (oldSize.value === 1 && newValue.size === 2) {
    showBottomSheet.value = true
  }
  oldSize.value = newValue.size
})
</script>

<style scoped>
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
