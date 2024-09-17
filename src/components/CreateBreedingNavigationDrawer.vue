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

<!-- TODO, need to add template v-for from gippity to iterate over this and
      avoid the static targeting-->
      <create-breeding-display-entry-card
        :entry-id="sel1"
      ></create-breeding-display-entry-card>
      <v-btn
        variant="outlined"
        color="success"
        class=" "
        :class="mdAndUp ? '' : ''"
        height="50"
        :disabled="selectionIds.size !== 2"
      >
        Generate
        <v-icon size="35" color="success" class="hover-spin-continuous ml-3">
          mdi-atom
        </v-icon>
      </v-btn>
      <create-breeding-display-entry-card
        :entry-id="sel2"
      ></create-breeding-display-entry-card>
    </v-row>
  </v-bottom-sheet>
</template>

<script setup>
import { computed, inject, ref, shallowRef, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useEntryFormStore } from '@/stores/entryFormStore'
import CreateBreedingDisplayEntryCard from '@/components/CreateBreedingDisplayEntryCard.vue'
const mdAndUp = inject('mdAndUp')

const entryFormStore = useEntryFormStore()
const { showBottomSheet, selectionIds } = storeToRefs(entryFormStore)
const oldSize = shallowRef() // used because Map() in pinia is stupid and won't provide oldVal
// const selection1 = computed(() => {
//   console.log('runs!', selectionIds.value.keys().next().value)
//   return selectionIds.value.keys().next().value
// })
// const selection2 = computed(() => selectionIds.value[1])
const sel1 = ref()
const sel2 = ref()
watch(selectionIds.value, (newValue) => {
  // Only popup the navigation drawer the first time the user
  // adds 1, then 2.
  if (oldSize.value === 1 && newValue.size === 2) {
    showBottomSheet.value = true
  }
  const iter = selectionIds.value.keys()
  sel1.value = iter.next().value
  sel2.value = iter.next().value
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
