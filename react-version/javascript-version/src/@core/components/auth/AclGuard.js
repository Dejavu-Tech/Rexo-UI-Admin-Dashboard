// 导入 React
import { useEffect } from 'react'

// 导入 Next
import { useRouter } from 'next/router'

// 导入上下文
import { AbilityContext } from 'src/layouts/components/acl/Can'

// 导入配置
import { buildAbilityFor } from 'src/configs/acl'

// 导入自定义组件
import NotAuthorized from 'src/pages/401'
import Spinner from 'src/@core/components/spinner'
import BlankLayout from 'src/@core/layouts/BlankLayout'

// 导入 Hook
import { useAuth } from 'src/hooks/useAuth'

// 导入工具函数
import getHomeRoute from 'src/layouts/components/acl/getHomeRoute'

const AclGuard = props => {
  // Props
  const { aclAbilities, children, guestGuard = false, authGuard = true } = props

  // Hook
  const auth = useAuth()
  const router = useRouter()

  // 变量
  let ability
  useEffect(() => {
    if (auth.user && auth.user.role && !guestGuard && router.route === '/') {
      const homeRoute = getHomeRoute(auth.user.role)
      router.replace(homeRoute)
    }
  }, [auth.user, guestGuard, router])

  // 用户登录后根据用户角色为其构建权限
  if (auth.user && !ability) {
    ability = buildAbilityFor(auth.user.role, aclAbilities.subject)
    if (router.route === '/') {
      return <Spinner />
    }
  }

  // 如果当前页面是未登录用户守卫页，或未设置守卫，或为任何错误页面
  if (guestGuard || router.route === '/404' || router.route === '/500' || !authGuard) {
    // 如果用户已登录并且获取权限
    if (auth.user && ability) {
      return <AbilityContext.Provider value={ability}>{children}</AbilityContext.Provider>
    } else {
      // 如果用户未登录，则渲染特定页面例如登录页、注册页等
      return <>{children}</>
    }
  }

  // 检查当前用户的访问权限并渲染页面
  if (ability && auth.user && ability.can(aclAbilities.action, aclAbilities.subject)) {
    if (router.route === '/') {
      return <Spinner />
    }

    return <AbilityContext.Provider value={ability}>{children}</AbilityContext.Provider>
  }

  // 如果当前用户的访问权限受限，则渲染未授权的组件
  return (
    <BlankLayout>
      <NotAuthorized />
    </BlankLayout>
  )
}

export default AclGuard
