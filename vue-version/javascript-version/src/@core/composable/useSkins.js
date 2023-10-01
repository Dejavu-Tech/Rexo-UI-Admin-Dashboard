import { VThemeProvider } from 'vuetify/components/VThemeProvider'
import { AppContentLayoutNav } from '@layouts/enums'

// TODO: 使用 Dist 中的 vThemeProvider 替代 lib 中的版本（ Lib 中的组件会导致导航条粘性定位失效）
import { useThemeConfig } from '@core/composable/useThemeConfig'

export const useSkins = () => {
  const { isVerticalNavSemiDark, skin, appContentLayoutNav } = useThemeConfig()

  const layoutAttrs = computed(() => ({
    verticalNavAttrs: {
      wrapper: h(VThemeProvider, { tag: 'aside' }),
      wrapperProps: {
        withBackground: true,
        theme: (isVerticalNavSemiDark.value && appContentLayoutNav.value === AppContentLayoutNav['垂直导航栏'])
          ? 'dark'
          : undefined,
      },
    },
  }))

  const injectSkinClasses = () => {
    const bodyClasses = document.body.classList
    const genSkinClass = _skin => `skin--${_skin}`

    watch(skin, (val, oldVal) => {
      bodyClasses.remove(genSkinClass(oldVal))
      bodyClasses.add(genSkinClass(val))
    }, { immediate: true })
  }

  return {
    injectSkinClasses,
    layoutAttrs,
  }
}
