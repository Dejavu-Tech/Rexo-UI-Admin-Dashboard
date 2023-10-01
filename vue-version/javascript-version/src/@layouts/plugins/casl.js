import ability from '@/plugins/casl/ability'

/**
 * 使用 CASL 执行权限检查和访问控制策略，并处理 ACL 配置和返回控制访问结果
 * 如果配置了 ACL，则返回 ability（用户权限），否则返回 true
 * 因为对于管理员权限，模板中省略了定义动作（action）和主体（subject），该函数允许传递字符串或 undefined 给 can 函数
 * 用于在开发中检查 ACL 是否配置
 * 亦可用于在 @core 文件中检查 ACL 不存在的情况，以避免出现错误
 * @param {String} action CASL 动作，参考：https://casl.js.org/v4/en/guide/intro#basics
 * @param {String} subject CASL 主体，参考：https://casl.js.org/v4/en/guide/intro#basics
 */
export const can = (action, subject) => {
  const vm = getCurrentInstance()
  if (!vm)
    return false
  const localCan = vm.proxy && '$can' in vm.proxy
  
  return localCan ? vm.proxy?.$can(action, subject) : true
}

/**
 * 使用 CASL 进行用户权限（ability）、动作（action）和主体（subject）确定用户模板组件权限验证
 * 基于 ability 判断检查用户是否可以查看导航栏子项（item）
 * 如果导航组（group）子项（item）被隐藏，则该组也被隐藏
 * @param {Object} item 导航栏子项
 */
export const canViewNavMenuGroup = item => {
  const hasAnyVisibleChild = item.children.some(i => can(i.action, i.subject))

  // 基于动作和主体以及子项的可见性返回是否可以查看该导航组
  // 如果项中未定义动作和主体，则返回子项是否存在可见
  if (!(item.action && item.subject))
    return hasAnyVisibleChild
  
  return can(item.action, item.subject) && hasAnyVisibleChild
}

// 使用 matched 属性获取到的路由数组，并使用 some 方法来迭代此数组以检查每个路由的 meta 中定义的动作和主体是否满足 ability
export const canNavigate = to => {
  return to.matched.some(route => ability.can(route.meta.action, route.meta.subject))
}
