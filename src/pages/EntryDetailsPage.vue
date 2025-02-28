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
        @click="handleSaveClick"
      >
        <v-icon>mdi-content-save</v-icon>
      </v-btn>
    </v-col>
  </v-row>

  <v-card v-if="birdDetails" class="h-100 w-100 border-sm pa-1 ma-1">
    <display-entry-card-top-bar
      :entry-id="entryId"
      :is-favorited="birdDetails.isFavorited"
      :is-foundation="birdDetails.isFoundation"
      :sex="birdDetails.sex"
    />

    <v-row class="flex-wrap">
      <v-col class="mb-1" cols="5">
        <v-img
          class="text-black mb-1 border-sm"
          cover
          rounded
          :src="birdDetails.imageUrl"
        >
          <v-rating
            class="position-absolute bottom-0"
            color="amber"
            density="compact"
            half-increments
            :model-value="birdDetails.rating"
            readonly
            size="small"
          ></v-rating>
        </v-img>
      </v-col>
      <v-col class="mb-1 flex-wrap" cols="7">
        <v-row class="flex-wrap">
          <v-col cols="4">
            <v-text-field
              density="compact"
              :disabled="!editModeToggle"
              label="Name"
              v-model="birdDetails.name"
              variant="outlined"
            ></v-text-field>
          </v-col>
          <v-col cols="3">
            <v-autocomplete
              density="compact"
              :disabled="!editModeToggle"
              item-title="label"
              item-value="sex"
              :items="schemaSexOptions"
              label="Sex"
              variant="outlined"
              v-model="birdDetails.sex"
            ></v-autocomplete>
          </v-col>
          <v-col cols="">
            <v-text-field
              density="compact"
              :disabled="!editModeToggle"
              label="Date of Birth (YYYY-MM-DD)"
              v-model="birdDetails.DoB"
              variant="outlined"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row class="flex-wrap">
          <v-col cols="5">
            <v-autocomplete
              chips
              density="compact"
              :disabled="!editModeToggle"
              :items="sortedBreeds"
              label="Breed"
              multiple
              variant="outlined"
              v-model="birdDetails.breed"
            ></v-autocomplete>
          </v-col>
          <v-col>
            <!-- Mother Autocomplete -->
            <v-autocomplete
              density="compact"
              :disabled="!editModeToggle"
              v-model="birdDetails.mother"
              item-title="name"
              item-value="name"
              :items="filteredEntriesForMotherDropdown"
              label="Mother"
              persistent-placeholder
              placeholder="Select Mother"
              variant="outlined"
            >
              <template #chip="{ props, item }">
                <v-chip
                  v-bind="props"
                  :prepend-avatar="item.raw.imageUrl"
                  :text="item.raw.name"
                ></v-chip>
              </template>

              <template #item="{ props, item }">
                <v-list-item
                  class="my-1 mr-2"
                  :class="determineBorderColor(item.raw)"
                  v-bind="props"
                  :prepend-avatar="item.raw.imageUrl"
                  :subtitle="breedDisplayText(item.raw.breed)"
                  :title="nameDisplayText(item.raw.name)"
                >
                  <template #append>
                    <span v-tooltip="'age in months...'">
                      {{ determineAgeOfEntry(item.raw) }}
                    </span>
                    <v-btn
                      v-if="item.raw.isFoundation"
                      v-tooltip="'Foundational'"
                      color="yellow"
                      icon="mdi-wall"
                      variant="text"
                    ></v-btn>
                    <v-btn
                      v-if="item.raw.isFavorited"
                      v-tooltip="'Favorited'"
                      color="red-darken-3"
                      icon="mdi-heart"
                      variant="text"
                    ></v-btn>
                  </template>
                </v-list-item>
              </template>
            </v-autocomplete>
          </v-col>
          <v-col cols="">
            <!-- Rating -->
            <!-- Father Autocomplete -->
            <v-autocomplete
              v-model="birdDetails.father"
              density="compact"
              :disabled="!editModeToggle"
              item-title="name"
              item-value="name"
              :items="filteredEntriesForFatherDropdown"
              label="Father"
              persistent-placeholder
              placeholder="Select Father"
              variant="outlined"
            >
              <template #chip="{ props, item }">
                <v-chip
                  v-bind="props"
                  :prepend-avatar="item.raw.imageUrl"
                  :text="item.raw.name"
                ></v-chip>
              </template>

              <template #item="{ props, item }">
                <v-list-item
                  class="my-1 mr-2"
                  :class="determineBorderColor(item.raw)"
                  v-bind="props"
                  :prepend-avatar="item.raw.imageUrl"
                  :subtitle="breedDisplayText(item.raw.breed)"
                  :title="nameDisplayText(item.raw.name)"
                >
                  <template #append>
                    <span v-tooltip="'age in months...'">
                      {{ determineAgeOfEntry(item.raw) }}
                    </span>
                    <v-btn
                      v-if="item.raw.isFoundation"
                      v-tooltip="'Foundational'"
                      color="yellow"
                      icon="mdi-wall"
                      variant="text"
                    ></v-btn>
                    <v-btn
                      v-if="item.raw.isFavorited"
                      v-tooltip="'Favorited'"
                      color="red-darken-3"
                      icon="mdi-heart"
                      variant="text"
                    ></v-btn>
                  </template>
                </v-list-item>
              </template>
            </v-autocomplete>
          </v-col>
        </v-row>
        <v-textarea
          density="compact"
          :disabled="!editModeToggle"
          label="Notes"
          v-model="birdDetails.notes"
          variant="outlined"
        ></v-textarea>
      </v-col>
    </v-row>
  </v-card>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import router from '@/plugins/router'
