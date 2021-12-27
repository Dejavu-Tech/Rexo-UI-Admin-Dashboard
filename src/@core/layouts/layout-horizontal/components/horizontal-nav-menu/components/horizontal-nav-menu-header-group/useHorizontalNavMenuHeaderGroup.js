import { ref } from '@vue/composition-api'
import { isNavGroupActive } from '@core/layouts/utils'

export default function useHorizontalNavMenuHeaderGroup(item) {
  // 展开
  const isOpen = ref(false)

  const updateGroupOpen = val => {
    // eslint-disable-next-line no-use-before-define
    isOpen.value = val
  }

  // 激活态
  const isActive = ref(false)

  const updateIsActive = () => {
    isActive.value = isNavGroupActive(item.children)
  }

  return {
    isOpen,
    isActive,
    updateGroupOpen,
    updateIsActive,
  }
}
