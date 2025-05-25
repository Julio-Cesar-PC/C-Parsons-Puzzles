import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vue3GoogleLogin from 'vue3-google-login'
import { OhVueIcon, addIcons } from "oh-vue-icons";
import { IoArrowBackOutline, CoPlus, CoArrowLeft } from "oh-vue-icons/icons";

addIcons(IoArrowBackOutline, CoPlus, CoArrowLeft);

const app = createApp(App)

app.use(vue3GoogleLogin, {
  clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
  scope: 'profile email',
})

app.use(router)
app.component("v-icon", OhVueIcon);
app.mount('#app')