import duration from 'dayjs/plugin/duration'
import { useEntryFormStore } from '@/stores/entryFormStore'
import {
  schemaChickenBreedOptions,
  schemaSexOptions
} from '@/schemas/entryFormSchema'
import DisplayEntryCardTopBar from '@/components/Cards/DisplayEntryCardTopBar.vue'
import { storeToRefs } from 'pinia'
import dayjs from 'dayjs'

dayjs.extend(duration)

// Comes in from router props:true
const { entryId } = defineProps({
  entryId: {
    type: String,
    default: 'xxx'
  }
})
const sortedBreeds = computed(() => schemaChickenBreedOptions.sort())

const entryFormStore = useEntryFormStore()
const { formData } = storeToRefs(entryFormStore)

const {
  editModeToggle,
  hasEntryChanged,
  filteredEntriesForFatherDropdown,
  filteredEntriesForMotherDropdown
} = storeToRefs(entryFormStore)

const birdDetails = ref(entryFormStore.getEntryById(entryId))

const handleSaveClick = () => {
  const newObj = Object.fromEntries(
    Object.entries(birdDetails.value).filter(
      ([key]) => key !== 'imageUrlGetter'
    )
  )
  formData.value = newObj
  entryFormStore.updateEntryInDb(entryId)

}

const determineBorderColor = (entry) => {
  if (entry.isFoundation) return 'cust-border-yellow'
  if (entry.isFavorited) return 'cust-border-red '
}

const breedDisplayText = (breeds) => {
  if (!breeds) return 'n/a'
  return breeds.join(', ')
}

const determineAgeOfEntry = (entry) => {
  if (!entry.DoB) return ''
  const today = dayjs()
  const DoB = dayjs(entry.DoB)
  const durr = dayjs.duration(today.diff(DoB)).asMonths()
  return Math.floor(durr) + 'mo'
}

const nameDisplayText = (name) => {
  if (!name) return 'nameless'
  return name
}
watch(
  () => entryFormStore.getEntryById(entryId),
  (newVal) => {
    newVal.imageUrlGetter(newVal)
    birdDetails.value = newVal
  }
)

console.log('birdDetails', birdDetails.value)
</script>

<style scoped></style>
