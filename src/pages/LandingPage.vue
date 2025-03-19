<template>
  <v-row>
    <v-col class="text-center mt-5" cols="12">
      <h1>Origin Organizer</h1>
      <span class="text-grey text-caption">
        Track your flock with precision.
      </span>
    </v-col>
  </v-row>

  <v-row>
    <v-divider class="my-3 mx-4"></v-divider>

    <v-col v-for="r in routesToUse" cols="6">
      <v-badge
        v-if="r.showBadgeOnLandingPage"
        class="badge-top-right text-left"
        content="+5"
      ></v-badge>

      <v-card
        class="border-yellow border-thin"
        :disabled="r.disabled"
        height="150"
        @click="router.push({ name: r.name })"
      >
        <v-list-item lines="three">
          <v-list-item-title class="d-flex">
            <v-icon class="mr-2" :color="r.color" size="60">
              {{ r.icon }}
            </v-icon>
            <v-sheet class="text-h6 text-wrap text-justify my-auto">
              <h4>{{ r.title }}</h4>
            </v-sheet>
          </v-list-item-title>
          <v-list-item-subtitle class="text-caption">
            {{ r.description }}
          </v-list-item-subtitle>
        </v-list-item>
      </v-card>
    </v-col>
  </v-row>

  <v-row>
    <v-col class="pb-1" cols="12">Recently Viewed/Added</v-col>

    <v-infinite-scroll class="ml-3" direction="horizontal">
      <template v-if="isDoneLoadingEntries">
        <v-col
          v-for="entry in getMostRecentEntries"
          :key="entry.entryId"
          cols="7"
        >
          <at-a-glance-card :entry-id="entry.entryId" />
        </v-col>
      </template>
    </v-infinite-scroll>
  </v-row>
  <!--  <v-row class="">
    <template v-if="isDoneLoadingEntries">
      <v-col
        v-for="entry in getMostRecentEntries"
        :key="entry.entryId"
        cols="7"
      >
        <at-a-glance-card :entry-id="entry.entryId" />
      </v-col>
    </template>
  </v-row>-->
</template>

<script setup>
import { routes } from '@/schemas/routerLinksSchema'
import router from '@/plugins/router'
import { computed } from 'vue'
import AtAGlanceCard from '@/components/Cards/AtAGlanceCard.vue'
import { storeToRefs } from 'pinia'
import { useEntryFormStore } from '@/stores/entryFormStore.js'

const routesToUse = computed(() => routes.filter((r) => !r.hideInMainNav))
const { getMostRecentEntries, isDoneLoadingEntries } =
  storeToRefs(useEntryFormStore())
console.log('getMostRecentEntries', getMostRecentEntries.value)
</script>

<style scoped>
:deep(.v-badge__badge) {
  background: rgb(var(--v-theme-surface)) !important;
  color: forestgreen;
  border: forestgreen solid 2px !important;
}
.badge-top-right {
  position: relative !important;
  float: left;
  z-index: 20 !important;
}
</style>
