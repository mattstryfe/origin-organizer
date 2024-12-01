<template>
  <v-bottom-sheet v-model="showBottomSheet" :scrim="false" persistent>
    <v-btn
      @click="showBottomSheet = false"
      variant="flat"
      size="small"
      icon="mdi-close"
      class="position-absolute right-0 mt-n9 bg-surface border-thin"
    ></v-btn>
    <v-row
      class="bg-surface pa-2 align-center border-t-thin justify-space-around"
      no-gutters
    >
      <template v-for="(selectionId, ind) in selectionIds" :key="ind">
        <v-col cols="3" lg="2">
          <create-breeding-display-entry-card :entry-id="selectionId[0]"></create-breeding-display-entry-card>
        </v-col>
        <v-btn
          v-if="ind === 0"
          variant="outlined"
          color="success"
          height="50"
          :disabled="selectionIds.size !== 2"
        >
          Generate
          <v-icon size="35" color="success" class="hover-spin-continuous ml-3">
            mdi-atom
          </v-icon>
        </v-btn>
      </template>
    </v-row>
  </v-bottom-sheet>
</template>

<script setup>
import { inject, shallowRef, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useEntryFormStore } from '@/stores/entryFormStore'
import CreateBreedingDisplayEntryCard from '@/components/CreateBreeding/CreateBreedingDisplayEntryCard.vue'

const entryFormStore = useEntryFormStore()
const { showBottomSheet, selectionIds, entries } = storeToRefs(entryFormStore)
const oldSize = shallowRef() // used because Map() in pinia is stupid and won't provide oldVal
watch(selectionIds.value, (newValue) => {
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
