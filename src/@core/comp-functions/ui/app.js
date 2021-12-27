import store from '@/store'
import { ref, watch, computed } from '@vue/composition-api'

export const useResponsiveAppLeftSidebarVisibility = () => {
  const mqShallShowLeftSidebar = ref(false)
  // 进入非移动端时关闭活动侧栏和其他内容
  const currentBreakPoint = computed(() => store.getters['app/currentBreakPoint'])
  watch(currentBreakPoint, (val, oldVal) => {
    // 重置聊天和联系人左侧边栏
    if (oldVal === 'md' && val === 'lg') mqShallShowLeftSidebar.value = false
  })

  return {
    mqShallShowLeftSidebar,
  }
}

export const _ = {}
