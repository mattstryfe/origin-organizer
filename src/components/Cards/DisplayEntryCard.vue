<template>
  <v-card
    class="border-sm ma-1 pa-1 d-flex flex-column"
    :class="{
      'opacity-80': showOverlay
    }"
    :height="cardHeight"
    :width="cardWidth"
  >
    <v-sheet v-if="showOverlay" class="cust-overlay">
      <v-icon
        class="ma-0 pa-0"
        color="blue-darken-2"
        :disabled="!allowCardDeselection"
        size="100"
        @click="deselectThisCard(entryId)"
      >
        mdi-trash-can
      </v-icon>
    </v-sheet>

    <!-- top bar -->
    <display-entry-card-top-bar
      :entry-id="entryId"
      :is-favorited="allEntryDetails.isFavorited"
      :is-foundation="allEntryDetails.isFoundation"
      :sex="allEntryDetails.sex"
    />

    <!-- background image -->
    <v-img
      class="text-black mb-1 border-sm"
      cover
      :height="cardWidth / 2"
      rounded
      :src="allEntryDetails.imageUrl"
    >
      <v-rating
        class="position-absolute bottom-0"
        color="amber"
        density="compact"
        :model-value="3"
        readonly
        size="small"
      ></v-rating>
    </v-img>

    <!-- Breed area -->
    <v-row class="my-1" dense no-gutters>
      <v-chip
        v-for="breed in allEntryDetails.breed"
        :key="breed"
        class="mx-1"
        density="compact"
        label
        size="small"
        variant="tonal"
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
          size="x-small"
          variant="outlined"
        >
          {{ c }}
        </v-chip>
      </v-col>
    </v-row>

    <!-- bottom Controls -->
    <v-row dense no-gutters>
      <v-col class="d-flex justify-end align-end">
        <v-btn
          color="blue-darken-2"
          density="compact"
          icon="mdi-delete-outline"
          size="medium"
          variant="text"
          @click="entryFormStore.removeThisEntry(entryId)"
        ></v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useEntryFormStore } from '@/stores/entryFormStore'
import DisplayEntryCardTopBar from '@/components/Cards/DisplayEntryCardTopBar.vue'
import { storeToRefs } from 'pinia'

// New way to do props. both work
const { entryId, allowCardDeselection } = defineProps({
  entryId: {
    type: String,
    default: 'xxx'
  },
  allowCardDeselection: {
    type: Boolean,
    default: false
  },
  cardWidth: {
    type: Number,
    default: 300
  },
  cardHeight: {
    type: Number,
    default: 400
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
.cust-overlay {
  z-index: 2400;
  position: absolute;
  left: 30%;
  top: 35%;
  margin: auto auto;
  background: transparent;
}
</style>
