<template>
    <v-bottom-navigation
      v-model="nav"
      color="primary"
      horizontal
      :active="!smAndUp"
      class="border-t-sm"
      mode="shift"
      grow
    >
      <!-- Bottom Navigation Pages.  Filtered by enabled for now-->
      <v-btn
        v-for="w in enabledPages"
        :key="w.title"
        @click="router.push({ name: w.routeName })"
        :name="w.title"
        :disabled="!w.routeName"
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
