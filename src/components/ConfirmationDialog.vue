<template>
  <v-dialog v-model="toggleConfirmationDialog" width="auto">
    <v-card
      max-width="400"
      prepend-icon="mdi-update"
      text="Your application will relaunch automatically after the update is complete."
      title="Update in progress"
    >
      <template #actions>
        <v-btn class="ms-auto" text="DELETE" @click="okayClick"></v-btn>
        <v-btn class="ms-auto" text="Cancel" @click="cancelClick"></v-btn>
      </template>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useNotificationsStore } from '@/stores/notificationsStore'
const notificationsStore = useNotificationsStore()

const { toggleConfirmationDialog } = storeToRefs(notificationsStore)

const cancelClick = () => {
  notificationsStore.toggleConfirmationResolver(false)
}

const okayClick = () => {
  notificationsStore.toggleConfirmationResolver(true)
}
</script>

<style scoped></style>
