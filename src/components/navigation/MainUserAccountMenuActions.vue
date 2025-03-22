<template>
  <v-list density="compact">
    <v-list-subheader color="secondary">User Controls</v-list-subheader>

    <v-list-item class="py-0 my-0">
      <template #prepend>
        <v-switch
          class="mr-8"
          color="primary"
          density="compact"
          false-value="light"
          hide-details
          v-model="enableDarkMode"
          true-value="dark"
          @update:model-value="toggleDarkMode"
        />
      </template>

      <v-list-item-title class="text-capitalize v-label text-right">
        {{ enableDarkMode }} Mode
      </v-list-item-title>
    </v-list-item>

    <v-list-item class="py-0 my-0">
      <template #prepend>
        <v-switch
          v-model="enableAutoSave"
          class="mr-8"
          color="primary"
          density="compact"
          hide-details
        />
      </template>

      <v-list-item-title class="text-capitalize v-label text-right">
        Auto Save
      </v-list-item-title>
    </v-list-item>

    <v-divider />
    <v-list-subheader color="red-lighten-2">Danger Zone</v-list-subheader>
    <!-- example for now -->
    <v-progress-linear
      :active="!hasProfileBeenRepaired"
      color="green-darken-3"
      :indeterminate="!hasProfileBeenRepaired"
    />

    <v-list-item
      v-for="(item, i) in dangerZoneEntries"
      :key="i"
      :value="item"
      @click="item.action"
    >
      <template #prepend>
        <v-icon :color="item.iconColor" :icon="item.icon" :loading="true" />
      </template>
      <v-list-item-title class="text-capitalize v-label">
        {{ item.name }}
      </v-list-item-title>
    </v-list-item>
  </v-list>
</template>

<script setup>
import { ref } from 'vue'
const enableDarkMode = ref('dark')
const enableAutoSave = ref(true)
import { useUserStore } from '@/stores/userStore'
import { storeToRefs } from 'pinia'
import { useTheme } from 'vuetify'

const userStore = useUserStore()
const { hasProfileBeenRepaired } = storeToRefs(userStore)
const theme = useTheme()

const toggleDarkMode = () => {
  theme.global.name.value = enableDarkMode.value
}
const dangerZoneEntries = ref([
  {
    name: 'repair profile',
    icon: 'mdi-wrench',
    iconColor: 'warning',
    loadingIcon: '',
    action: userStore.repairUserAccount,
    appendStatus: hasProfileBeenRepaired
  },
  {
    name: 'nuke profile',
    icon: 'mdi-nuke',
    iconColor: 'red-darken-2 ',
    action: userStore.nukeUserAccount,
    appendStatus: false
  }
])
</script>

<style scoped></style>
