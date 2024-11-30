<template>
  <v-row no-gutters dense>
    <v-col>
      <v-col>
        <v-icon size="small" class="pb-2" :icon="sex === 'male' ? 'mdi-gender-male' : 'mdi-gender-female'"></v-icon>
      </v-col>
    </v-col>

    <!-- actions -->
    <v-col class="d-flex justify-end mb-1">
      <v-btn icon="mdi-heart-outline" size="medium" variant="text" color="red-darken-3" density="compact"></v-btn>
      <v-btn icon="mdi-share" size="medium" variant="text" density="compact"></v-btn>
      <v-btn icon="mdi-plus" size="medium" variant="text" color="green-darken-3" density="compact"></v-btn>
      <v-btn
@click="router.push({ name: 'EntryDetails', params: { id: entryId } })" icon="mdi-information-outline"
        size="medium" variant="text" color="blue-darken-3" density="compact"
>
      </v-btn>
    </v-col>
  </v-row>
</template>

<script setup>
import router from '@/plugins/router'
defineProps({
  entryId: {
    type: String,
    default: 'xxx'
  },
  sex: {
    type: String,
    default: 'xxx'
  }
})
</script>

<style scoped></style>
