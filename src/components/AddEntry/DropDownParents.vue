<template>
  <v-autocomplete
    v-model="parent"
    density="compact"
    item-title="name"
    item-value="name"
    :items="filteredEntriesToDisplay"
    :label="target"
    persistent-placeholder
    :placeholder="`Select ${target}`"
    variant="outlined"
  >
    <template #chip="{ props, item }">
      <v-chip
        v-bind="props"
        :prepend-avatar="item.raw.imageUrl"
        :text="item.raw.name"
      ></v-chip>
    </template>

    <template #item="{ props, item }">
      <v-list-item
        class="my-1 mr-2"
        :class="determineBorderColor(item.raw)"
        v-bind="props"
        :prepend-avatar="item.raw.imageUrl"
        :subtitle="breedDisplayText(item.raw.breed)"
        :title="nameDisplayText(item.raw.name)"
      >
        <template #append>
          <span v-tooltip="'age in months...'">
            {{ determineAgeOfEntry(item.raw) }}
          </span>
          <v-btn
            v-if="item.raw.isFoundation"
            v-tooltip="'Foundational'"
            color="yellow"
            icon="mdi-wall"
            variant="text"
          ></v-btn>
          <v-btn
            v-if="item.raw.isFavorited"
            v-tooltip="'Favorited'"
            color="red-darken-3"
            icon="mdi-heart"
            variant="text"
          ></v-btn>
        </template>
      </v-list-item>
    </template>
  </v-autocomplete>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useEntryFormStore } from '@/stores/entryFormStore'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import { computed } from 'vue'
dayjs.extend(duration)

// target === prop passed from parent
const { target } = defineProps({
  target: {
    type: String,
    default: 'xxx'
  }
})

const parent = defineModel('parent', {})

// Adjust what displays in the dropdowns as items based on which one we're in
const filteredEntriesToDisplay = computed(() =>
  target === 'father'
    ? filteredEntriesForFatherDropdown.value
    : filteredEntriesForMotherDropdown.value
)

const entryFormStore = useEntryFormStore()
const { filteredEntriesForFatherDropdown, filteredEntriesForMotherDropdown } =
  storeToRefs(entryFormStore)

const determineBorderColor = (entry) => {
  if (entry.isFoundation) return 'cust-border-yellow'
  if (entry.isFavorited) return 'cust-border-red '
}

const breedDisplayText = (breeds) => {
  if (!breeds) return 'n/a'
  return breeds.join(', ')
}

const determineAgeOfEntry = (entry) => {
  if (!entry.DoB) return ''
  const today = dayjs()
  const DoB = dayjs(entry.DoB)
  const durr = dayjs.duration(today.diff(DoB)).asMonths()
  return Math.floor(durr) + 'mo'
}

const nameDisplayText = (name) => {
  if (!name) return 'nameless'
  return name
}
</script>

<style scoped>
.cust-border-red {
  border: 2px solid rgba(212, 62, 62, 0.41);
}

.cust-border-yellow {
  border: 2px solid rgba(255, 204, 62, 0.41);
}
</style>
