const axios = require('axios');
const port = 3000;
const dataServiceBaseUrl = `http://127.0.0.1:${port}`;

import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)

app.mount('#app')
