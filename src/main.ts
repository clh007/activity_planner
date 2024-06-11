import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import piniaPluginPersistedState from 'pinia-plugin-persistedstate'

import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

import './assets/css/index.css'
import './assets/css/color.css'
import './assets/css/animation.css'

import '@/utils/changeTitle'

const app = createApp(App)
app.use(createPinia().use(piniaPluginPersistedState))
    .use(router)
    .use(ElementPlus)
    .mount('#app')