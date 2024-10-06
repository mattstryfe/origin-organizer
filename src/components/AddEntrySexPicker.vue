<template>
  <v-btn-toggle
    v-model="formData['sex']"
    color="green-darken-3"
    class="fill-height flex-column"
  >
    <v-btn
      v-for="(opt, index) in schemaSexOptions"
      :key="index"
      class="border mr-2 mb-2"
      :value="opt.sex"
    >
      <v-icon :size="opt.iconSize" >
        {{ opt.icon }}
      </v-icon>
    </v-btn>
  </v-btn-toggle>
</template>

<script setup>
import { schemaSexOptions } from '@/schemas/entryFormSchema'
import { useEntryFormStore } from '@/stores/entryFormStore'
import { storeToRefs } from 'pinia'
const entryFormStore = useEntryFormStore()
const { formData } = storeToRefs(entryFormStore)
</script>

<style scoped>

</style>