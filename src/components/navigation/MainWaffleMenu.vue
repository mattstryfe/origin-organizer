<template>
  <v-menu
    v-model="waffleMenu"
    location="bottom"
    width="400"
  >
    <template #activator="{ props }">
      <v-btn
        v-bind="props"
        class="cursor-pointer mr-1"
        color="green-darken-3"
        icon="mdi-dots-grid"
      />
    </template>

    <v-card>
      <v-container fluid>
        <v-row
          dense
          no-gutters
        >
          <v-col
            v-if="!userIsAuthenticated"
            cols="12"
          >
            <v-alert
              type="info"
              variant="outlined"
            >
              Must login to access cool shit...
            </v-alert>
          </v-col>

          <v-card
            v-for="r in routesToUse"
            :key="r.title"
            class="cursor-pointer text-center v-col-4 pa-1"
            :disabled="!userIsAuthenticated || r.disabled"
            variant="flat"
          >
            <v-hover>
              <template #default="{ isHovering, props }">
                <v-card
                  v-bind="props"
                  class="pa-2"
                  link
                  :variant="isHovering ? 'tonal' : 'flat'"
                  @click="router.push({ name: r.routeName })"
                >
                  <v-icon
                    :class="r.class"
                    :color="isHovering ? 'success' : r.color"
                    size="2em"
                  >
                    {{ r.icon }}
                  </v-icon>
                  <v-card-subtitle>{{ r.title }}</v-card-subtitle>
                </v-card>
              </template>
            </v-hover>
          </v-card>
        </v-row>
      </v-container>
    </v-card>
  </v-menu>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore'
import { storeToRefs } from 'pinia'
import { routes } from '@/schemas/routerLinksSchema'

const router = useRouter()
const userStore = useUserStore()
const { userIsAuthenticated } = storeToRefs(userStore)

const waffleMenu = ref()
const routesToUse = computed(() => routes.filter((r) => !r.hideInMainNav))
</script>

<style scoped>
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.hover-spin-continuous:hover {
  animation: spin 2s linear infinite;
}

.hover-gradient {
  transition:
    fill 0.5s ease,
    color 0.5s ease; /* Add transitions for smooth effect */
  color: #ff0000; /* Initial color */
}

.hover-gradient:hover {
  color: #00ff00; /* Color on hover */
}
</style>
