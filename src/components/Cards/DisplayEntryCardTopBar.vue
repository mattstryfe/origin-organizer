<template>
  <v-row no-gutters dense>
    <v-col>
      <v-icon
        size="small"
        class="mb-1"
        :icon="sex === 'male' ? 'mdi-gender-male' : 'mdi-gender-female'"
      ></v-icon>
    </v-col>

    <!-- actions -->
    <v-col class="d-flex justify-end mb-1">
      <v-btn
        @click="entryFormStore.foundationThisEntry(entryId, isFoundation)"
        icon="mdi-wall"
        size="medium"
        variant="text"
        :color="isFoundation ? 'yellow' : 'white'"
        density="compact"
      ></v-btn>
      <v-btn
        @click="entryFormStore.favoriteThisEntry(entryId, isFavorited)"
        :icon="isFavorited ? 'mdi-heart' : 'mdi-heart-outline'"
        size="medium"
        variant="text"
        color="red-darken-3"
        density="compact"
      ></v-btn>
      <v-btn
        icon="mdi-share"
        size="medium"
        variant="text"
        density="compact"
        disabled
      ></v-btn>
      <v-btn
        icon="mdi-graph-outline"
        size="medium"
        variant="text"
        density="compact"
        color="orange-darken-3"
        disabled
      ></v-btn>
      <v-btn
        @click="router.push({ name: 'EntryDetails', params: { id: entryId } })"
        icon="mdi-information-outline"
        size="medium"
        variant="text"
        color="blue-darken-3"
        density="compact"
      ></v-btn>
    </v-col>
  </v-row>
</template>

<script setup>
import router from '@/plugins/router'
import { useEntryFormStore } from '@/stores/entryFormStore'
const entryFormStore = useEntryFormStore()

const { entryId, sex, isFavorited, isFoundation } = defineProps({
  entryId: {
    type: String,
    default: 'xxx'
  },
  sex: {
    type: String,
    default: 'xxx'
  },
  isFavorited: {
    type: Boolean,
    default: false
  },
  isFoundation: {
    type: Boolean,
    default: false
  }
})
</script>

<style scoped></style>
