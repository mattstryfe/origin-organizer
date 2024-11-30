<template>
  <v-card
    :width="smAndDown ? 210 : 300"
    :height="smAndDown ? 300 : 400"
    class="border-sm ma-1 pa-1"
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
      :sex="sex"
    ></display-entry-card-top-bar>

    <!-- background image -->
    <v-img
      :height="smAndDown ? 100 : 150"
      src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
      cover
      class="text-black align-end mb-1"
    >
      <v-rating
        density="compact"
        size="small"
        readonly
        :model-value="3"
        color="amber"
      ></v-rating>
    </v-img>

    <v-divider class="my-2"></v-divider>

    <!-- Breed area -->
    <v-row v-if="allEntryDetails?.breed" no-gutters>
      <v-col cols="5" class="text-right pr-2">
        {{ allEntryDetails.breed[0] }}
      </v-col>
      <template v-if="allEntryDetails?.breed?.length > 1">
        <v-col>
          <v-icon size="xx-large">mdi-compare-horizontal</v-icon>
        </v-col>
        <v-col cols="5" class="text-left">
          {{ allEntryDetails.breed[1] }}
        </v-col>
      </template>
    </v-row>
    <v-card-subtitle>Name: {{ allEntryDetails.name }}</v-card-subtitle>
    <v-card-subtitle>Age: {{ allEntryDetails.DoB }}</v-card-subtitle>

    <v-divider class="my-1"></v-divider>
    <v-row no-gutters class="px-2 mt-2">
      <v-chip
        v-for="c in allEntryDetails.characteristics"
        :key="c"
        class="mr-1 text-grey lighten-2 mb-1"
        variant="outlined"
        size="x-small"
      >
        {{ c }}
      </v-chip>
    </v-row>
  </v-card>
</template>

<script setup>
import { computed, inject, onMounted, ref } from 'vue'
import { useEntryFormStore } from '@/stores/entryFormStore'
import DisplayEntryCardTopBar from '@/components/DisplayEntryCardTopBar.vue'
import { storeToRefs } from 'pinia'
const smAndDown = inject('smAndDown')

const { entryId, allowCardDeselection, sex } = defineProps({
  entryId: {
    type: String,
    default: 'xxx'
  },
  allowCardDeselection: {
    type: Boolean,
    default: false
  },
  sex: {
    type: String,
    default: 'xxx'
  }
})

const entryFormStore = useEntryFormStore()
const { getEntryById } = entryFormStore
const { selectionIds } = storeToRefs(entryFormStore)
const allEntryDetails = ref([])

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

// Once mounted, do query for card details...
onMounted(() => {
  // Use entryID prop to lookup entries in pinia store
  allEntryDetails.value = getEntryById(entryId)
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
  //background-color: white;
  //opacity: 0.32;
}
</style>
