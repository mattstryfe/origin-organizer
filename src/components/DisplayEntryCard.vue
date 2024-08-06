<template>
  <v-card>
    <v-card-title>
      ID - {{ entryId }}
    </v-card-title>
  </v-card>
</template>

<script setup>
defineProps({
  entryId: {
    type: String,
    default: 'xxx'
  }
})
</script>

<style scoped>

</style>