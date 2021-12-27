import { ref } from '@vue/composition-api'
import useAppConfig from '@core/app-config/useAppConfig'

export default function useAppCustomizer() {
  // 定制器
  const isCustomizerOpen = ref(false)

  // 皮肤
  const skinOptions = [
    { text: '浅色', value: 'light' },
    { text: '平面线框', value: 'bordered' },
    { text: '深色', value: 'dark' },
    { text: '混合', value: 'semi-dark' },
  ]

  // 内容宽度选项
  const contentWidthOptions = [
    { text: '全宽模式', value: 'full' },
    { text: '盒子模式', value: 'boxed' },
  ]

  // 路由转场效果
  const routerTransitionOptions = [
    { title: '缩放淡入淡出', value: 'zoom-fade' },
    { title: '淡入淡出', value: 'fade' },
    { title: '纵向淡入淡出', value: 'fade-bottom' },
    { title: '横向淡入淡出', value: 'slide-fade' },
    { title: '缩放', value: 'zoom-out' },
    { title: '无', value: 'none' },
  ]

  // 导航布局方向
  const layoutTypeOptions = [
    { text: '垂直导航布局', value: 'vertical' },
    { text: '水平导航布局', value: 'horizontal' },
  ]

  // 副导航栏颜色
  const navbarColors = ['', 'primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark']

  // 副导航栏样式
  const navbarTypes = [
    { text: '浮动', value: 'floating' },
    { text: '固定', value: 'sticky' },
    { text: '跟随内容', value: 'static' },
    { text: '隐藏', value: 'hidden' },
  ]

  // 页脚样式
  const footerTypes = [
    { text: '固定', value: 'sticky' },
    { text: '跟随内容', value: 'static' },
    { text: '隐藏', value: 'hidden' },
  ]

  // eslint-disable-next-line object-curly-newline
  const {
    isRTL,
    skin,
    contentWidth,
    routerTransition,
    layoutType,
    isNavMenuHidden,
    isVerticalMenuCollapsed,
    navbarBackgroundColor,
    navbarType,
    footerType,
  } = useAppConfig()

  return {
    // 定制器
    isCustomizerOpen,

    // 垂直导航折叠
    isVerticalMenuCollapsed,

    // 皮肤
    skin,
    skinOptions,

    // 内容宽度
    contentWidth,
    contentWidthOptions,

    // 右侧导航
    isRTL,

    // 路由转场
    routerTransition,
    routerTransitionOptions,

    // 布局样式
    layoutType,
    layoutTypeOptions,

    // 导航隐藏
    isNavMenuHidden,

    // 副导航栏
    navbarColors,
    navbarTypes,
    navbarBackgroundColor,
    navbarType,

    // 页脚
    footerTypes,
    footerType,
  }
}
