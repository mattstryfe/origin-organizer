<template>
  <v-bottom-navigation
    v-if="!useLayoutStore().smAndUp"
    app
    v-model="nav"
    class="border-t-sm"
    color="primary"
    grow
    height="48"
    horizontal
    v-scroll="onScroll"
    :style="{ transform: isHidden ? 'translateY(100%)' : 'translateY(0)' }"
  >
    <!-- Bottom Navigation Pages.  Filtered by enabled for now-->
    <v-btn
      v-for="r in routesToUse"
      :key="r.name"
      :disabled="r.disabled"
      :value="r.name"
      @click="router.push({ name: r.name })"
    >
      <v-icon :color="r.color">
        {{ r.icon }}
      </v-icon>
      <span class="text-caption">{{ r.title }}</span>
    </v-btn>
  </v-bottom-navigation>
</template>

<script setup>
import { routes } from '@/schemas/routerLinksSchema'
import router from '@/plugins/router'
import { computed, ref, watch } from 'vue'
import { useLayoutStore } from '@/stores/layoutStore.js'
import { useRoute } from 'vue-router'
const route = useRoute()

const nav = ref({})
watch(
  () => route.name,
  (newRoute) => {
    nav.value = newRoute
  }
)
const routesToUse = computed(() => routes.filter((r) => r.showInMobileNav))

const isHidden = ref(false) // Controls hiding behavior
const lastScrollY = ref(0) // Tracks last scroll position

// Mimic `v-app-bar` scroll behavior
const onScroll = () => {
  const currentScrollY = window.scrollY
  isHidden.value = currentScrollY > lastScrollY.value && currentScrollY > 50
  lastScrollY.value = currentScrollY
}
</script>

<style scoped>
/* Smooth transition */
.v-bottom-navigation {
  transition: transform 0.3s ease-in-out;
}
</style>
