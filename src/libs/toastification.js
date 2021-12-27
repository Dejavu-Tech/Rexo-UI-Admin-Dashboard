import Vue from 'vue'
import Toast from 'vue-toastification'

// 通知组件样式
import '@core/scss/vue/libs/toastification.scss'

// ! 如果要使用其他过渡（transition），请确保将其从源文件导入至`src/@core/scss/vue/libs/notification.scss`
Vue.use(Toast, {
  hideProgressBar: true,
  closeOnClick: false,
  closeButton: false,
  icon: false,
  timeout: 3000,
  transition: 'Vue-Toastification__fade',
})
