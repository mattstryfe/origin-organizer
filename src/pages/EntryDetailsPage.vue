<template>
  <v-row class="">
    <v-col class="mb-1" cols="12">
      <v-btn
        color="info"
        density="compact"
        variant="outlined"
        @click="router.push({ name: 'FlockManager' })"
      >
        <v-icon>mdi-arrow-left</v-icon>
        Flock Manager
      </v-btn>
      <v-btn
        class="ml-2"
        :color="editModeToggle ? 'primary' : 'grey'"
        density="compact"
        :variant="editModeToggle ? 'elevated' : 'outlined'"
        @click="handleEditModeToggle()"
      >
        <v-icon>mdi-note-edit</v-icon>
      </v-btn>
      <v-btn
        class="ml-2"
        :color="hasEntryChanged ? 'primary' : 'grey'"
        density="compact"
        :variant="hasEntryChanged ? 'elevated' : 'outlined'"
        @click="handleSaveClick"
      >
        <v-icon>mdi-content-save</v-icon>
      </v-btn>
    </v-col>
  </v-row>

  <v-row>
    <v-col>
      <template v-if="isDoneLoadingEntries">
        <display-entry-card
          :card-height="useLayoutStore().calculatedHeight"
          :card-width="useLayoutStore().calculatedWidth"
          :entry-id="entryId"
        />
      </template>
    </v-col>
  </v-row>
</template>

<script setup>
import { watch } from 'vue'
import router from '@/plugins/router'
import { useEntryFormStore } from '@/stores/entryFormStore'
import { storeToRefs } from 'pinia'
import DisplayEntryCard from '@/components/Cards/DisplayEntryCard.vue'
import { useLayoutStore } from '@/stores/layoutStore.js'

// Comes in from router props:true
const { entryId } = defineProps({
  entryId: {
    type: String,
    default: 'xxx'
  }
})

const entryFormStore = useEntryFormStore()

const { isDoneLoadingEntries, editModeToggle, hasEntryChanged } =
  storeToRefs(entryFormStore)

const handleSaveClick = () => {
  entryFormStore.updateEntryInDb(entryId)
}

const handleEditModeToggle = () => {
  editModeToggle.value = !editModeToggle.value
}

watch(
  () => entryFormStore.getEntryById(entryId),
  (newVal) => {
    newVal.imageUrlGetter(newVal)
  }
)
</script>

<style scoped></style>
