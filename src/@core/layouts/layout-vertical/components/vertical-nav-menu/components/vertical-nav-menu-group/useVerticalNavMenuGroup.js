// eslint-disable-next-line object-curly-newline
import { ref, watch, inject, computed } from '@vue/composition-api'
import store from '@/store'
import { isNavGroupActive } from '@core/layouts/utils'

export default function useVerticalNavMenuGroup(item) {

  // 垂直导航折叠
  const isVerticalMenuCollapsed = computed(() => store.state.verticalMenu.isVerticalMenuCollapsed)

  watch(isVerticalMenuCollapsed, val => {
    /* eslint-disable no-use-before-define */
    // 使用定制器或链接设定垂直导航折叠后的内容布局
    if (!isMouseHovered.value) {
      if (val) isOpen.value = false
      else if (!val && isActive.value) isOpen.value = true
    }
    /* eslint-enable */
  })

  // 鼠标悬停态
  const isMouseHovered = inject('isMouseHovered')

  // 导航折叠时鼠标悬停展开垂直导航
  watch(isMouseHovered, val => {
    if (isVerticalMenuCollapsed.value) {
      // 使用`val && val && isActive.value` 在鼠标点击态时打开激活菜单，在鼠标离开态时关闭菜单
      // 如果不使用 `isActive.value` ，仅使用 `val` 也可以打开其他未激活的组或菜单
      // eslint-disable-next-line no-use-before-define
      isOpen.value = val && isActive.value
    }
  })

  // 展开分组
  const openGroups = inject('openGroups')

  // 展开分组时折叠其他已打开的组
  watch(openGroups, currentOpenGroups => {
    const clickedGroup = currentOpenGroups[currentOpenGroups.length - 1]

    // 关闭未单击的组或当前组未处于激活态
    // eslint-disable-next-line no-use-before-define
    if (clickedGroup !== item.title && !isActive.value) {
      // 如果单击的组不是当前组的子级
      // eslint-disable-next-line no-use-before-define
      if (!doesHaveChild(clickedGroup)) isOpen.value = false
    }
  })

  // 已展开组
  const isOpen = ref(false)
  watch(isOpen, val => {
    // 如果组已展开则推送到数组
    if (val) openGroups.value.push(item.title)
  })

  const updateGroupOpen = val => {
    // eslint-disable-next-line no-use-before-define
    isOpen.value = val
  }

  // 已激活组
  const isActive = ref(false)
  watch(isActive, val => {

    // 如果导航已折叠且未悬停于此（可选），则不打开组
    if (val) {
      if (!isVerticalMenuCollapsed.value) isOpen.value = val
    } else {
      isOpen.value = val
    }
  })

  const updateIsActive = () => {
    isActive.value = isNavGroupActive(item.children)
  }

  // 子级
  const doesHaveChild = title => item.children.some(child => child.title === title)

  return {
    isOpen,
    isActive,
    updateGroupOpen,
    openGroups,
    isMouseHovered,
    updateIsActive,
  }
}
