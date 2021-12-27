import { ref, computed } from '@vue/composition-api'
import store from '@/store'

export default function useVerticalNavMenu(props) {

  // 垂直导航折叠
  const isVerticalMenuCollapsed = computed({
    get: () => store.state.verticalMenu.isVerticalMenuCollapsed,
    set: val => {
      store.commit('verticalMenu/UPDATE_VERTICAL_MENU_COLLAPSED', val)
    },
  })

  // 导航折叠图标按钮
  const collapseTogglerIcon = computed(() => {
    if (props.isVerticalMenuActive) {
      return isVerticalMenuCollapsed.value ? 'unpinned' : 'pinned'
    }
    return 'close'
  })

  const isMouseHovered = ref(false)

  const updateMouseHovered = val => {
    isMouseHovered.value = val
  }

  const toggleCollapsed = () => {
    isVerticalMenuCollapsed.value = !isVerticalMenuCollapsed.value
  }

  return {
    isMouseHovered,
    isVerticalMenuCollapsed,
    collapseTogglerIcon,
    toggleCollapsed,
    updateMouseHovered,
  }
}
