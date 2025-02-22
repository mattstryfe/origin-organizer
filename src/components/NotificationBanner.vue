<template>
  <v-container
    style="
      position: fixed;
      bottom: 40px;
      right: 0px;
      z-index: 9999;
      max-height: 100%;
      border: 1px solid blue;
      background: transparent;
      display: flex;
      flex-direction: column-reverse;
      align-items: flex-end;
    "
  >
    <v-snackbar
      v-for="(roa, index) in notifications"
      :key="roa.id"
      v-model="roa.show"
      class="ma-0 pa-0"
      :style="{ bottom: `${(index + 1) * 60}px` }"
      :timeout="roa.timeout"
      variant="outlined"
      @update:model-value="removeNotification(roa.id)"
    >
      <v-card
        append-icon="mdi-close"
        :color="roa.type"
        density="compact"
        height="55"
        :subtitle="roa.subtitle"
        :title="roa.id"
        width="375"
      >
        <template #prepend>
          <v-icon class="cust-prepend-icon" color="blue-darken-2" size="30">
            {{ roa.prependIcon }}
          </v-icon>
        </template>

        <template #append>
          <v-btn
            class="cust-append-icon"
            icon="mdi-close"
            variant="plain"
          ></v-btn>
        </template>
      </v-card>
    </v-snackbar>
  </v-container>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useNotificationsStore } from '@/stores/notificationsStore'
const { notifications } = storeToRefs(useNotificationsStore())
// Model-value runs even when it auto closes (hits timeout limit)
const removeNotification = (id) => {
  notifications.value = notifications.value.filter((n) => n.id !== id)
}
</script>

<style scoped>
.cust-append-icon {
  position: relative;
  top: -13px;
  right: -25px;
}
.cust-prepend-icon {
  position: relative;
  top: -12px;
  left: -14px;
}
:deep(.v-card-item) {
  padding-top: 4px;
}
:deep(.v-snackbar__content) {
  padding: 0;
}
</style>
