import type { MaybeRef } from '@vueuse/shared'
import type { Ref } from 'vue'
import { AppContentLayoutNav, NavbarType } from '../enums'
import { config } from '@layouts/config'
import { injectionKeyIsVerticalNavHovered } from '@layouts'

export const useLayouts = () => {
  // 导航条的类型
  const navbarType = computed({
    get() {
      return config.navbar.type.value
    },
    set(value: typeof config.navbar.type.value) {
      config.navbar.type.value = value
      localStorage.setItem(`${config.app.title}-navbarType`, val.toString())
    },
  })

  // 导航条是否启用高斯模糊
  const isNavbarBlurEnabled = computed({
    get() {
      return config.navbar.navbarBlur.value
    },
    set(value: typeof config.navbar.navbarBlur.value) {
      config.navbar.navbarBlur.value = value
      localStorage.setItem(`${config.app.title}-navbarBlur`, value.toString())
    },
  })

  // 文本排列方向，与 RTL 组合使用，使用范围仅 I18n 设置为阿拉伯语或希伯来语时有效
  const _setAppDir = (dir: 'ltr' | 'rtl') => {
    document.documentElement.setAttribute('dir', dir)
  }

  // 页脚类型
  const footerType = computed({
    get() {
      return config.footer.type.value
    },
    set(val: typeof config.footer.type.value) {
      config.footer.type.value = value
      localStorage.setItem(`${config.app.title}-footerType`, val.toString())
    },
  })

  // 垂直导航栏是否折叠
  const isVerticalNavCollapsed = computed({
    get() {
      return config.verticalNav.isVerticalNavCollapsed.value
    },
    set(val: typeof config.verticalNav.isVerticalNavCollapsed.value) {
      config.verticalNav.isVerticalNavCollapsed.value = val
      localStorage.setItem(`${config.app.title}-isVerticalNavCollapsed`, val.toString())
    },
  })

  // 模板内容的宽度
  const appContentWidth = computed({
    get() {
      return config.app.contentWidth.value
    },
    set(val: typeof config.app.contentWidth.value) {
      config.app.contentWidth.value = val
      localStorage.setItem(`${config.app.title}-contentWidth`, val.toString())
    },
  })

  // 导航栏类型
  const appContentLayoutNav = computed({
    get() {
      return config.app.contentLayoutNav.value
    },
    set(val: typeof config.app.contentLayoutNav.value) {
      config.app.contentLayoutNav.value = val
      localStorage.setItem(`${config.app.title}-contentLayoutNav`, val.toString())

      // 如果切换为水平导航栏时导航条样式为隐藏状态时将其重置为粘性定位
      if (val === AppContentLayoutNav['水平导航栏']) {
        if (navbarType.value === NavbarType['隐藏'])
          navbarType.value = NavbarType['粘性定位']

        isVerticalNavCollapsed.value = false
      }
    },
  })

  // 水平导航栏的类型
  const horizontalNavType = computed({
    get() {
      return config.horizontalNav.type.value
    },
    set(value: typeof config.horizontalNav.type.value) {
      config.horizontalNav.type.value = value
    },
  })

  // 视口口宽度是否小于导航栏的断点
  const isLessThanOverlayNavBreakpoint = computed(() => {
    return (windowWidth: MaybeRef<number>) => unref(windowWidth) < config.app.overlayNavFromBreakpoint
  })

  // 布局的 CSS 类名变量
  const _layoutClasses = computed(() => (windowWidth: MaybeRef<number>, windowScrollY: MaybeRef<number>) => {
    const route = useRoute()

    return [
      `layout-nav-type-${appContentLayoutNav.value}`,
      `layout-navbar-${navbarType.value}`,
      `layout-footer-${footerType.value}`,
      {
        'layout-vertical-nav-collapsed':
          isVerticalNavCollapsed.value
          && appContentLayoutNav.value === 'vertical'
          && !isLessThanOverlayNavBreakpoint.value(windowWidth),
      },
      { [`horizontal-nav-${horizontalNavType.value}`]: appContentLayoutNav.value === 'horizontal' },
      `layout-content-width-${appContentWidth.value}`,
      { 'layout-overlay-nav': isLessThanOverlayNavBreakpoint.value(windowWidth) },
      { 'window-scrolled': unref(windowScrollY) },
      route.meta.layoutWrapperClasses ? route.meta.layoutWrapperClasses : null,
    ]
  })

  // 此函数用于在视口宽度在 mdAndDown（中等和以下）和 lgAndUp（大型和以上） 之间切换时垂直导航栏和水平导航栏的显示类型
  // ℹ️ 详细说明：
  // 在大部分场景中（移动设备或不需要分栏、调整视口宽度的大屏设备）不会因切换视口宽度来动用媒体查询（@media）来切换断点
  // 在模板中，小于等于中等屏幕断点 (md) 时，导航栏类型默认强制切换为垂直导航栏并折叠，大于 md 断点时显示为用户设置并在本地存储的导航栏类型
  const switchToVerticalNavOnLtOverlayNavBreakpoint = (windowWidth: MaybeRef<number>) => {
    // 当在大屏 (lgAndUp) 中使用模板时，其常量 lgAndUpNav 从主题配置文件（ThemeConfig）获取为 appContentLayoutNav 的值
    // 大屏时手动切换垂直导航栏和水平导航栏将存储并使 lgAndUpNav 更新
    const lgAndUpNav = ref(appContentLayoutNav.value)

    // 监视并获取用户缩放屏幕之前手动切换导航栏的最终更新状态
    watch(appContentLayoutNav, value => {
      if (!isLessThanOverlayNavBreakpoint.value(windowWidth))
        lgAndUpNav.value = value
    })

    // 监视当大屏缩小至中等和以下时，模板将始终显示垂直导航栏，反之如果增加视口宽度，它将回退到 appContentLayoutNav 的值
    watch(() => isLessThanOverlayNavBreakpoint.value(windowWidth), val => {
      if (!val)
        appContentLayoutNav.value = lgAndUpNav.value
      else
        appContentLayoutNav.value = AppContentLayoutNav['垂直导航栏']
    }, { immediate: true })
  }

  // 此函数用于判断当前视口宽度是否为 mini，且返回以下状态：
  // 因 mini 小于 mdAndDown，始终显示垂直导航栏
  // 鼠标悬停态（Hover）为 false
  // 导航栏折叠（Collapsed）
  // 鼠标未悬停在导航栏上
  // 导航栏宽度不小于覆盖导航栏断点
  const isVerticalNavMini = (windowWidth: MaybeRef<number>, isVerticalNavHovered: Ref<boolean> | null = null) => {
    // 如果只使用 inject 会得到 undefined
    const isVerticalNavHoveredLocal = isVerticalNavHovered || inject(injectionKeyIsVerticalNavHovered) || ref(false)

    return computed(() => isVerticalNavCollapsed.value && !isVerticalNavHoveredLocal.value && !isLessThanOverlayNavBreakpoint.value(unref(windowWidth)))
  }

  // 生成动态的国际化 (I18n) 属性对象
  const dynamicI18nProps = computed(() => (key: string, tag = 'span') => {
    if (config.app.enableI18n) {
      return {
        keypath: key,
        tag,
        scope: 'global',
      }
    }

    return {}
  })

  // 计算并设置模板布局方向是否为 RTL（从右到左）
  const isAppRtl = computed({
    get() {
      return config.app.isRtl.value
    },
    set(value: typeof config.app.isRtl.value) {
      config.app.isRtl.value = value
      localStorage.setItem(`${config.app.title}-isRtl`, value.toString())
      _setAppDir(value ? 'rtl' : 'ltr')
    },
  })

  return {
    navbarType,
    isNavbarBlurEnabled,
    footerType,
    isVerticalNavCollapsed,
    appContentWidth,
    appContentLayoutNav,
    horizontalNavType,
    isLessThanOverlayNavBreakpoint,
    _layoutClasses,
    switchToVerticalNavOnLtOverlayNavBreakpoint,
    isVerticalNavMini,
    dynamicI18nProps,
    isAppRtl,
    _setAppDir,
  }
}
