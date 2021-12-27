<template>
  <!-- 404 页面 -->
  <div class="misc-wrapper">
    <b-link class="brand-logo">
      <Rexo-logo />
      <h2 class="brand-text text-primary">
        Rexo-UI
      </h2>
    </b-link>

    <div class="misc-inner p-2 p-sm-5">
      <div class="w-100 text-center">
        <h2 class="mb-1">
          找不到页面 🕵🏻‍♀️😖 404
        </h2>
        <p class="mb-2">
          在此服务器上找不到请求的 URL
        </p>

        <b-button
          variant="primary"
          class="mb-2 btn-sm-block"
          :to="{path:'/'}"
        >
          返回首页
        </b-button>

        <!-- image -->
        <b-img
          fluid
          :src="imgUrl"
          alt="404 页面"
        />
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable global-require */
import { BLink, BButton, BImg } from 'bootstrap-vue'
import RexoLogo from '@core/layouts/components/Logo.vue'
import store from '@/store/index'

export default {
  components: {
    RexoLogo,
    BLink,
    BButton,
    BImg,
  },
  data() {
    return {
      downImg: require('@/assets/images/pages/error.svg'),
    }
  },
  computed: {
    imgUrl() {
      if (store.state.appConfig.layout.skin === 'dark') {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.downImg = require('@/assets/images/pages/error-dark.svg')
        return this.downImg
      }
      return this.downImg
    },
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/pages/page-misc.scss';
</style>
