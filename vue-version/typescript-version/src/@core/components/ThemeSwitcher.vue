<script setup lang="ts">
import { useThemeConfig } from '@core/composable/useThemeConfig'
import type { ThemeSwitcherTheme } from '@layouts/types'

const props = defineProps<{
  themes: ThemeSwitcherTheme[]
}>()

const { theme } = useThemeConfig()
const { state: currentThemeName, next: getNextThemeName, index: currentThemeIndex } = useCycleList(props.themes.map(t => t.name), { initialValue: theme.value })

const changeTheme = () => {
  theme.value = getNextThemeName()
}

const themeLabels = {
  system: '跟随系统',
  light: '浅色',
  dark: '深色',
}

const currentThemeLabel = computed(() => {
  return themeLabels[currentThemeName.value]
})

// 如果主题更改来自其他来源，则更新图标
watch(theme, val => {
  currentThemeName.value = val
})
</script>

<template>
  <IconBtn @click="changeTheme">
    <VIcon
      size="26"
      :icon="props.themes[currentThemeIndex].icon"
    />
    <VTooltip
      activator="parent"
      open-delay="1000"
      scroll-strategy="close"
    >
      <span class="text-capitalize">{{ currentThemeLabel }}</span>
    </VTooltip>
  </IconBtn>
</template>
