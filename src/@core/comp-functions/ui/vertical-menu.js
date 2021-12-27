import { onBeforeUnmount } from '@vue/composition-api'
import userAppConfig from '@core/app-config/useAppConfig'

/**
 * 垂直折叠导航访问路由时恢复离开时的状态
 */
export const useCollapseMenuOnVisit = () => {
  const { isVerticalMenuCollapsed } = userAppConfig()
  const wasVerticalMenuCollapsed = isVerticalMenuCollapsed.value

  if (!wasVerticalMenuCollapsed.value) {
    isVerticalMenuCollapsed.value = true
  }

  // 恢复折叠原始值
  onBeforeUnmount(() => {
    isVerticalMenuCollapsed.value = wasVerticalMenuCollapsed
  })
}

export const _ = null
