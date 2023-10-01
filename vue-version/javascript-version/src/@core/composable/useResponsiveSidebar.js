import { useDisplay } from 'vuetify'

export const useResponsiveLeftSidebar = (mobileBreakpoint = undefined) => {
  const { mdAndDown, name: currentBreakpoint } = useDisplay()
  const _mobileBreakpoint = mobileBreakpoint || mdAndDown
  const isLeftSidebarOpen = ref(true)

  const setInitialValue = () => {
    isLeftSidebarOpen.value = !_mobileBreakpoint.value
  }

  // 设置侧边栏初始值
  setInitialValue()
  watch(currentBreakpoint, () => {
    // 重置左侧边栏
    isLeftSidebarOpen.value = !_mobileBreakpoint.value
  })
  
  return {
    isLeftSidebarOpen,
  }
}
