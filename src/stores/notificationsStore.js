// stores/notificationsStore.js
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useNotificationsStore = defineStore('notifications', () => {
  // --- State ---
  const notifications = ref([])
  const toggleConfirmationDialog = ref(false)
  const confirmationResolver = ref(null)

  // --- Actions ---
  const toggleConfirmationResolverFn = (val) => {
    if (confirmationResolver.value) {
      confirmationResolver.value(val)
      toggleConfirmationDialog.value = false
    }
  }

  const waitForDeleteConfirmationResponse = () => {
    return new Promise((resolve) => {
      confirmationResolver.value = resolve
      toggleConfirmationDialog.value = true
    })
  }

  const addNotification = (type = 'found', entryId) => {
    const msg = {
      id: entryId,
      type,
      show: true,
      timeout: 2000,
      prependIcon: 'mdi-information-outline',
      iconColor: 'blue-darken-2'
    }

    switch (type) {
      case 'found':
        msg.subtitle = ` has been found and loaded!`
        break
      case 'update':
        msg.subtitle = ` has been updated successfully!`
        msg.prependIcon = 'mdi-content-save-check'
        break
      case 'removed':
        msg.subtitle = ` has been removed successfully!`
        msg.prependIcon = 'mdi-delete'
        msg.iconColor = 'red-darken-2'
        break
      case 'error':
        msg.subtitle = 'Something went wrong'
        break
    }

    notifications.value.push(msg)
  }

  return {
    // state
    notifications,
    toggleConfirmationDialog,
    confirmationResolver,

    // actions
    toggleConfirmationResolver: toggleConfirmationResolverFn,
    waitForDeleteConfirmationResponse,
    addNotification
  }
})
