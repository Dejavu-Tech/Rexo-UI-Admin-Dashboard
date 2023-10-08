<script setup lang="ts">
import type { I18nLanguage } from '@layouts/types'

const props = withDefaults(defineProps<Props>(), {
  location: 'bottom end',
})

defineEmits<{
  (e: 'change', id: string): void
}>()

interface Props {
  languages: I18nLanguage[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  location?: any
}

const { locale } = useI18n({ useScope: 'global' })

watch(locale, val => {
  document.documentElement.setAttribute('lang', val as string)
})

const currentLang = ref(['cn'])
</script>

<template>
  <IconBtn>
    <VIcon
      size="26"
      icon="ion-language-outline"
    />

    <!-- 菜单栏 -->
    <VMenu
      activator="parent"
      :location="props.location"
      offset="14px"
    >
      <!-- 列表 -->
      <VList
        v-model:selected="currentLang"
        min-width="175px"
      >
        <!-- 列表项 -->
        <VListItem
          v-for="lang in props.languages"
          :key="lang.i18nLang"
          :value="lang.i18nLang"
          @click="locale = lang.i18nLang; $emit('change', lang.i18nLang)"
        >
          <!-- 语言标签 -->
          <VListItemTitle>{{ lang.label }}</VListItemTitle>
        </VListItem>
      </VList>
    </VMenu>
  </IconBtn>
</template>
