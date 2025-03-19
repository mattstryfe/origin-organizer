<template>
  <v-card class="border-sm px-2 d-flex flex-column" height="auto" width="auto">
    <!-- top bar -->
    <display-entry-card-top-bar
      :entry-id="allEntryDetails.entryId"
      :is-favorited="allEntryDetails.isFavorited"
      :is-foundation="allEntryDetails.isFoundation"
      :sex="allEntryDetails.sex"
    />
    <!-- background image -->
    <v-img
      class="text-black border-sm transition-height"
      cover
      height="75"
      rounded
      :src="allEntryDetails.imageUrl"
    >
      <v-rating
        class="position-absolute bottom-0"
        color="amber"
        density="compact"
        disabled
        half-increments
        :model-value="allEntryDetails.rating"
        size="small"
      />
    </v-img>

    <v-row>
      <v-col cols="12">
        <v-chip
          v-for="breed in allEntryDetails.breed"
          :key="breed"
          density="compact"
          size="small"
          variant="outlined"
        >
          {{ breed }}
        </v-chip>
      </v-col>
    </v-row>
  </v-card>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useEntryFormStore } from '@/stores/entryFormStore'
import DisplayEntryCardTopBar from '@/components/Cards/DisplayEntryCardTopBar.vue'

const { entryId } = defineProps({
  entryId: {
    type: String,
    default: 'xxx'
  }
})

const entryFormStore = useEntryFormStore()
const allEntryDetails = ref(entryFormStore.getEntryById(entryId))

onMounted(() => {
  allEntryDetails.value.imageUrlGetter(allEntryDetails.value)
})
</script>

<style scoped></style>
