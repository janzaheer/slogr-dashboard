import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.css';
import "bootstrap/dist/js/bootstrap.js";
import 'font-awesome/css/font-awesome.css'
import '@fortawesome/fontawesome-free/css/all.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import store from '../src/store/store'
import { createAuth0 } from '@auth0/auth0-vue'

const app = createApp(App)

app.use(router)
app.use(
    createAuth0({
      domain: import.meta.env.VITE_AUTHO_DOMAIN,
      clientId: import.meta.env.VITE_AUTHO_CLIENT_ID,
      authorizationParams: {
        // redirect_uri: import.meta.VITE_AUTHO_CALLBACK_URL
        redirect_uri: window.location.origin
      }
    })
  );
app.use(store)
app.mount('#app')
