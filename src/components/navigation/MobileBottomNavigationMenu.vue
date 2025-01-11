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
        v-for="w in enabledPages"
        :key="w.title"
        :disabled="!w.routeName"
        :name="w.title"
        @click="router.push({ name: w.routeName })"
      >
        <v-icon :color="w.color">
          {{ w.icon }}
        </v-icon>
        <span>{{ w.title }}</span>
      </v-btn>
    </v-bottom-navigation>
</template>

<script setup>
import routerLinksSchema from '@/schemas/routerLinksSchema'
import router from '@/plugins/router'
import { computed, inject, ref } from 'vue'

const smAndUp = inject('smAndUp')
const nav = ref()
const enabledPages = computed(() =>
  routerLinksSchema.filter((w) => w.routeName)
)
</script>

<style scoped>

</style>
