<script setup>
import {
  injectionKeyIsVerticalNavHovered,
  useLayouts,
} from '@layouts'
import {
  TransitionExpand,
  VerticalNavLink,
} from '@layouts/components'
import { config } from '@layouts/config'
import { canViewNavMenuGroup } from '@layouts/plugins/casl'
import {
  isNavGroupActive,
  openGroups,
} from '@layouts/utils'

const props = defineProps({
  item: {
    type: null,
    required: true,
  },
})

defineOptions({ name: 'VerticalNavGroup' })

const route = useRoute()
const router = useRouter()
const { width: windowWidth } = useWindowSize()
const { isVerticalNavMini, dynamicI18nProps } = useLayouts()
const hideTitleAndBadge = isVerticalNavMini(windowWidth)
const isVerticalNavHovered = inject(injectionKeyIsVerticalNavHovered, ref(false))
const isGroupActive = ref(false)
const isGroupOpen = ref(false)

const isAnyChildOpen = children => {
  return children.some(child => {
    let result = openGroups.value.includes(child.title)
    if ('children' in child)
      result = isAnyChildOpen(child.children) || result
    
    return result
  })
}

const collapseChildren = children => {
  children.forEach(child => {
    if ('children' in child)
      collapseChildren(child.children)
    openGroups.value = openGroups.value.filter(group => group !== child.title)
  })
}

watch(() => route.path, () => {
  const isActive = isNavGroupActive(props.item.children, router)

  // 如果导航组处于活动状态，并且垂直导航栏处于展开状态且视口超过覆盖导航的阈值，则不打开导航组
  isGroupOpen.value = isActive && !isVerticalNavMini(windowWidth, isVerticalNavHovered).value
  isGroupActive.value = isActive
}, { immediate: true })

watch(isGroupOpen, val => {
  // 查找导航组索引以从 openGroups 数组添加/删除导航组
  const grpIndex = openGroups.value.indexOf(props.item.title)

  // 如果导航组展开且当前组未在 openGroups.value 中，则将当前组的标题添加到 openGroups 数组中
  if (val && grpIndex === -1) {
    openGroups.value.push(props.item.title)
  } else if (!val && grpIndex !== -1) {
    openGroups.value.splice(grpIndex, 1)
    collapseChildren(props.item.children)
  }
}, { immediate: true })
watch(openGroups, val => {

  // 阻止关闭最近打开的非活动导航组
  const lastOpenedGroup = val.at(-1)
  if (lastOpenedGroup === props.item.title)
    return
  const isActive = isNavGroupActive(props.item.children, router)

  // 关闭非活动导航组
  if (isActive)
    return

  // 如果当前导航组中的子组处于打开状态，则不关闭该导航组
  if (isAnyChildOpen(props.item.children))
    return
  isGroupOpen.value = isActive
  isGroupActive.value = isActive
}, { deep: true })

// 代替之前使用的两个单独的分别用于 isVerticalNavHovered、isVerticalNavCollapsed 和 isLessThanOverlayNavBreakpoint 的 watch
watch(isVerticalNavMini(windowWidth, isVerticalNavHovered), val => {
  isGroupOpen.value = val ? false : isGroupActive.value
})
</script>

<template>
  <li
    v-if="canViewNavMenuGroup(item)"
    class="nav-group"
    :class="[
      {
        active: isGroupActive,
        open: isGroupOpen,
        disabled: item.disable,
      },
    ]"
  >
    <div
      class="nav-group-label"
      @click="isGroupOpen = !isGroupOpen"
    >
      <Component
        :is="config.app.iconRenderer || 'div'"
        v-bind="item.icon || config.verticalNav.defaultNavItemIconProps"
        class="nav-item-icon"
      />
      <TransitionGroup name="transition-slide-x">
        <!-- 导航组标题 -->
        <Component
          :is=" config.app.enableI18n ? 'i18n-t' : 'span'"
          v-bind="dynamicI18nProps(item.title, 'span')"
          v-show="!hideTitleAndBadge"
          key="title"
          class="nav-item-title"
        >
          {{ item.title }}
        </Component>

        <!-- 导航组徽章 -->
        <Component
          :is="config.app.enableI18n ? 'i18n-t' : 'span'"
          v-bind="dynamicI18nProps(item.badgeContent, 'span')"
          v-show="!hideTitleAndBadge"
          v-if="item.badgeContent"
          key="badge"
          class="nav-item-badge"
          :class="item.badgeClass"
        >
          {{ item.badgeContent }}
        </Component>
        <Component
          :is="config.app.iconRenderer || 'div'"
          v-show="!hideTitleAndBadge"
          v-bind="config.icons.chevronRight"
          key="arrow"
          class="nav-group-arrow"
        />
      </TransitionGroup>
    </div>
    <TransitionExpand>
      <ul
        v-show="isGroupOpen"
        class="nav-group-children"
      >
        <Component
          :is="'children' in child ? 'VerticalNavGroup' : VerticalNavLink"
          v-for="child in item.children"
          :key="child.title"
          :item="child"
        />
      </ul>
    </TransitionExpand>
  </li>
</template>

<style lang="scss">
.layout-vertical-nav {
  .nav-group {
    &-label {
      display: flex;
      align-items: center;
      cursor: pointer;
    }
  }
}
</style>
