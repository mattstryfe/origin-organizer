import { defineStore } from 'pinia'

export const useStore = defineStore('userStore', {
  state: () => ({
      userInfo: null
  }),
  getters: {
    getUserPhotoURL: state => state.userInfo.photoURL,
    getUserUid: state => state.userInfo.uid
  }
})