<template>
  <v-col cols="12">
    <v-textarea
      density="compact"
      :disabled="disabled"
      hide-details
      rows="3"
      variant="outlined"
      v-model="activeNote"
    ></v-textarea>
  </v-col>
  <v-col cols="12">
    <v-list>
      <v-list-item
        v-for="n in sortedArchivedNotes"
        :key="n"
        density="compact"
        lines="3"
      >
        <template #prepend>
          <v-avatar
            class="mt-1"
            density="compact"
            :image="n.userPhotoURL"
          ></v-avatar>
        </template>
        <v-list-item-title>
          <span class="text-body-2">{{ n.user }}</span>
          -
          <span class="text-caption">{{ computeTimestamp(n?.timestamp) }}</span>
        </v-list-item-title>
        <v-list-item-subtitle>
          <span class="text-caption">{{ n.content }}</span>
        </v-list-item-subtitle>
      </v-list-item>
    </v-list>
  </v-col>
</template>

<script setup>
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { computed } from 'vue'
dayjs.extend(relativeTime)
const activeNote = defineModel('activeNote', {
  type: String,
  default: 'default note...'
})

const { archivedNotes, disabled } = defineProps({
  archivedNotes: {
    type: Array,
    default: () => []
  },
  disabled: {
    type: Boolean,
    default: true
  }
})

const sortedArchivedNotes = computed(() => {
  return [...archivedNotes].sort(
    (a, b) => b.timestamp.seconds - a.timestamp.seconds
  )
})

const computeTimestamp = (timestamp) => {
  return dayjs.unix(timestamp.seconds).fromNow()
}
</script>

<style scoped>
:deep(.v-list-item__prepend) {
  align-self: start;
}
</style>
