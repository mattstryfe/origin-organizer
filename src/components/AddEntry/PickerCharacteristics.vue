<template>
  <v-fab
    v-if="editModeToggle"
    :active="true"
    class="pl-4"
    color="green-darken-3"
    icon="mdi-plus"
    location="bottom start"
    size="xx-small"
    variant="outlined"
  ></v-fab>

  <v-chip-group
    v-model="formData['characteristics']"
    class="pl-4 d-block"
    column
    :disabled="!editModeToggle"
    multiple
  >
    <!-- TODO: this v-for target is trash. need to make better -->
    <v-chip
      v-for="(field, index) in characteristicsToUse"
      :key="index"
      class="mb-1"
      color="green-darken-3"
      size="small"
      :value="field"
      variant="outlined"
    >
      <span class="grey">{{ field }}</span>
    </v-chip>
  </v-chip-group>

  <!--  <template v-else>
    <v-col class="overflow-y-auto" style="max-height: 60px">
      <v-chip
        v-for="(field, index) in characteristics"
        :key="index"
        class="mr-1 text-grey lighten-2 mb-1"
        size="x-small"
        variant="outlined"
      >
        {{ field }}
      </v-chip>
    </v-col>
  </template>-->
</template>

<script setup>
import { schemaCharacteristicOptions } from '@/schemas/entryFormSchema'
import { storeToRefs } from 'pinia'
import { useEntryFormStore } from '@/stores/entryFormStore'
import { computed, ref, watch } from 'vue'
const entryFormStore = useEntryFormStore()
const { formData, editModeToggle } = storeToRefs(entryFormStore)

const { characteristics } = defineProps({
  characteristics: {
    type: Array,
    default: () => []
  }
})

const characteristicsToUse = ref([])
watch(
  () => editModeToggle.value,
  (newValue, oldValue) => {

    characteristicsToUse.value = newValue
      ? schemaCharacteristicOptions
      : characteristics
  }, {eager: true, immediate: true}
)
</script>

<style scoped></style>
