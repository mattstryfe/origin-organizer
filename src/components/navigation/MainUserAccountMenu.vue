<template>
  <v-menu
    v-model="accountMenu"
    :close-on-content-click="false"
    location="bottom"
  >
    <template #activator="{ props }">
      <v-chip
        v-if="!userStore.userInfo"
        color="primary"
        variant="outlined"
        @click="userStore.handleLogin()"
      >
        <v-icon start>
          mdi-account-outline
        </v-icon>
        Sign in
      </v-chip>
      <!-- v-bind props opens menu -->
      <v-avatar
        v-else
        v-bind="props"
        class="cursor-pointer"
        size="30"
      >
        <v-img :src="`${userStore.getUserPhotoURL}`" />
      </v-avatar>
    </template>

    <v-card>
      <v-list>
        <v-list-item
          :prepend-avatar="`${userStore.getUserPhotoURL}`"
          :subtitle="userStore.getUserEmail"
          :title="userStore.getUserDisplayName"
        >
          <template #append>
            <v-btn
              class="ml-2"
              color="error"
              icon="mdi-logout"
              size="small"
              variant="tonal"
              @click="userStore.handleLogout()"
            />
          </template>
        </v-list-item>
      </v-list>

      <v-divider />

      <user-account-menu-actions />

      <v-card-actions>
        <v-spacer />

        <v-btn
          variant="tonal"
          @click="accountMenu = false"
        >
          Cancel
        </v-btn>
        <v-btn
          color="primary"
          variant="tonal"
          @click="accountMenu = false"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-menu>
</template>

<script setup>
import UserAccountMenuActions from '@/components/navigation/MainUserAccountMenuActions.vue'
import { useUserStore } from '@/stores/userStore'
import { storeToRefs } from 'pinia'
const userStore = useUserStore()
const { accountMenu } = storeToRefs(userStore)
</script>

<style scoped></style>
