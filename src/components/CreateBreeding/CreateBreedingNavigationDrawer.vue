<template>
  <v-bottom-sheet v-model="showBottomSheet" persistent :scrim="false">
    <v-btn
      class="position-absolute right-0 mt-n9 bg-surface border-thin"
      icon="mdi-close"
      size="small"
      variant="flat"
      @click="showBottomSheet = false"
    ></v-btn>
    <v-row
      class="bg-surface pa-2 align-center border-t-thin justify-space-around"
      no-gutters
    >
      <template v-for="(selectionId, ind) in selectionIds" :key="ind">
        <v-col cols="3" lg="2">
          <create-breeding-display-entry-card
            :entry-id="selectionId[0]"
          ></create-breeding-display-entry-card>
        </v-col>
        <v-btn
          v-if="ind === 0"
          color="success"
          :disabled="selectionIds.size !== 2"
          height="50"
          variant="outlined"
        >
          Generate
          <v-icon class="hover-spin-continuous ml-3" color="success" size="35">
            mdi-atom
          </v-icon>
        </v-btn>
      </template>
    </v-row>
  </v-bottom-sheet>
</template>

<script setup>
import { shallowRef, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useEntryFormStore } from '@/stores/entryFormStore'
import CreateBreedingDisplayEntryCard from '@/components/CreateBreeding/CreateBreedingDisplayEntryCard.vue'

const entryFormStore = useEntryFormStore()
const { showBottomSheet, selectionIds } = storeToRefs(entryFormStore)
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
