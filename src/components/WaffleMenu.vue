<template>
  <v-menu
    v-model="waffleMenu"
    :close-on-content-click="false"
    location="bottom"
    width="400"
  >
    <template #activator="{ props }">
      <v-btn icon="mdi-dots-grid" v-bind="props" class="cursor-pointer mr-1" color="green-darken-3">
      </v-btn>
    </template>

    <v-card>
      <v-container fluid>
        <v-row dense no-gutters>
          <!-- Wrap main card with another card to keep consistency with v-col-4
              otherwise, an offset or indent needs to be used and it's annoying -->
          <v-card
            v-for="w in waffles"
            :key="w.title"
            class="cursor-pointer text-center v-col-4 pa-1"
            variant="flat"
          >
            <v-hover>
              <template #default="{ isHovering, props }">
                <v-card :variant="isHovering ? 'tonal': 'flat'" v-bind="props" class="pa-2" link @click="router.push({ name: w.routeName})">
                  <v-icon size="2em" :color="isHovering ? 'success' : w.color" :class="w.class">
                    {{ w.icon }}
                  </v-icon>
                  <v-card-subtitle>{{ w.title }}</v-card-subtitle>
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
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const waffleMenu = ref()
const waffles = ref([
  { title: 'Add Entry', icon: 'mdi-plus', color: 'info', routeName:'addEntry', class: 'hover-gradient' },
  { title: 'Planner', icon: 'mdi-calendar-arrow-right', color: 'orange-darken-3', class: 'hover-gradient' },
  { title: 'Flock Manager', icon: 'mdi-bird', color: 'yellow-lighten-2', class: 'hover-gradient' },
  { title: 'Calendar', icon: 'mdi-calendar', color: 'indigo-darken-1', class: 'hover-gradient' },
  { title: 'Reports', icon: 'mdi-chart-bar', color: 'red-darken-2', class: 'hover-gradient' },
  { title: 'Gene Tools', icon: 'mdi-atom', color: 'yellow-darken-2', class: 'hover-spin-continuous' },
])
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
  transition: fill 0.5s ease, color 0.5s ease; /* Add transitions for smooth effect */
  color: #ff0000; /* Initial color */
}

.hover-gradient:hover {
  color: #00ff00; /* Color on hover */
}
</style>
