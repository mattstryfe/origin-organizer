import { createApp } from 'vue'
import App from './App.vue'
import pinia from '@/plugins/pinia.js'
import router from '@/plugins/router.js'
import './assets/css/style.css'
import { vuetify } from '@/plugins/vuetify'
import { VueFire, VueFireAuth } from 'vuefire'
import { db } from '@/plugins/firebase'

createApp(App)
  .use(VueFire, {
    firestore: db
  })
  .use(pinia)
  .use(router)
  .use(vuetify)
  .mount('#app')
