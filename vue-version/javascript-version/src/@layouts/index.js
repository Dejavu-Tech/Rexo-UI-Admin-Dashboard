import { useDynamicVhCssProperty } from './composable/useDynamicVhCssProperty'
import { config } from './config'
import { AppContentLayoutNav, ContentWidth } from './enums'
import { HorizontalNav, useLayouts } from '@layouts'

const { _setAppDir } = useLayouts()

// 创建页面布局并设置一些样式的本地存储
export const createLayouts = userConfig => {
  const localStorageIsRtl = localStorage.getItem(`${userConfig.app.title}-isRtl`)
  const localStorageIsVerticalNavCollapsed = localStorage.getItem(`${userConfig.app.title}-isVerticalNavCollapsed`)
  const localStorageFooterType = localStorage.getItem(`${userConfig.app.title}-footerType`)
  const localStorageNavbarType = localStorage.getItem(`${userConfig.app.title}-navbarType`)
  const localStorageNavbarBlur = localStorage.getItem(`${userConfig.app.title}-navbarBlur`)

  const localStorageContentWidth = (() => {
    const storageValue = localStorage.getItem(`${userConfig.app.title}-contentWidth`)

    return Object.values(ContentWidth).find(v => v === storageValue)
  })()

  const localStorageContentLayoutNav = (() => {
    const storageValue = localStorage.getItem(`${userConfig.app.title}-contentLayoutNav`)

    return Object.values(AppContentLayoutNav).find(v => v === storageValue)
  })()

  config.app.title = userConfig.app.title
  config.app.logo = userConfig.app.logo
  config.app.contentWidth.value = localStorageContentWidth || userConfig.app.contentWidth
  config.app.contentLayoutNav.value = localStorageContentLayoutNav || userConfig.app.contentLayoutNav
  config.app.overlayNavFromBreakpoint = userConfig.app.overlayNavFromBreakpoint
  config.app.enableI18n = userConfig.app.enableI18n
  config.app.isRtl.value = localStorageIsRtl ? JSON.parse(localStorageIsRtl) : userConfig.app.isRtl
  config.app.iconRenderer = userConfig.app.iconRenderer
  config.navbar.type.value = localStorageNavbarType || userConfig.navbar.type
  config.navbar.navbarBlur.value = localStorageNavbarBlur ? JSON.parse(localStorageNavbarBlur) : userConfig.navbar.navbarBlur
  config.footer.type.value = localStorageFooterType || userConfig.footer.type
  config.verticalNav.isVerticalNavCollapsed.value
        = localStorageIsVerticalNavCollapsed
      ? JSON.parse(localStorageIsVerticalNavCollapsed)
      : userConfig.verticalNav.isVerticalNavCollapsed
  config.verticalNav.defaultNavItemIconProps = userConfig.verticalNav.defaultNavItemIconProps
  config.horizontalNav.type.value = userConfig.horizontalNav.type
  config.icons.chevronDown = userConfig.icons.chevronDown
  config.icons.chevronRight = userConfig.icons.chevronRight
  config.icons.close = userConfig.icons.close
  config.icons.verticalNavPinned = userConfig.icons.verticalNavPinned
  config.icons.verticalNavUnPinned = userConfig.icons.verticalNavUnPinned
  config.icons.sectionTitlePlaceholder = userConfig.icons.sectionTitlePlaceholder

  return () => {
    useDynamicVhCssProperty()
    _setAppDir(config.app.isRtl.value ? 'rtl' : 'ltr')
  }
}
export const injectionKeyIsVerticalNavHovered = Symbol('isVerticalNavHovered')
export * from './components'
export { useLayouts } from './composable/useLayouts'
