<template>
  <v-card width="250" height="400" class="border-sm ma-1 pa-1">
    <!-- top bar -->
    <v-row no-gutters dense>
      <v-col>
        <v-icon size="small">mdi-gender-male</v-icon>
      </v-col>

      <!-- actions -->
      <v-col class="d-flex justify-end">
        <v-btn icon="mdi-heart-outline" size="x-small" variant="flat"></v-btn>
        <v-btn icon="mdi-share" size="x-small" variant="flat"></v-btn>
        <v-btn icon="mdi-plus" size="x-small" variant="flat"></v-btn>
      </v-col>
    </v-row>

    <!-- background image -->
    <v-img
      height="150"
      src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
      cover
      class="text-black align-end mb-1"
    >

      <v-rating density="compact" size="small" readonly :model-value="3" color="amber">

      </v-rating>
    </v-img>


    <v-divider class="my-2"></v-divider>
    <!-- Breed area -->
    <v-row v-if="allEntryDetails?.breed?.length > 1" no-gutters>
      <v-col cols="5" class="text-right pr-2">
        {{ allEntryDetails.breed[0] }}
      </v-col>
      <v-col>
        <v-icon size="xx-large">
          mdi-compare-horizontal
        </v-icon>
      </v-col>
      <v-col cols="5" class="text-left">
        {{ allEntryDetails.breed[1] }}
      </v-col>
    </v-row>
    <v-card-subtitle>
      Name: {{ allEntryDetails.name }}
    </v-card-subtitle>
    <v-card-subtitle>
      Age: {{ allEntryDetails.DoB }}
    </v-card-subtitle>

    <v-row no-gutters class="px-2 mt-2">
      <v-chip
        v-for="c in allEntryDetails.characteristics"
        :key="c"
        class="my-1 text-grey lighten-2"
        variant="outlined"
        density="compact"
      >
        {{ c }}
      </v-chip>
    </v-row>


  </v-card>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useEntryFormStore } from '@/stores/entryFormStore'

const props = defineProps({
  entryId: {
    type: String,
    default: 'xxx'
  }
})

const entryFormStore = useEntryFormStore()
const { getEntryById } = entryFormStore
const allEntryDetails = ref([])

// Once mounted, do query for card details...
onMounted(() => {
  // Use entryID prop to lookup entries in pinia store
  allEntryDetails.value = getEntryById(props.entryId)
  console.log('allEntryDetails', allEntryDetails)
})
</script>

<style scoped></style>
