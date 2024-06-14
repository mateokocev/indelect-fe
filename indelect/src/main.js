import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import axios from 'axios'
const port = 3030;
const dataServiceBaseUrl = `htttp://127.0.0.1:${port}`;

const app = createApp(App)

const vuetify = createVuetify({
    components,
    directives,
  })

app.use(router).use(vuetify)

app.mount('#app')