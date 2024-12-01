<template>
  <v-card
    :width="smAndDown ? 210 : 300"
    :height="smAndDown ? 300 : 400"
    class="border-sm ma-1 pa-1 d-flex flex-column"
    :class="{
      'opacity-80': showOverlay
    }"
  >
    <v-sheet v-if="showOverlay" height="100" width="100" class="cust-overlay">
      <v-icon
        @click="deselectThisCard(entryId)"
        size="100"
        color="blue-darken-2"
        class="ma-0 pa-0"
        :disabled="!allowCardDeselection"
      >
        mdi-trash-can
      </v-icon>
    </v-sheet>

    <!-- top bar -->
    <display-entry-card-top-bar
      :entry-id="entryId"
      :sex="allEntryDetails.sex"
      :is-favorited="allEntryDetails.isFavorited"
      :is-foundation="allEntryDetails.isFoundation"
    ></display-entry-card-top-bar>

    <!-- background image -->
    <v-img
      :height="smAndDown ? 100 : 150"
      src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
      cover
      class="text-black align-end"
    >
      <v-rating
        density="compact"
        size="small"
        readonly
        :model-value="3"
        color="amber"
      ></v-rating>
    </v-img>

    <!-- Breed area -->
    <v-row v-if="allEntryDetails?.breed" no-gutters dense>
      <v-col cols="5" class="text-right pr-2">
        {{ allEntryDetails.breed[0] }}
      </v-col>
      <template v-if="allEntryDetails?.breed?.length > 1">
        <v-col>
          <v-icon size="large">mdi-compare-horizontal</v-icon>
        </v-col>
        <v-col cols="5" class="text-left">
          {{ allEntryDetails.breed[1] }}
        </v-col>
      </template>
    </v-row>

    <v-row dense no-gutters>
      <v-col>
        <v-card-subtitle>Name: {{ allEntryDetails.name }}</v-card-subtitle>
        <v-card-subtitle>Age: {{ allEntryDetails.DoB }}</v-card-subtitle>
      </v-col>
    </v-row>

    <v-divider class="my-1"></v-divider>

    <v-row dense no-gutters>
      <v-col class="overflow-y-auto" style="max-height: 60px">
        <v-chip
          v-for="c in allEntryDetails.characteristics"
          :key="c"
          class="mr-1 text-grey lighten-2 mb-1"
          variant="outlined"
          size="x-small"
        >
          {{ c }}
        </v-chip>
      </v-col>
    </v-row>

    <v-spacer class=""></v-spacer>

    <!-- bottom Controls -->
    <v-row dense no-gutters class=" ">
      <v-col class="d-flex justify-end">
        <v-btn
          @click="entryFormStore.removeThisEntry(entryId)"
          icon="mdi-delete-outline"
          size="medium"
          variant="text"
          density="compact"
          color="blue-darken-2"
        ></v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>

<script setup>
import { computed, inject } from 'vue'
import { useEntryFormStore } from '@/stores/entryFormStore'
import DisplayEntryCardTopBar from '@/components/Cards/DisplayEntryCardTopBar.vue'
import { storeToRefs } from 'pinia'
const smAndDown = inject('smAndDown')

// New way to do props. both work
const { entryId, allowCardDeselection } = defineProps({
  entryId: {
    type: String,
    default: 'xxx'
  },
  allowCardDeselection: {
    type: Boolean,
    default: false
  }
})

const entryFormStore = useEntryFormStore()
const { selectionIds } = storeToRefs(entryFormStore)

const showOverlay = computed(() => {
  if (selectionIds.value.length === 0) return false
  return selectionIds.value.has(entryId)
})

// short press, ONLY for deselection
const deselectThisCard = (id) => {
  if (selectionIds.value.has(id)) {
    selectionIds.value.delete(id)
  }
}

const allEntryDetails = computed(() => entryFormStore.getEntryById(entryId))
</script>

<style scoped>
.cust-overlay {
  z-index: 2400;
  position: absolute;
  left: 30%;
  top: 35%;
  margin: auto auto;
  background: transparent;
}
</style>
