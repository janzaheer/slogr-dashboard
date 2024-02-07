import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.css';
import "bootstrap/dist/js/bootstrap.js";
import 'font-awesome/css/font-awesome.css'
import '@fortawesome/fontawesome-free/css/all.css';
import store from '../src/store/store'
import { createAuth0 } from '@auth0/auth0-vue'

const app = createApp(App)

app.use(router)
app.use(
    createAuth0({
      domain: "dev-eqttkig7sn77wx0z.us.auth0.com",
      clientId: "mB5PpD0aFIYNHO9r9Pgq1ZcEb7ywIRux",
      authorizationParams: {
        redirect_uri: window.location.origin
      }
    })
  );
app.use(store)
app.mount('#app')
