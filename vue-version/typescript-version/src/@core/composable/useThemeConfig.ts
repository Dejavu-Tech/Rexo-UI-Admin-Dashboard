import { useTheme } from 'vuetify'
import { useLayouts } from '@layouts'
import { themeConfig } from '@themeConfig'
import { config } from '@layouts/config'

export const isDarkPreferred = usePreferredDark()

export const useThemeConfig = () => {
  const theme = computed({
    get() {
      return themeConfig.app.theme.value
    },
    set(value: typeof themeConfig.app.theme.value) {
      themeConfig.app.theme.value = value
      localStorage.setItem(`${themeConfig.app.title}-theme`, value.toString())

      // 模板在关闭暗黑模式（深色外观）时不会重置混合外观（深色导航栏 + 浅色内容），因为切换时的直觉通常会被认为是一个 bug
      // if (value !== 'light')
      //   // eslint-disable-next-line @typescript-eslint/no-use-before-define
      //   isVerticalNavSemiDark.value = false
    },
  })

  const isVerticalNavSemiDark = computed({
    get() {
      return themeConfig.verticalNav.isVerticalNavSemiDark.value
    },
    set(value: typeof themeConfig.verticalNav.isVerticalNavSemiDark.value) {
      themeConfig.verticalNav.isVerticalNavSemiDark.value = value
      localStorage.setItem(`${themeConfig.app.title}-isVerticalNavSemiDark`, value.toString())
    },
  })

  const syncVuetifyThemeWithTheme = () => {
    const vuetifyTheme = useTheme()

    watch([theme, isDarkPreferred], ([val, _]) => {
      vuetifyTheme.global.name.value = val === 'system'
        ? isDarkPreferred.value
          ? 'dark'
          : 'light'
        : val
    })
  }

  // 在 Vue 准备就绪之前显示初始加载器（loader），而 loader 的背景颜色为全局主色
  // 因此模板使用本地存储 localStorage 中的全局主色来设置 loader 的背景颜色
  const syncInitialLoaderTheme = () => {
    const vuetifyTheme = useTheme()

    watch(theme, () => {
      // 以下代码中没有使用 Theme.current.colors.surface，因为该 watch 是独立的，当 watch 运行时，theme 的属性还没有被更新
      localStorage.setItem(`${themeConfig.app.title}-initial-loader-bg`, vuetifyTheme.current.value.colors.surface)
      localStorage.setItem(`${themeConfig.app.title}-initial-loader-color`, vuetifyTheme.current.value.colors.primary)
    }, {
      immediate: true,
    })
  }

  const skin = computed({
    get() {
      return themeConfig.app.skin.value
    },
    set(value: typeof themeConfig.app.skin.value) {
      themeConfig.app.skin.value = value
      localStorage.setItem(`${themeConfig.app.title}-skin`, value)
    },
  })

  const handleSkinChanges = () => {
    const { themes } = useTheme()

    // 创建默认皮肤颜色，在从平面线框皮肤切换到默认皮肤（立体阴影）场景时需要查找默认皮肤颜色
    Object.values(themes.value).forEach(t => {
      t.colors['skin-default-background'] = t.colors.background
      t.colors['skin-default-surface'] = t.colors.surface
    })

    watch(
      skin,
      val => {
        Object.values(themes.value).forEach(t => {
          t.colors.background = t.colors[`skin-${val}-background`]
          t.colors.surface = t.colors[`skin-${val}-surface`]
        })
      },
      { immediate: true },
    )
  }

  const appRouteTransition = computed({
    get() {
      return themeConfig.app.routeTransition.value
    },
    set(value: typeof themeConfig.app.routeTransition.value) {
      themeConfig.app.routeTransition.value = value
      localStorage.setItem(`${themeConfig.app.title}-transition`, value)
    },
  })

  const navbarType = computed({
    get() {
      return config.navbar.type.value
    },
    set(val) {
      config.navbar.type.value = val
      localStorage.setItem(`${themeConfig.app.title}-navbarType`, val.toString())
    },
  })

  const appFootType = computed({
    get() {
      return config.footer.type.value
    },
    set(val) {
      config.footer.type.value = val
      localStorage.setItem(`${themeConfig.app.title}-footerType`, val.toString())
    },
  })

  // 导出 @layouts
  const {
    isNavbarBlurEnabled,
    isVerticalNavCollapsed,
    appContentWidth,
    appContentLayoutNav,
    horizontalNavType,
    isLessThanOverlayNavBreakpoint,
    isAppRtl,
    switchToVerticalNavOnLtOverlayNavBreakpoint,
  } = useLayouts()

  // const syncRtlWithRtlLang = (rtlLangs: string[], rtlDefaultLocale: string, ltrDefaultLocale: string) => {
  // const { locale } = useI18n({ useScope: 'global' })

  // watch(isAppRtl, val => {
  //   if (val)
  //     locale.value = rtlDefaultLocale
  //   else locale.value = ltrDefaultLocale
  // })
  // watch(locale, val => {
  //   if (rtlLangs.includes(val))
  //     isAppRtl.value = true
  //   else isAppRtl.value = false
  // })

  // watch(
  //   [isAppRtl, locale],
  //   ([valIsAppRTL, valLocale], [oldValIsAppRtl, oldValLocale]) => {
  //     const isRtlUpdated = valIsAppRTL !== oldValIsAppRtl

  //     if (isRtlUpdated) {
  //       if (valIsAppRTL)
  //         locale.value = rtlDefaultLocale
  //       else locale.value = ltrDefaultLocale
  //     }
  //     else {
  //       if (rtlLangs.includes(valLocale))
  //         isAppRtl.value = true
  //       else isAppRtl.value = false
  //     }
  //   },
  // )
  // }

  return {
    theme,
    isVerticalNavSemiDark,
    syncVuetifyThemeWithTheme,
    syncInitialLoaderTheme,
    skin,
    handleSkinChanges,
    appRouteTransition,

    // 导出 @layouts
    navbarType,
    isNavbarBlurEnabled,
    appFootType,
    isVerticalNavCollapsed,
    appContentWidth,
    appContentLayoutNav,
    horizontalNavType,
    isLessThanOverlayNavBreakpoint,
    isAppRtl,
    switchToVerticalNavOnLtOverlayNavBreakpoint,

    // syncRtlWithRtlLang,
  }
}
