<script>
import { useLayouts } from '@layouts'
import { VerticalNav } from '@layouts/components'

export default defineComponent({
  props: {
    navItems: {
      type: Array,
      required: true,
    },
    verticalNavAttrs: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props, { slots }) {
    const { y: windowScrollY } = useWindowScroll()
    const { width: windowWidth } = useWindowSize()
    const { _layoutClasses: layoutClasses, isLessThanOverlayNavBreakpoint, isNavbarBlurEnabled } = useLayouts()
    const isOverlayNavActive = ref(false)
    const isLayoutOverlayVisible = ref(false)
    const toggleIsOverlayNavActive = useToggle(isOverlayNavActive)


    // 使用 syncRef 函数来实现两个 watchers 的替代方案
    // 如果覆盖导航 overlay nav 可见，则显示覆盖层；如果覆盖导航隐藏，则隐藏覆盖层，反之亦然
    syncRef(isOverlayNavActive, isLayoutOverlayVisible)

    // 如果在小于 md 视口下打开了覆盖导航，然后增加窗口宽度而没有关闭覆盖导航，则隐藏覆盖层
    watch(windowWidth, value => {
      if (!isLessThanOverlayNavBreakpoint.value(value) && isLayoutOverlayVisible.value)
        isLayoutOverlayVisible.value = false
    })

    const router = useRouter()
    const shallShowPageLoading = ref(false)
    
    return () => {
      const verticalNavAttrs = toRef(props, 'verticalNavAttrs')
      const { wrapper: verticalNavWrapper, wrapperProps: verticalNavWrapperProps, ...additionalVerticalNavAttrs } = verticalNavAttrs.value


      // 垂直导航
      const verticalNav = h(VerticalNav, { isOverlayNavActive: isOverlayNavActive.value, toggleIsOverlayNavActive, navItems: props.navItems, ...additionalVerticalNavAttrs }, {
        'nav-header': () => slots['vertical-nav-header']?.(),
        'before-nav-items': () => slots['before-vertical-nav-items']?.(),
      })


      // 导航条
      const navbar = h('header', { class: ['layout-navbar', { 'navbar-blur': isNavbarBlurEnabled.value }] }, [
        h('div', { class: 'navbar-content-container' }, slots.navbar?.({
          toggleVerticalOverlayNavActive: toggleIsOverlayNavActive,
        })),
      ])

      // 内容区域
      let mainChildren = slots.default?.()

      // 仅当 content-loading 加载插槽使用时，才显示加载并附加 beforeEach 和 afterEach 钩子
      if (slots['content-loading']) {
        router.beforeEach(() => {
          console.info('setting to true')
          shallShowPageLoading.value = true
        })
        router.afterEach(() => {
          console.info('setting to false')
          shallShowPageLoading.value = false
        })
        mainChildren = shallShowPageLoading.value ? slots['content-loading']?.() : slots.default?.()
      }
      const main = h('main', { class: 'layout-page-content' }, h('div', { class: 'page-content-container' }, mainChildren))

      // 页脚
      const footer = h('footer', { class: 'layout-footer' }, [
        h('div', { class: 'footer-content-container' }, slots.footer?.()),
      ])

      // 布局覆盖
      const layoutOverlay = h('div', {
        class: ['layout-overlay', { visible: isLayoutOverlayVisible.value }],
        onClick: () => { isLayoutOverlayVisible.value = !isLayoutOverlayVisible.value },
      })

      return h('div', { class: ['layout-wrapper', ...layoutClasses.value(windowWidth.value, windowScrollY.value)] }, [
        verticalNavWrapper ? h(verticalNavWrapper, verticalNavWrapperProps, { default: () => verticalNav }) : verticalNav,
        h('div', { class: 'layout-content-wrapper' }, [
          navbar,
          main,
          footer,
        ]),
        layoutOverlay,
      ])
    }
  },
})
</script>

<style lang="scss">
@use "@configured-variables" as variables;
@use "@layouts/styles/placeholders";
@use "@layouts/styles/mixins";

.layout-wrapper.layout-nav-type-vertical {
  // TODO: 需要垂直导航中的高度和水平导航中的最小高度
  block-size: 100%;

  .layout-content-wrapper {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    min-block-size: calc(var(--vh, 1vh) * 100);
    transition: padding-inline-start 0.2s ease-in-out;
    will-change: padding-inline-start;
  }

  .layout-navbar {
    z-index: variables.$layout-vertical-nav-layout-navbar-z-index;

    .navbar-content-container {
      block-size: variables.$layout-vertical-nav-navbar-height;
    }

    @at-root {
      .layout-wrapper.layout-nav-type-vertical {
        .layout-navbar {
          @if variables.$layout-vertical-nav-navbar-is-contained {
            @include mixins.boxed-content;
          } @else {
            .navbar-content-container {
              @include mixins.boxed-content;
            }
          }
        }
      }
    }
  }

  &.layout-navbar-sticky .layout-navbar {
    @extend %layout-navbar-sticky;
  }

  &.layout-navbar-hidden .layout-navbar {
    @extend %layout-navbar-hidden;
  }

  // 页脚
  .layout-footer {
    @include mixins.boxed-content;
  }

  // 布局覆盖
  .layout-overlay {
    position: fixed;
    z-index: variables.$layout-overlay-z-index;
    background-color: rgb(0 0 0 / 60%);
    cursor: pointer;
    inset: 0;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.25s ease-in-out;
    will-change: transform;

    &.visible {
      opacity: 1;
      pointer-events: auto;
    }
  }

  &:not(.layout-overlay-nav) .layout-content-wrapper {
    padding-inline-start: variables.$layout-vertical-nav-width;
  }

  // 垂直导航栏折叠状态调整内容内边距，使其与折叠状态下的宽度保持一致
  &.layout-vertical-nav-collapsed .layout-content-wrapper {
    padding-inline-start: variables.$layout-vertical-nav-collapsed-width;
  }

  // 内容高度固定
  &.layout-content-height-fixed {
    .layout-content-wrapper {
      max-block-size: calc(var(--vh) * 100);
    }

    .layout-page-content {
      display: flex;
      overflow: hidden;

      .page-content-container {
        inline-size: 100%;

        > :first-child {
          max-block-size: 100%;
          overflow-y: auto;
        }
      }
    }
  }
}
</style>
