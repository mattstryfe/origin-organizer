<template>
  <v-row>
    <v-col cols="12">
      <h1>Origin Organizer</h1>
      <span>track your flock with precision</span>
    </v-col>
  </v-row>

  <v-row>
    <v-col v-for="r in routesToUse" cols="6">
      <v-card class="border-yellow border-thin">
        <v-avatar>
          <v-icon>
            {{ r.icon }}
          </v-icon>
        </v-avatar>
        <v-card-title>
          {{ r.title }}
        </v-card-title>
        <v-card-subtitle>
          {{ r.description }}
        </v-card-subtitle>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup>
import { routes } from '@/schemas/routerLinksSchema'
import router from '@/plugins/router'
import { computed } from 'vue'
import { useLayoutStore } from '@/stores/layoutStore.js'

const routesToUse = computed(() => routes.filter((r) => !r.hideInMainNav))
</script>

<style scoped></style>
