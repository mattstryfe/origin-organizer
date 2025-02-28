<template>
  <v-dialog v-model="toggleConfirmationDialog" width="auto">
    <v-card
      class="border"
      max-width="400"
      prepend-icon="mdi-trash-can"
      text="Are you sure you wanna purge the bird!?"
      title="Delete Confirmation"
    >
      <template #actions>
        <v-btn class="ms-auto" text="DELETE" @click="okayClick()"></v-btn>
        <v-btn class="ms-auto" text="Cancel" @click="cancelClick()"></v-btn>
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
