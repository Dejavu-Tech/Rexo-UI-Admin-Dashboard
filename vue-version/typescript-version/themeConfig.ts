import { breakpointsVuetify } from '@vueuse/core'
import { VIcon } from 'vuetify/components/VIcon'

// ❗ 导入 logo.svg 时必须带有 ?raw 后缀
import logo from '@images/logo.svg?raw'
import { defineThemeConfig } from '@core'
import { RouteTransitions, Skins } from '@core/enums'
import { AppContentLayoutNav, ContentWidth, FooterType, NavbarType } from '@layouts/enums'

export const { themeConfig, layoutConfig } = defineThemeConfig({
  app: {
    title: 'Rexo-UI',
    logo: h('div', { innerHTML: logo, style: 'line-height:0; color: rgb(var(--v-global-theme-primary))' }),
    contentWidth: ContentWidth['固定'],
    contentLayoutNav: AppContentLayoutNav['垂直导航栏'],
    overlayNavFromBreakpoint: breakpointsVuetify.md + 16,
    enableI18n: false,
    theme: 'system',
    isRtl: false,
    skin: Skins['立体阴影 (默认)'],
    routeTransition: RouteTransitions['淡入淡出'],
    iconRenderer: VIcon,
  },
  navbar: {
    type: NavbarType['粘性定位'],
    navbarBlur: true,
  },
  footer: { type: FooterType['静态定位'] },
  verticalNav: {
    isVerticalNavCollapsed: false,
    defaultNavItemIconProps: { icon: 'tabler-circle', size: 10 },
    isVerticalNavSemiDark: false,
  },
  horizontalNav: {
    type: 'sticky',
    transition: 'slide-y-reverse-transition',
  },
  icons: {
    chevronDown: { icon: 'tabler-chevron-down' },
    chevronRight: { icon: 'tabler-chevron-right', size: 18 },
    close: { icon: 'tabler-x' },
    verticalNavPinned: { icon: 'tabler-circle-dot' },
    verticalNavUnPinned: { icon: 'tabler-circle' },
    sectionTitlePlaceholder: { icon: 'tabler-separator' },
  },
})
