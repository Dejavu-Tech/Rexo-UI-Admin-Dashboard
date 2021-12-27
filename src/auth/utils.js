import useJwt from '@/auth/jwt/useJwt'

/**
 *如果用户已登录，则返回
 *取决于如何在前端应用中存储 token
 *如果使用 cookies 存储，请更新或重写此功能
 */
// eslint-disable-next-line
export const isUserLoggedIn = () => {
  return localStorage.getItem('userData') && localStorage.getItem(useJwt.jwtConfig.storageTokenKeyName)
}

export const getUserData = () => JSON.parse(localStorage.getItem('userData'))

/**
 * 此功能用于仅用于 DEMO 的导航路由检查角色权限，角色登录后仅用于显示，前端中的其他所有内容都未使用
 * 在实例开发中建议删除或重写此功能，因为此功能只检查不同用户角色的'导航'权限
 * @param{String}userRole 用户角色
 */
export const getHomeRouteForLoggedInUser = userRole => {
  if (userRole === '管理员') return '/'
  if (userRole === '客户') return { name: 'access-control' }
  return { name: 'auth-login' }
}
