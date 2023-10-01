<script setup>
import { HorizontalNav } from '@layouts/components'
import { useLayouts } from '@layouts/composable/useLayouts'

const props = defineProps({
  navItems: {
    type: null,
    required: true,
  },
})

const { y: windowScrollY } = useWindowScroll()
const { width: windowWidth } = useWindowSize()
const router = useRouter()
const shallShowPageLoading = ref(false)

router.beforeEach(() => {
  shallShowPageLoading.value = true
})
router.afterEach(() => {
  shallShowPageLoading.value = false
})

const {
  _layoutClasses: layoutClasses,
  isNavbarBlurEnabled,
} = useLayouts()
</script>

<template>
  <div
    class="layout-wrapper"
    :class="layoutClasses(windowWidth, windowScrollY)"
  >
    <div
      class="layout-navbar-and-nav-container"
      :class="isNavbarBlurEnabled && 'header-blur'"
    >
      <!-- 导航条 -->
      <div class="layout-navbar">
        <div class="navbar-content-container">
          <slot name="navbar" />
        </div>
      </div>
      <!-- 水平导航布局 -->
      <div class="layout-horizontal-nav">
        <div class="horizontal-nav-content-container">
          <HorizontalNav :nav-items="navItems" />
        </div>
      </div>
    </div>

    <!-- 页面内容 -->
    <main class="layout-page-content">
      <template v-if="$slots['content-loading']">
        <template v-if="shallShowPageLoading">
          <slot name="content-loading" />
        </template>
        <template v-else>
          <slot />
        </template>
      </template>
      <template v-else>
        <slot />
      </template>
    </main>

    <!-- 页脚 -->
    <footer class="layout-footer">
      <div class="footer-content-container">
        <slot name="footer" />
      </div>
    </footer>
  </div>
</template>

<style lang="scss">
@use "@configured-variables" as variables;
@use "@layouts/styles/placeholders";
@use "@layouts/styles/mixins";

.layout-wrapper {
  &.layout-nav-type-horizontal {
    display: flex;
    flex-direction: column;

    // TODO: 需要垂直导航中的高度和水平导航中的最小高度
    min-block-size: calc(var(--vh, 1vh) * 100);

    .layout-navbar-and-nav-container {
      z-index: 1;
    }

    .layout-navbar {
      z-index: variables.$layout-horizontal-nav-layout-navbar-z-index;
      block-size: variables.$layout-horizontal-nav-navbar-height;

      // 当前版本不独立管理水平导航栏和导航项样式，因此暂不使用以下样式以避免与水平导航栏和导航项的组合样式冲突
      // 如果需要分别独立设置水平导航栏和导航项的样式，请添加 :not 以避免与组合样式冲突
      // .layout-navbar-sticky & {
      //   @extend %layout-navbar-sticky;
      // }
      // .layout-navbar-hidden & {
      //   @extend %layout-navbar-hidden;
      // }
    }

    // 导航条容器
    .navbar-content-container {
      @include mixins.boxed-content;
    }

    // 内容高度固定
    &.layout-content-height-fixed {
      max-block-size: calc(var(--vh) * 100);

      .layout-page-content {
        overflow: hidden;

        > :first-child {
          max-block-size: 100%;
          overflow-y: auto;
        }
      }
    }

    // 固定宽度页脚
    .layout-footer {
      .footer-content-container {
        @include mixins.boxed-content;
      }
    }
  }

  // 粘性定位的水平导航栏
  &.layout-navbar-sticky.horizontal-nav-sticky {
    .layout-navbar-and-nav-container {
      position: sticky;
      inset-block-start: 0;
      will-change: transform;
    }
  }

  &.layout-navbar-hidden.horizontal-nav-hidden {
    .layout-navbar-and-nav-container {
      display: none;
    }
  }
}

// 水平导航栏布局
.layout-horizontal-nav {
  z-index: variables.$layout-horizontal-nav-z-index;

  .horizontal-nav-content-container {
    @include mixins.boxed-content(true);
  }
}
</style>
