import { defineStore } from 'pinia'

export const useEntryFormStore = defineStore('entryFormStore', {
  state: () => ({
    formData: {
    }
  }),

  getters: {

  },

  actions: {
    updateField(field, value) {
      this.formData[field] = value
    }
  }
})