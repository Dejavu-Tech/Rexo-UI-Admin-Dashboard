// 主题颜色（最初为空白，当应用初始化时将从 CSS 变量分配 bootstrap 颜色）
export const $themeColors = {}

// 主题断点（最初为空白，当应用初始化时将从 CSS 变量分配 bootstrap 断点）
export const $themeBreakpoints = {}

// 主题配置
export const $themeConfig = {
  app: {
    appName: 'Rexo-UI',
    // eslint-disable-next-line global-require
    appLogoImage: require('@/assets/images/logo/logo.svg'),
  },
  // 初始布局
  layout: {
    isRTL: false,
    skin: 'light', // 全局皮肤（light, dark, bordered, semi-dark）
    routerTransition: 'zoom-fade', // 路由转场效果（zoom-fade, slide-fade, fade-bottom, fade, zoom-out, none）
    type: 'vertical', // 导航布局（vertical, horizontal）
    contentWidth: 'full', // 内容宽度（full, boxed）
    menu: {
      hidden: false,
      isCollapsed: false,
    },
    navbar: {
      // ? 水平导航布局中，副导航栏样式适用于主导航栏
      type: 'floating', // 副导航栏样式（static , sticky , floating, hidden）
      backgroundColor: '', // Bootstrap 颜色选项（如：primary, success 等）
    },
    footer: {
      type: 'static', // 页脚样式（static, sticky, hidden）
    },
    customizer: true,
    enableScrollToTop: true,
  },
}
