import { defineStore } from 'pinia'

export const useNotificationsStore = defineStore('notifications', {
  state: () => ({
    notifications: []
  }),

  actions: {
    addNotification(type = 'found', entryId) {
      let msg = {
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
      this.notifications.push(msg)
    }
  }
})
