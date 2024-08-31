<template>
  <v-bottom-sheet v-model="showBottomSheet" class="border-md">
    <!--    <v-row no-gutters class="bg-surface">
      <v-btn variant="plain" icon="mdi-close" @click="showBottomSheet = false" class="ml-auto">
      </v-btn>
      &lt;!&ndash; close button &ndash;&gt;
    </v-row>-->
    <v-row class="flex-wrap bg-surface pa-2 align-center" no-gutters>
      <display-entry-card
        v-for="selection in selectionIds"
        :key="selection[0]"
        :entry-id="selection[0]"
        class="mx-2"
      >
      </display-entry-card>
      <v-btn
        variant="outlined"
        color="success"
        class="mx-auto justify-end"
        height="50"
        :disabled="selectionIds.size !== 2"
      >
        Generate
        <v-icon size="35" color="success" class="hover-spin-continuous ml-3"
          >mdi-atom</v-icon
        >
      </v-btn>
      <v-btn
        variant="plain"
        icon="mdi-close"
        class="ml-auto mb-auto mt-n4 mr-n3"
        @click="showBottomSheet = false"
      >
      </v-btn>
    </v-row>
  </v-bottom-sheet>
</template>

<script setup>
import { ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useEntryFormStore } from '@/stores/entryFormStore'
import DisplayEntryCard from '@/components/DisplayEntryCard.vue'

const entryFormStore = useEntryFormStore()
const showBottomSheet = ref()
const { selectionIds } = storeToRefs(entryFormStore)

watch(selectionIds.value, (newValue) => {
  if (newValue.size > 1) {
    showBottomSheet.value = true
  }
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
