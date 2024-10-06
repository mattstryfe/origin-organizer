<template>
  <v-autocomplete
    v-model="formData['parents']"
    :items="entries"
    item-title="name"
    item-value="id"
    label="Parents"
    chips
    closable-chips
    multiple
  >
    <template #chip="{ props, item }">
      <v-chip
        v-bind="props"
        :prepend-avatar="item.raw.avatar"
        :text="item.raw.name"
      ></v-chip>
    </template>

    <template #item="{ props, item }">
      <v-list-item
        v-bind="props"
        :prepend-avatar="item.raw.avatar"
        :subtitle="item.raw.group"
        :title="item.raw.name"
      ></v-list-item>
    </template>
  </v-autocomplete>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useEntryFormStore } from '@/stores/entryFormStore'

const entryFormStore = useEntryFormStore()
const { entries, formData } = storeToRefs(entryFormStore)
console.log('entries', entries)
</script>

<style scoped>

</style>