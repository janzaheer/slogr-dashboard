import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.css';
import "bootstrap/dist/js/bootstrap.js";
import 'font-awesome/css/font-awesome.css'
import '@fortawesome/fontawesome-free/css/all.css';
const app = createApp(App)

app.use(router)

app.mount('#app')
