<template>
  <v-bottom-navigation
    v-model="nav"
    :active="!smAndUp"
    class="border-t-sm"
    color="primary"
    grow
    horizontal
    mode="shift"
  >
    <!-- Bottom Navigation Pages.  Filtered by enabled for now-->
    <v-btn
      v-for="r in routesToUse"
      :key="r.title"
      :disabled="r.disabled"
      :name="r.title"
      @click="router.push({ name: r.name })"
    >
      <v-icon :color="r.color">
        {{ r.icon }}
      </v-icon>
      <span>{{ r.title }}</span>
    </v-btn>
  </v-bottom-navigation>
</template>

<script setup>
import { routes } from '@/schemas/routerLinksSchema'
import router from '@/plugins/router'
import { computed, inject, ref } from 'vue'

const smAndUp = inject('smAndUp')
const nav = ref()
const routesToUse = computed(() => routes.filter((r) => r.showInMobileNav))
</script>

<style scoped></style>
