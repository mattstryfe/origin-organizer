<template>
  <v-row class="flex-wrap">
    <!-- filters -->
    <v-col cols="12">
      <v-chip-group
        v-model="filter"
        column
        multiple
        selected-class="text-green-darken-3"
      >
        <v-icon class="pt-1 mr-3">mdi-filter-variant-plus</v-icon>

        <v-chip
          v-for="n in 5"
          :key="n"
          class="mr-1"
          density="compact"
          variant="outlined"
          filter
        >
          Criteria
        </v-chip>
      </v-chip-group>
      <span class="text-caption mr-2">Filter choices: {{ filter }}</span>

      <!-- Add filtering components here populated by info from queries -->
    </v-col>
    <display-entry-card
      v-for="(entry, index) in entries"
      :key="entry.id"
      :entry-id="entry.id"
      ref="entryRefs"
    ></display-entry-card>
  </v-row>
</template>

<script setup>
import DisplayEntryCard from '@/components/DisplayEntryCard.vue'
import { storeToRefs } from 'pinia'
import { useEntryFormStore } from '@/stores/entryFormStore'
import { onMounted, ref } from 'vue'
import { onLongPress } from '@vueuse/core'

const entryFormStore = useEntryFormStore()
const { entries } = storeToRefs(entryFormStore)
const filter = ref([])

// Long press logic
// const htmlRefHook = ref(null)
// const longPressedHook = ref(false)
const entryRefs = ref([])
const handleLongPress = (entry) => {
  console.log('Long press on entry:', entry);
  // Your long press logic here
};

onMounted(() => {
  entryRefs.value.forEach((entryRef, index) => {
    if (entryRef) {
      onLongPress(entryRef, () => handleLongPress(entries[index]), {
        delay: 600, // long press duration in ms
      });
    }
  });
});
</script>

<style scoped></style>
