// stores/entryFormStore.js
import { defineStore } from 'pinia'
import { ref, computed, reactive } from 'vue'
import { useUserStore } from '@/stores/userStore'
import {
  collection,
  deleteDoc,
  doc,
  updateDoc,
  onSnapshot,
  addDoc,
  Timestamp,
  serverTimestamp
} from 'firebase/firestore'
import { db, storage } from '@/plugins/firebase'
import {
  getDownloadURL,
  ref as storageRef,
  uploadBytes
} from 'firebase/storage'
import { useNotificationsStore } from '@/stores/notificationsStore'
import { notesValidator } from '@/utils/generalUtils.js'

export const useEntryFormStore = defineStore('entryFormStore', () => {
  // --- State ---
  const formData = reactive({
    notes: {
      active: '',
      archived: []
    }
  })
  const entries = ref([])
  const hasEntryChanged = ref(false)
  const editModeToggle = ref(false)
  const selectionIds = ref(new Map())
  const isDoneLoadingEntries = ref(null)
  const showBottomSheet = ref(false)
  const attachments = ref([])
  const filterByFavoriteAndFoundation = ref(false)
  const isAppIniting = ref(true)
  const isFirebaseListenerActive = ref(false)
  const searchParams = ref('')

  // --- Stores ---
  const userStore = useUserStore()
  const notificationsStore = useNotificationsStore()

  // --- Getters ---
  const getEntryRef = (entryId) =>
    doc(db, 'flocks', userStore.getUserUid, 'entries', entryId)

  const disableBottomSheetButton = computed(() => selectionIds.value.size !== 2)

  const getMostRecentEntries = computed(() => entries.value)

  // TODO: this lags when typing eee, then backspacing, leading me to believe it's not very efficient.
  // we could probably use a hashmap or just use a firebase filter. it would be more powerful and
  // potentially less intrusive.
  const searchedEntries = computed(() => {
    const query = searchParams.value?.toLowerCase() || ''
    const searchWords = query.split(/\s+/).filter(Boolean)
    if (!searchWords.length) return entries.value

    const matches = (value) => {
      if (value == null) return false
      if (Array.isArray(value)) return value.some(matches)
      if (typeof value === 'object') return Object.values(value).some(matches)
      return searchWords.every((word) =>
        String(value).toLowerCase().includes(word)
      )
    }

    return entries.value.filter((entry) => matches(entry))
  })

  // --- Actions ---
  const filterEntryListBy = (sex) => {
    const valToUse = sex === 'mother' ? 'female' : 'male'
    const base = filterByFavoriteAndFoundation.value
      ? entries.value.filter((e) => e.isFoundation || e.isFavorited)
      : entries.value
    return base.filter((e) => e.sex === valToUse)
  }

  const setupEntriesListener = () => {
    const flockId = userStore.getUserUid
    if (!flockId || isFirebaseListenerActive.value) return

    const entriesCollection = collection(db, 'flocks', flockId, 'entries')
    isFirebaseListenerActive.value = true

    onSnapshot(
      entriesCollection,
      (querySnapshot) => {
        const updatedEntriesMap = new Map()
        const currentIds = new Set(entries.value.map((e) => e.entryId))
        const addedBatch = []

        // This creates a living/breathing snapshot of the entries
        // We could just as easily updates these locally in the app and they would sync up with firebase.
        // However, we SEVER & reTether reactivity because things like SAVE and CANCEL would otherwise be impossible.
        // handlers: are attached to handle the changes independently and although this is wasteful,
        // it adds a nice vessel to attach the notifications.
        // The batching is used to prevent notifs from going overboard during initial load
        querySnapshot.docChanges().forEach((change) => {
          const entry = {
            entryId: change.doc.id,
            ...change.doc.data(),
            notes: notesValidator(change.doc.data().notes),
            imageUrlGetter: (entry) => getEntryImageUrls(entry)
          }

          updatedEntriesMap.set(entry.entryId, entry)

          const handlers = {
            added: () => {
              if (!currentIds.has(entry.entryId)) {
                if (isAppIniting.value) {
                  addedBatch.push(entry)
                } else {
                  entries.value.push(entry)
                  notificationsStore.addNotification('found', entry.entryId)
                }
              }
            },
            modified: () => {
              const existingEntry = entries.value.find(
                (e) => e.entryId === entry.entryId
              )
              if (existingEntry) {
                Object.assign(existingEntry, entry)
                notificationsStore.addNotification('update', entry.entryId)
              }
            },
            removed: () => {
              entries.value = entries.value.filter(
                (e) => e.entryId !== entry.entryId
              )
              notificationsStore.addNotification('removed', entry.entryId)
            }
          }

          handlers[change.type]?.()
        })

        if (isAppIniting.value) {
          entries.value = [...entries.value, ...addedBatch]
          isAppIniting.value = false
        }

        isDoneLoadingEntries.value = true
      },
      (error) => {
        notificationsStore.addNotification('error')
        console.error('Error fetching entries:', error)
      }
    )
  }

  const clearFormData = () => {
    formData.notes.active = ''
    formData.notes.archived = []
  }

  const removeThisEntry = async (entryId) => {
    const isConfirmed =
      await notificationsStore.waitForDeleteConfirmationResponse()
    if (!isConfirmed) return
    await deleteDoc(getEntryRef(entryId))
  }

  const foundationThisEntry = async (entryId, isFoundation) => {
    await updateDoc(getEntryRef(entryId), {
      isFoundation: !isFoundation,
      updatedAt: Timestamp.now()
    })
  }

  const favoriteThisEntry = async (entryId, isFavorite) => {
    await updateDoc(getEntryRef(entryId), {
      isFavorited: !isFavorite,
      updatedAt: Timestamp.now()
    })
  }

  const getEntryById = (entryId) =>
    entries.value.find((entry) => entry.entryId === entryId)

  // Attached to entries when they are initially queried this is lazyLoaded and will not fire unless it needs to
  // it's all deleted during re-write to db because firebase is unable to save functions
  const getEntryImageUrls = async (entry) => {
    const flockId = userStore.getUserUid
    const { entryId } = entry
    const imageId = entry?.photoIds?.[0] ?? null

    if (!imageId) {
      entry.imageUrl = 'https://cdn.vuetifyjs.com/images/cards/docks.jpg'
      return
    }

    try {
      const refPath = storageRef(
        storage,
        `${flockId}/${entryId}/${imageId}.jpg`
      )
      entry.imageUrl = await getDownloadURL(refPath)
    } catch (error) {
      console.error('Error fetching image URL:', error)
    }
  }

  // Only used for INITIAL Saves.
  // Subsequent saves are done via updateEntryInDb()
  const saveEntryToDb = async () => {
    const flockId = userStore.getUserUid

    if (attachments.value.length > 0) {
      formData.photoIds = [crypto.randomUUID()]
    }

    const entriesCollectionRef = collection(db, 'flocks', flockId, 'entries')
    const { id: entryId } = await addDoc(entriesCollectionRef, {
      ...formData,
      updatedAt: serverTimestamp(),
      createdAt: serverTimestamp()
    })

    if (attachments.value.length > 0) {
      await uploadImages(flockId, entryId, formData.photoIds[0])
    }
  }

  // Updates entry in DB
  const updateEntryInDb = async (entryId) => {
    const timestamp = Timestamp.now()
    const entry = getEntryById(entryId)
    if (!entry) return

    const copy = { ...entry }
    delete copy.imageUrlGetter // VERY IMPORTANT. get's re-attached later

    // Special notes things to append dates and keep it stateful
    // Also resets active to ''
    // This is required because of how reactive things are.  If we never severed the tether
    // the firebase db would be updating every single character we typed in notes.
    if (copy.notes.active?.length > 0) {
      copy.notes.archived.push({
        timestamp,
        content: copy.notes.active,
        user: userStore.getUserDisplayName,
        userPhotoURL: userStore.getUserPhotoURL
      })
      copy.notes.active = ''
    }

    // Can either update the DB entry OR update this.entries.
    // Both update each other and stay in sync due to DB
    await updateDoc(getEntryRef(entryId), {
      ...copy,
      updatedAt: timestamp
    })

    editModeToggle.value = false
  }

  const uploadImages = async (flockId, entryId, uniqueId) => {
    const refPath = storageRef(storage, `${flockId}/${entryId}/${uniqueId}.jpg`)
    await uploadBytes(refPath, attachments.value[0])
  }

  return {
    // State
    formData,
    entries,
    hasEntryChanged,
    editModeToggle,
    selectionIds,
    isDoneLoadingEntries,
    showBottomSheet,
    attachments,
    filterByFavoriteAndFoundation,
    isAppIniting,
    isFirebaseListenerActive,
    searchParams,

    // Getters
    getEntryRef,
    disableBottomSheetButton,
    getMostRecentEntries,
    searchedEntries,

    // Actions
    filterEntryListBy,
    setupEntriesListener,
    clearFormData,
    removeThisEntry,
    foundationThisEntry,
    favoriteThisEntry,
    getEntryById,
    updateEntryInDb,
    getEntryImageUrls,
    saveEntryToDb,
    uploadImages
  }
})
