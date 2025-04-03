<template>
  <div
    ref="scrollContainer"
    class="vuetify-pull-to-refresh"
    @touchend="onTouchEnd"
    @touchmove="onTouchMove"
    @touchstart="onTouchStart"
  >
    <v-progress-linear
      v-if="refreshing"
      absolute
      color="primary"
      height="4"
      indeterminate
      top
    />
    <v-row>
      <v-col>
        <h1>hello</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <h1>hello</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <h1>hello</h1>
      </v-col>
    </v-row>
    things
    <slot />
  </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue'

const emit = defineEmits(['refresh'])

const refreshing = ref(false)
const scrollContainer = ref(null)

let startY = 0
let isPulled = false

function onTouchStart(e) {
  if (scrollContainer.value?.scrollTop === 0) {
    startY = e.touches[0].clientY
    isPulled = true
  }
}

function onTouchMove(e) {
  if (!isPulled) return
  const diff = e.touches[0].clientY - startY
  if (diff > 80 && !refreshing.value) {
    triggerRefresh()
    isPulled = false
  }
}

function onTouchEnd() {
  isPulled = false
}

function triggerRefresh() {
  refreshing.value = true
  emit('refresh')
  // Auto-clear after 1.5s unless user handles manually
  setTimeout(() => {
    refreshing.value = false
  }, 1500)
}
</script>

<style scoped>
.vuetify-pull-to-refresh {
  height: 100vh;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  position: relative;
}
</style>
