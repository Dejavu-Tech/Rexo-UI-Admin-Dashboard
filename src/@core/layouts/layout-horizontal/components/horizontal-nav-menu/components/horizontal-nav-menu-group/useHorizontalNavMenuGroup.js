// eslint-disable-next-line object-curly-newline
import { ref, nextTick } from '@vue/composition-api'
// import store from '@/store'
import { isNavGroupActive } from '@core/layouts/utils'

export default function useHorizontalNavMenuGroup(item) {

  // 下拉子项
  const refChildDropdown = ref(null)
  const openChildDropdownOnLeft = ref(false)

  // 激活态
  const isOpen = ref(false)

  const updateGroupOpen = val => {
    isOpen.value = val
    if (val) {
      nextTick(() => {
        const childDropdownWidth = refChildDropdown.value.offsetWidth
        const windowContentWidth = window.innerWidth - 16
        const { left: childDropdownLeft } = refChildDropdown.value.getBoundingClientRect()
        const shallDropLeft = childDropdownLeft + childDropdownWidth - windowContentWidth
        openChildDropdownOnLeft.value = shallDropLeft > 0

        // 如果空间不够时在下拉列表添加滚动条
        const refChildDropdownTop = refChildDropdown.value.getBoundingClientRect().top
        const refChildDropdownHeight = refChildDropdown.value.getBoundingClientRect().height
        if (window.innerHeight - refChildDropdownTop - refChildDropdownHeight - 28 < 1) {
          const maxHeight = window.innerHeight - refChildDropdownTop - 70
          refChildDropdown.value.style.maxHeight = `${maxHeight}px`
          refChildDropdown.value.style.overflowY = 'auto'
          refChildDropdown.value.style.overflowX = 'hidden'
        }
      })
    } else {
      openChildDropdownOnLeft.value = false
    }
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
    refChildDropdown,
    openChildDropdownOnLeft,
  }
}
