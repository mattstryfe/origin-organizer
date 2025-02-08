<template>
  <v-row class="flex-wrap">
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
        @click="editModeToggle = !editModeToggle"
      >
        <v-icon>mdi-note-edit</v-icon>
      </v-btn>
      <v-btn
        class="ml-2"
        :color="hasEntryChanged ? 'primary' : 'grey'"
        density="compact"
        :variant="hasEntryChanged ? 'elevated' : 'outlined'"
        @click="entryFormStore.updateEntryInDb(entryId)"
      >
        <v-icon>mdi-content-save</v-icon>
      </v-btn>
    </v-col>
  </v-row>

  <v-row class="flex-wrap">
    <display-entry-card
      v-if="isDoneLoadingEntries"
      :card-height="smAndUp ? 800 : 600"
      :card-width="smAndUp ? 600 : 450"
      :entry-id="entryId"
    ></display-entry-card>
  </v-row>
</template>

<script setup>
import { inject } from 'vue'
import router from '@/plugins/router'
import { useEntryFormStore } from '@/stores/entryFormStore'
import DisplayEntryCard from '@/components/Cards/DisplayEntryCard.vue'
import { storeToRefs } from 'pinia'
const smAndUp = inject('smAndUp')

// Comes in from router props:true
const { entryId } = defineProps({
  entryId: {
    type: String,
    default: 'xxx',
  }
})
const entryFormStore = useEntryFormStore()
const { isDoneLoadingEntries, editModeToggle, hasEntryChanged } = storeToRefs(entryFormStore)
</script>

<style scoped></style>
