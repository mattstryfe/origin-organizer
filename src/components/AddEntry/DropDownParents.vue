<template>
  show only foundation & favorites
  <v-switch
    v-model="filterByFavoriteAndFoundation"
    class="mt-0 ms-2"
    color="green-lighten-2"
    density="compact"
    label="Favorites & Foundation Only"
    hide-details
  ></v-switch>
  <v-autocomplete
    v-model="formData['parents']"
    :items="entries"
    item-title="name"
    item-value="name"
    label="Select"
    chips
    closable-chips
    multiple
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
          <v-btn
            v-if="item.raw.isFoundation"
            color="yellow"
            icon="mdi-wall"
            variant="text"
          ></v-btn>
          <v-btn
            v-if="item.raw.isFavorited"
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
import { computed, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useEntryFormStore } from '@/stores/entryFormStore'
const entryFormStore = useEntryFormStore()

const { formData, entries } = storeToRefs(entryFormStore)
const filterByFavoriteAndFoundation = ref(false)

const determineBorderColor = (entry) => {
  if (entry.isFoundation) return 'cust-border-yellow'
  if (entry.isFavorited) return 'cust-border-red '
}
const breedDisplayText = (breeds) => {
  if (!breeds) return 'n/a'
  return breeds.join(', ')
}

const nameDisplayText = (name) => {
  console.log('name', name)
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