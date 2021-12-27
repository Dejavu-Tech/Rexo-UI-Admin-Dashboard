import router from '@/router'
import { isObject } from '@core/utils/utils'
import { computed } from '@vue/composition-api'

/**
 * 根据数据 / 上下文返回要渲染的组件
 * @param {Object} item 导航菜单项
 */
export const resolveVerticalNavMenuItemComponent = item => {
  if (item.header) return 'vertical-nav-menu-header'
  if (item.children) return 'vertical-nav-menu-group'
  return 'vertical-nav-menu-link'
}

/**
 * 根据数据 / 上下文返回要渲染的组件
 * @param {Object} item 导航菜单项
 */
export const resolveHorizontalNavMenuItemComponent = item => {
  if (item.children) return 'horizontal-nav-menu-group'
  return 'horizontal-nav-menu-link'
}

/**
 *返回导航链接的路由名称。如果链接是字符串，链接将被认为是路由名称；如果链接是对象，它将解析对象并返回链接
 * @param {Object, String} link 导航链接对象 / 字符串
 */
export const resolveNavDataRouteName = link => {
  if (isObject(link.route)) {
    const { route } = router.resolve(link.route)
    return route.name
  }
  return link.route
}

/**
 * 检查导航链接是否激活
 * @param {Object} link 导航链接对象
 */
export const isNavLinkActive = link => {
  // 当前路由的匹配路由数组
  const matchedRoutes = router.currentRoute.matched

  // 检查提供的路由名是否与路由匹配
  const resolveRoutedName = resolveNavDataRouteName(link)

  if (!resolveRoutedName) return false

  return matchedRoutes.some(route => route.name === resolveRoutedName || route.meta.navActiveLink === resolveRoutedName)
}

/**
 * 检查导航是否分组
 * @param {Array} children 分组子级数组
 */
export const isNavGroupActive = children => {
  // 检查当前路由匹配数组
  const matchedRoutes = router.currentRoute.matched

  return children.some(child => {
    // 如果子级中有子级则递归
    if (child.children) {
      return isNavGroupActive(child.children)
    }

    // 否则检查链接是否为匹配的路由
    return isNavLinkActive(child, matchedRoutes)
  })
}

/**
 * 返回使用的 b-link prop
 * @param {Object, String} item 数据中提供的导航路由名称或路由对象
 */
// prettier-ignore
export const navLinkProps = item => computed(() => {
  const props = {}

  // 如果路由为字符串,则判定用路由名称创建路由对象；如果路由不为字符串，则直接返回路由对象
  if (item.route) props.to = typeof item.route === 'string' ? { name: item.route } : item.route
  else {
    props.href = item.href
    props.target = '_blank'
    props.rel = 'nofollow'
  }

  if (!props.target) props.target = item.target || null

  return props
})
