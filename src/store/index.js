import Vue from 'vue'
import Vuex from 'vuex'

// 模块
import app from './app'
import appConfig from './app-config'
import verticalMenu from './vertical-menu'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    appConfig,
    verticalMenu,
  },
  strict: process.env.DEV,
})
