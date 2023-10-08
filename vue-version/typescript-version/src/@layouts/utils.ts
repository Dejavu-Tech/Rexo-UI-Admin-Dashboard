import type { Router } from 'vue-router'
import type { NavGroup, NavLink, NavLinkProps } from '@layouts/types'

export const openGroups = ref<string[]>([])

/**
 * 返回导航链接 prop
 * @param {Object, String} item 导航路由数据中提供的名称和对象
 */
export const getComputedNavLinkToProp = computed(() => (link: NavLink) => {
  const props: NavLinkProps = {
    target: link.target,
    rel: link.rel,
  }

  // 如果路由是字符串 => 假定字符串是路由名称 => 从路由名称创建路由对象
  // 如果路由不是字符串 => 假定是路由对象 => 返回传递的路由对象
  if (link.to)
    props.to = typeof link.to === 'string' ? { name: link.to } : link.to
  else props.href = link.href

  return props
})

/**
 * 返回导航链接的路由名称
 * 如果链接是字符串将假定它是路由名称
 * 如果链接是对象将解析对象并将返回链接
 * @param {Object, String} link 导航链接 对象/字符串
 * @param router 路由名称
 */
export const resolveNavLinkRouteName = (link: NavLink, router: Router) => {
  if (!link.to)
    return null

  if (typeof link.to === 'string')
    return link.to

  return router.resolve(link.to).name
}

/**
 * 检查导航链接是否处于活动状态
 * @param {Object} link 导航链接 对象
 * @param router
 */
export const isNavLinkActive = (link: NavLink, router: Router) => {
  // 匹配当前路由的数组
  const matchedRoutes = router.currentRoute.value.matched

  // 检查当前路由和上面的路由是否匹配
  const resolveRoutedName = resolveNavLinkRouteName(link, router)

  if (!resolveRoutedName)
    return false

  return matchedRoutes.some(route => {
    return route.name === resolveRoutedName || route.meta.navActiveLink === resolveRoutedName
  })
}

/**
 * 检查导航组是否处于活动状态
 * @param {Array} children 导航组子项 数组
 * @param router
 */
export const isNavGroupActive = (children: (NavLink | NavGroup)[], router: Router): boolean =>
  children.some(child => {
    // 如果子项为组 => 递归下层
    if ('children' in child)
      return isNavGroupActive(child.children, router)

    // 或只为导航链接 => 检查匹配路由
    return isNavLinkActive(child, router)
  })

/**
 * 转换十六进制颜色为 RGB
 * @param hex 十六进制颜色
 */
export const hexToRgb = (hex: string) => {
  // 用正则将十六进制颜色简略模式（例如“03F”）扩展为完整模式（例如“0033FF”）
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i

  hex = hex.replace(shorthandRegex, (m: string, r: string, g: string, b: string) => {
    return r + r + g + g + b + b
  })

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)

  return result ? `${parseInt(result[1], 16)},${parseInt(result[2], 16)},${parseInt(result[3], 16)}` : null
}

/**
 ** 转换 RGBA 颜色为十六进制，A 表示透明度
 */
export const rgbaToHex = (rgba: string, forceRemoveAlpha = false) => {
  return (
    `#${
      rgba
        .replace(/^rgba?\(|\s+|\)$/g, '') // 获取 RGBA 字符串的值
        .split(',') // 使用逗号拆分
        .filter((string, index) => !forceRemoveAlpha || index !== 3)
        .map(string => parseFloat(string)) // 将字符串转换为数字
        .map((number, index) => (index === 3 ? Math.round(number * 255) : number)) // 将字母转换为 255 数字
        .map(number => number.toString(16)) // 将数字转换为十六进制
        .map(string => (string.length === 1 ? `0${string}` : string)) // 当一个数字的长度为 1 时前面加 0
        .join('')}`
  )
}
