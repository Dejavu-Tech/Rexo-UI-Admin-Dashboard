import { getCurrentInstance } from '@vue/composition-api'

/**
 * 如果配置了 ACL，则返回结果，否则返回 true
 * 在 @core 文件中使用以处理没有 ACL 的情况而不会出错
 * @param {String} action CASL 用户权限管理功能
 * @param {String} subject CASL 用户权限管理对象
 */
export const can = (action, subject) => {
  const vm = getCurrentInstance().proxy
  return vm.$can ? vm.$can(action, subject) : true
}

/**
 * 检查用户是否根据根据其能力查看此项
 * @param {Object} item 导航对象项
 */
export const canViewVerticalNavMenuLink = item => can(item.action, item.resource)

/**
 * 基于项目资源和隐藏组（其所有子项都隐藏），检查用户是否根据根据其能力查看此项
 * @param {Object} item 导航对象项
 */
// eslint-disable-next-line arrow-body-style
export const canViewVerticalNavMenuGroup = item => {
  // 在 canViewHorizontalNavMenuGroup 和 canViewHorizontalNavMenuHeaderGroup 中使用和更新相同的逻辑。
  const hasAnyVisibleChild = item.children.some(i => can(i.action, i.resource))

  // 如果在项目返回中定义了资源和操作，则返回子项的可见性（如果没有子项可见，则隐藏组）。否则将使用提供的资源和操作检查能力，同时检查是否有任何可见的子项
  if (!(item.action && item.resource)) {
    return hasAnyVisibleChild
  }
  return can(item.action, item.resource) && hasAnyVisibleChild
}

/**
 * 检查用户是否根据根据其能力查看此项
 * @param {Object} item 导航对象项
 */
export const canViewVerticalNavMenuHeader = item => can(item.action, item.resource)

/**
 * 检查用户是否根据根据其能力查看此项
 * @param {Object} item 导航对象项
 */
export const canViewHorizontalNavMenuLink = item => can(item.action, item.resource)

/**
 * 检查用户是否根据根据其能力查看此项
 * @param {Object} item 导航对象项
 */
export const canViewHorizontalNavMenuHeaderLink = item => can(item.action, item.resource)

/**
 * 基于项目资源和隐藏组（其所有子项都隐藏），检查用户是否根据根据其能力查看此项
 * @param {Object} item 导航对象项
 */
// eslint-disable-next-line arrow-body-style
export const canViewHorizontalNavMenuGroup = item => {
  // 与 canViewVerticalNavMenuGroup 的逻辑相同
  const hasAnyVisibleChild = item.children.some(i => can(i.action, i.resource))

  // 如果在项目返回中定义了资源和操作，则返回子项的可见性（如果没有子项可见，则隐藏组）。否则将使用提供的资源和操作检查能力，同时检查是否有任何可见的子项
  if (!(item.action && item.resource)) {
    return hasAnyVisibleChild
  }
  return can(item.action, item.resource) && hasAnyVisibleChild
}

// eslint-disable-next-line arrow-body-style
export const canViewHorizontalNavMenuHeaderGroup = item => {
  // 与 canViewVerticalNavMenuGroup 的逻辑相同，注意添加了其他内容
  // eslint-disable-next-line arrow-body-style
  const hasAnyVisibleChild = item.children.some(grpOrItem => {
    // 组中必有子级，基于组 / 链接调用 ACL
    return grpOrItem.children ? canViewHorizontalNavMenuGroup(grpOrItem) : canViewHorizontalNavMenuLink(grpOrItem)
  })

  // 如果在项目返回中定义了资源和操作，则返回子项的可见性（如果没有子项可见，则隐藏组）。否则将使用提供的资源和操作检查能力，同时检查是否有任何可见的子项
  if (!(item.action && item.resource)) {
    return hasAnyVisibleChild
  }
  return can(item.action, item.resource) && hasAnyVisibleChild
}
