import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import axios from 'axios'
import { PiniaVuePlugin, createPinia } from 'pinia'

 axios.defaults.baseURL = "http://localhost:3030/api";
//axios.defaults.baseURL = "https://indelect-be.onrender.com/api"

const pinia = createPinia()
const app = createApp(App)

const vuetify = createVuetify({
    components,
    directives,
  })

app.use(router).use(vuetify).use(pinia)

app.mount('#app')