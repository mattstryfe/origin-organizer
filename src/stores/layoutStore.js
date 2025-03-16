import { defineStore } from 'pinia'
import { useDisplay } from 'vuetify'
import { computed, reactive } from 'vue'
import { useRouter } from 'vue-router'

export const useLayoutStore = defineStore('layoutStore', () => {
  const display = useDisplay() // Vuetify's responsive composable
  const router = useRouter()

  // Reactive state
  const state = reactive({
    defaults: {
      cardHeight: 800,
      cardWidth: 800
    },
    FMLayoutMode: 'full'
  })
  // Prevents very long display cards on FM page (mobile)
  const hideNotesOnFMPage = computed(
    () => router.currentRoute.value.name !== 'FlockManager'
  )

  // Computed getters
  const smAndUp = computed(() => display.smAndUp.value)
  const mdAndUp = computed(() => display.mdAndUp.value)
  const calculatedHeight = computed(() =>
    smAndUp.value ? state.defaults.cardHeight : 'auto'
  )
  const calculatedWidth = computed(() =>
    smAndUp.value ? state.defaults.cardWidth : 'auto'
  )

  return {
    ...state, // Spread the reactive state
    smAndUp,
    mdAndUp,
    calculatedHeight,
    calculatedWidth,
    hideNotesOnFMPage
  }
})
