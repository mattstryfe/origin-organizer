<template>
  <v-row class="cust-height flex-0-0-0" no-gutters>
    <v-col class="d-flex py-0">
      <v-icon
        :icon="sex === 'male' ? 'mdi-gender-male' : 'mdi-gender-female'"
        size="small"
      ></v-icon>
    </v-col>

    <!-- actions -->
    <v-col class="d-flex py-0 justify-end">
      <v-btn
        :color="isFoundation ? 'yellow' : 'white'"
        density="compact"
        icon="mdi-wall"
        size="medium"
        variant="text"
        @click="entryFormStore.foundationThisEntry(entryId, isFoundation)"
      ></v-btn>
      <v-btn
        color="red-darken-3"
        density="compact"
        :icon="isFavorited ? 'mdi-heart' : 'mdi-heart-outline'"
        size="medium"
        variant="text"
        @click="entryFormStore.favoriteThisEntry(entryId, isFavorited)"
      ></v-btn>
      <v-btn
        density="compact"
        disabled
        icon="mdi-share"
        size="medium"
        variant="text"
      ></v-btn>
      <v-btn
        color="orange-darken-3"
        density="compact"
        disabled
        icon="mdi-graph-outline"
        size="medium"
        variant="text"
      ></v-btn>
      <v-btn
        color="blue-darken-3"
        density="compact"
        icon="mdi-information-outline"
        size="medium"
        variant="text"
        @click="router.push({ name: 'EntryDetails', params: { id: entryId } })"
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

<style scoped>
</style>
