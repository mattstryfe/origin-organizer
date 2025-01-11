<template>
  <v-bottom-navigation
    v-model="nav"
    color="primary"
    horizontal
    :active="!smAndUp"
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
      {{ w.title }}
    </v-btn>

    <!-- force (for now) the user menu to always be hard-right -->
    <v-spacer></v-spacer>
    <v-btn>
      <user-account-menu></user-account-menu>
    </v-btn>
  </v-bottom-navigation>
</template>

<script setup>
import routerLinksSchema from '@/schemas/routerLinksSchema'
import router from '@/plugins/router'
import { computed, inject, ref } from 'vue'
import UserAccountMenu from '@/components/navigation/MainUserAccountMenu.vue'

const smAndUp = inject('smAndUp')
const nav = ref()
const enabledPages = computed(() =>
  routerLinksSchema.filter((w) => w.routeName)
)
</script>

<style scoped></style>
