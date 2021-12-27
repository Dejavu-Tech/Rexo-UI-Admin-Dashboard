<template>
  <div
    class="btn-scroll-to-top"
    :class="{'show': y > 250}"
  >
    <!-- 返回顶部按钮添加涟漪效果 -->
    <b-button
      v-ripple.400="'rgba(255, 255, 255, 0.15)'"
      variant="primary"
      class="btn-icon"
      @click="scrollToTop"
    >
      <feather-icon
        icon="ArrowUpIcon"
        size="16"
      />
    </b-button>
  </div>
</template>

<script>
import { useWindowScroll } from '@vueuse/core'
import { BButton } from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'

export default {
  directives: {
    Ripple,
  },
  components: {
    BButton,
  },
  setup() {
    const { y } = useWindowScroll()

    const scrollToTop = () => {
      const rootEle = document.documentElement
      rootEle.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    }

    return { y, scrollToTop }
  },

}
</script>

<style lang="scss" scoped>
.btn-scroll-to-top {
  position: fixed;
    bottom: 5%;
    right: 30px;
    z-index: 99;

    opacity: 0;
    // transform: translateY(100px);
    transition: all .5s ease;

    &.show {
      opacity: 1;
      // transform: translateY(0)
    }
}
</style>
