import { computed, watch } from '@vue/composition-api'
import store from '@/store'

export default function usAppConfig() {
  // ------------------------------------------------
  // 垂直折叠导航
  // ------------------------------------------------
  const isVerticalMenuCollapsed = computed({
    get: () => store.state.verticalMenu.isVerticalMenuCollapsed,
    set: val => {
      store.commit('verticalMenu/UPDATE_VERTICAL_MENU_COLLAPSED', val)
    },
  })

  // ------------------------------------------------
  // RTL 从右向左模式
  // ------------------------------------------------
  const isRTL = computed({
    get: () => store.state.appConfig.layout.isRTL,
    set: val => {
      store.commit('appConfig/TOGGLE_RTL', val)
    },
  })

  // ------------------------------------------------
  // 全局皮肤
  // ------------------------------------------------
  const skin = computed({
    get: () => store.state.appConfig.layout.skin,
    set: val => {
      store.commit('appConfig/UPDATE_SKIN', val)
    },
  })

  const skinClasses = computed(() => {
    if (skin.value === 'bordered') return 'bordered-layout'
    if (skin.value === 'semi-dark') return 'semi-dark-layout'

    // 浅色布局（默认）和深色布局皮肤禁止添加类返回，否则 body 类会被更新
    return null
  })

  // ------------------------------------------------
  // 路由转换
  // ------------------------------------------------
  const routerTransition = computed({
    get: () => store.state.appConfig.layout.routerTransition,
    set: val => {
      store.commit('appConfig/UPDATE_ROUTER_TRANSITION', val)
    },
  })

  // *===============================================---*
  // *--------- 布局 ---------------------------------------*
  // *===============================================---*

  // ------------------------------------------------
  // 布局类型
  // ------------------------------------------------

  const layoutType = computed({
    get: () => store.state.appConfig.layout.type,
    set: val => {
      store.commit('appConfig/UPDATE_LAYOUT_TYPE', val)
    },
  })

  // 混合布局仅有垂直导航布局，更改为水平菜单布局时会重置皮肤
  watch(layoutType, val => {
    if (val === 'horizontal' && skin.value === 'semi-dark') skin.value = 'light'
  })

  // ------------------------------------------------
  // 内容宽度（全宽/盒子）
  // ------------------------------------------------
  const contentWidth = computed({
    get: () => store.state.appConfig.layout.contentWidth,
    set: val => {
      store.commit('appConfig/UPDATE_CONTENT_WIDTH', val)
    },
  })

  // ------------------------------------------------
  // 隐藏导航
  // ------------------------------------------------
  const isNavMenuHidden = computed({
    get: () => store.state.appConfig.layout.menu.hidden,
    set: val => {
      store.commit('appConfig/UPDATE_NAV_MENU_HIDDEN', val)
    },
  })

  // *===============================================---*
  // *--------- 导航栏 ---------------------------------------*
  // *===============================================---*

  const navbarBackgroundColor = computed({
    get: () => store.state.appConfig.layout.navbar.backgroundColor,
    set: val => {
      store.commit('appConfig/UPDATE_NAVBAR_CONFIG', { backgroundColor: val })
    },
  })

  const navbarType = computed({
    get: () => store.state.appConfig.layout.navbar.type,
    set: val => {
      store.commit('appConfig/UPDATE_NAVBAR_CONFIG', { type: val })
    },
  })

  // *===============================================---*
  // *--------- 页脚 ---------------------------------------*
  // *===============================================---*

  const footerType = computed({
    get: () => store.state.appConfig.layout.footer.type,
    set: val => {
      store.commit('appConfig/UPDATE_FOOTER_CONFIG', { type: val })
    },
  })

  return {
    isVerticalMenuCollapsed,
    isRTL,
    skin,
    skinClasses,
    routerTransition,

    // 导航栏
    navbarBackgroundColor,
    navbarType,

    // 页脚
    footerType,

    // 布局
    layoutType,
    contentWidth,
    isNavMenuHidden,
  }
}
