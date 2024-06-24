import { defineStore } from 'pinia'

export const useEntryFormStore = defineStore('entryFormStore', {
  state: () => ({
    formData: {
      type: {  }
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