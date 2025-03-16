import { defineStore } from 'pinia'
import { useDisplay } from 'vuetify'
import { computed, reactive } from 'vue'

export const useLayoutStore = defineStore('layoutStore', () => {
  const display = useDisplay() // Vuetify's responsive composable

  // Reactive state
  const state = reactive({
    defaults: {
      cardHeight: 800,
      cardWidth: 800
    },
    FMLayoutMode: 'full'
  })

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
    calculatedWidth
  }
})
