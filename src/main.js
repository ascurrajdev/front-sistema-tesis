import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'
import {router} from './routes/index'
import i18n  from './translations/i18n'
import Antd from 'ant-design-vue';
import VueTelInput from 'vue-tel-input'
import 'vue-tel-input/dist/vue-tel-input.css';
import piniaPersist  from 'pinia-plugin-persist';
import 'ant-design-vue/dist/antd.css';
import { VueQueryPlugin } from "@tanstack/vue-query";
const pinia = createPinia()
pinia.use(piniaPersist)
createApp(App)
.use(i18n)
.use(Antd)
.use(pinia)
.use(VueQueryPlugin)
.use(VueTelInput,{
    mode:'international',
    dropdownOptions:{
        showSearchBox:true,
        showDialCodeInSelection: true,
        showFlags: true,
    }
})
.use(router)
.mount('#app')
