<template>
  <v-card
    :width="smAndUp ? 300 : 210"
    :height="smAndUp ? 400 : 300"
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

    <!-- background image -->
    <v-img
      :height="smAndUp ? 150 : 100"
      :src="allEntryDetails.imageUrl"
      cover
      class="text-black mb-1 d-flex"
    >
      <!-- top bar -->
      <display-entry-card-top-bar
        class="mt-0 border-b-md border-surface"
        :entry-id="entryId"
        :sex="allEntryDetails.sex"
        :is-favorited="allEntryDetails.isFavorited"
        :is-foundation="allEntryDetails.isFoundation"
      ></display-entry-card-top-bar>
      <v-spacer
        :class="smAndUp ? 'cust-spacer-120' : 'cust-spacer-60'"
      ></v-spacer>

      <v-rating
        density="compact"
        size="small"
        readonly
        :model-value="3"
        color="amber"
        class="align-self-end justify-end"
      ></v-rating>
    </v-img>

    <!-- Breed area -->
    <v-row no-gutters dense class="my-1">
      <v-chip
        v-for="breed in allEntryDetails.breed"
        :key="breed"
        class="mx-1"
        variant="tonal"
        label
        size="small"
        density="compact"
      >
        <span class="text-caption text-grey">{{ breed }}</span>
      </v-chip>
    </v-row>

    <v-row dense no-gutters>
      <v-col class="pl-1">
        <p class="text-subtitle-2 text-blue-grey">
          Name:
          <span class="text-white">{{ allEntryDetails.name }}</span>
        </p>
        <p class="text-subtitle-2 text-blue-grey">
          Age:
          <span class="text-white">{{ allEntryDetails.DoB }}</span>
        </p>
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

    <!-- bottom Controls -->
    <v-row dense no-gutters>
      <v-col class="d-flex justify-end py-0">
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
import { computed, inject, onMounted } from 'vue'
import { useEntryFormStore } from '@/stores/entryFormStore'
import DisplayEntryCardTopBar from '@/components/Cards/DisplayEntryCardTopBar.vue'
import { storeToRefs } from 'pinia'
const smAndUp = inject('smAndUp')

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

onMounted(async () => {
  await allEntryDetails.value.imageUrlGetter(allEntryDetails.value)
})
</script>

<style scoped>
.cust-spacer-60 {
  height: 60px;
}
.cust-spacer-120 {
  height: 120px;
}
.cust-overlay {
  z-index: 2400;
  position: absolute;
  left: 30%;
  top: 35%;
  margin: auto auto;
  background: transparent;
}
</style>
