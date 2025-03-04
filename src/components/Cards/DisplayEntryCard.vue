<template>
  <v-card
    class="border-sm ma-1 pa-1 d-flex flex-column"
    :class="{
      'opacity-80': showOverlay
    }"
    height="600"
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
      :entry-id="allEntryDetails.entryId"
      :is-favorited="allEntryDetails.isFavorited"
      :is-foundation="allEntryDetails.isFoundation"
      :sex="allEntryDetails.sex"
    />

    <!-- background image -->
    <v-img
      class="text-black mb-1 border-sm"
      cover
      :height="editModeToggle ? 25 : 150"
      rounded
      :src="allEntryDetails.imageUrl"
    >
      <v-rating
        class="position-absolute bottom-0"
        color="amber"
        density="compact"
        :disabled="!editModeToggle"
        half-increments
        :model-value="allEntryDetails.rating"
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

    <v-row class="overflow-scroll align-center justify-center" dense>
      <v-col cols="7">
        <v-text-field
          density="compact"
          :disabled="!editModeToggle"
          hide-details
          label="Name"
          v-model="allEntryDetails.name"
          variant="outlined"
        ></v-text-field>
      </v-col>
      <v-col cols="5">
        <v-text-field
          density="compact"
          :disabled="!editModeToggle"
          hide-details
          label="DoB"
          variant="outlined"
          v-model="allEntryDetails.DoB"
        ></v-text-field>
      </v-col>
      <v-col cols="6">
        <drop-down-parents
          :disabled="!editModeToggle"
          target="mother"
          v-model:parent="allEntryDetails['mother']"
        />
      </v-col>
      <v-col cols="6">
        <drop-down-parents
          :disabled="!editModeToggle"
          target="father"
          v-model:parent="allEntryDetails['father']"
        />
      </v-col>
      <v-col cols="7">
        <picker-phase v-model:phase="allEntryDetails['phase']" />
      </v-col>
      <v-col cols="7">
        <picker-sex v-model:sex="allEntryDetails['sex']" />
      </v-col>
    </v-row>

    <v-divider class=""></v-divider>

    <!-- Characteristics Area -->
    <v-row class="mx-1 overflow-scroll" dense no-gutters>
      <picker-characteristics
        v-model:characteristics="allEntryDetails.characteristics"
      />
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
          @click="entryFormStore.removeThisEntry(allEntryDetails.entryId)"
        ></v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useEntryFormStore } from '@/stores/entryFormStore'
import DisplayEntryCardTopBar from '@/components/Cards/DisplayEntryCardTopBar.vue'
import { storeToRefs } from 'pinia'
import PickerCharacteristics from '@/components/AddEntry/PickerCharacteristics.vue'
import DropDownParents from '@/components/AddEntry/DropDownParents.vue'
import PickerSex from '@/components/AddEntry/PickerSex.vue'
import PickerPhase from '@/components/AddEntry/PickerPhase.vue'

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
const { selectionIds, editModeToggle } = storeToRefs(entryFormStore)

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

const allEntryDetails = ref(entryFormStore.getEntryById(entryId))

onMounted(() => {
  allEntryDetails.value.imageUrlGetter(allEntryDetails.value)
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
