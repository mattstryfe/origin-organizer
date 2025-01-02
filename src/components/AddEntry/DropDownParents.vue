<template>
  <v-switch
    v-model="filterByFavoriteAndFoundation"
    class="mt-0 ms-2"
    color="green-lighten-2"
    density="compact"
    hide-details
  ></v-switch>
  <v-autocomplete
    v-model="formData['parents']"
    :items="filteredEntriesForParentDropdown"
    item-title="name"
    item-value="name"
    label="Parents"
    chips
    closable-chips
    multiple
    density="compact"
    variant="outlined"
    persistent-placeholder
    placeholder="Select Parent(s)"
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
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useEntryFormStore } from '@/stores/entryFormStore'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
dayjs.extend(duration)

const entryFormStore = useEntryFormStore()
const { formData, entries, filterByFavoriteAndFoundation, filteredEntriesForParentDropdown } = storeToRefs(entryFormStore)

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
