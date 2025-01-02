import { createApp } from 'vue'
import App from './App.vue'
import pinia from '@/plugins/pinia.js'
import router from '@/plugins/router.js'
import './assets/css/style.css'
import { vuetify } from '@/plugins/vuetify'

createApp(App).use(pinia).use(router).use(vuetify).mount('#app')