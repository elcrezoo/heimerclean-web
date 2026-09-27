import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { asset } from './lib/asset'
import { router } from './router'

const app = createApp(App)
app.config.globalProperties.$asset = asset
app.use(router).mount('#app')
