/* eslint-disable import/order */
import '@/@iconify/icons-bundle'
import App from '@/App.vue'
import layoutsPlugin from '@/plugins/layouts'
import vuetify from '@/plugins/vuetify'
import { loadFonts } from '@/plugins/webfontloader'
import router from '@/router'
import '@core/scss/template/index.scss'
import '@styles/styles.scss'
import { createPinia } from 'pinia'
import { createApp } from 'vue'

// Web 字体加载
loadFonts()

// 创建 vue 应用
const app = createApp(App)

// 插件
app.use(vuetify)
app.use(createPinia())
app.use(router)
app.use(layoutsPlugin)

// 挂载
app.mount('#app')
