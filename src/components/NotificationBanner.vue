<template>
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
        <v-icon class="cust-prepend-icon" :color="roa.iconColor" size="30">
          {{ roa.prependIcon }}
        </v-icon>
      </template>

      <template #append>
        <v-btn
          class="cust-append-icon"
          icon="mdi-close"
          variant="plain"
          @click="removeNotification(roa.id)"
        ></v-btn>
      </template>
    </v-card>
  </v-snackbar>
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
