import { useTheme } from 'vuetify'

// 返回与当前主题和全局皮肤相对应的图像变量的 composable 函数
export const useGenerateImageVariant = (imgLight, imgDark) => {
  const { global } = useTheme()

  return computed(() => {
    return global.name.value === 'light' ? imgLight : imgDark
  })
}
