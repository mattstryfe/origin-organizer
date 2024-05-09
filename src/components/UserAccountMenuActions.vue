<template>
  <v-list>
    <v-list-subheader color="secondary">User Controls</v-list-subheader>

    <v-list-item>
      <v-switch
        v-model="enableDarkMode"
        color="primary"
        label="Dark Mode"
        hide-details
      ></v-switch>
    </v-list-item>

    <v-list-item>
      <v-switch
        v-model="enableAutoSave"
        color="primary"
        label="Auto save"
        hide-details
      ></v-switch>
    </v-list-item>

    <v-divider></v-divider>

    <v-list-subheader color="warning">Danger Zone</v-list-subheader>

    <v-list-item>
      <v-btn variant="outlined" color="primary" prepend-icon="mdi-nuke">
        Nuke Profile
      </v-btn>
    </v-list-item>
  </v-list>
</template>

<script setup>
import { ref } from 'vue'

const enableDarkMode = ref(false)
const enableAutoSave = ref(true)
</script>

<style scoped></style>
