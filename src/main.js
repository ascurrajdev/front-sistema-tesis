import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'
import {router} from './routes/index'
import i18n  from './translations/i18n'
import Antd from 'ant-design-vue';
import piniaPersist  from 'pinia-plugin-persist';
import 'ant-design-vue/dist/antd.css';
const pinia = createPinia()
pinia.use(piniaPersist)
createApp(App)
.use(i18n)
.use(Antd)
.use(pinia)
.use(router)
.mount('#app')
