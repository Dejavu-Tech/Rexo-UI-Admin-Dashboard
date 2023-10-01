import { Ability } from '@casl/ability'

export const initialAbility = [
  {
    action: 'read',
    subject: 'Auth',
  },
]

// 模板使用本地存储读取用户的权限信息，任何人都可以更新 localStorage
// 实际开发中应更新存储于更安全的位置如 token
const stringifiedUserAbilities = localStorage.getItem('userAbilities')
const existingAbility = stringifiedUserAbilities ? JSON.parse(stringifiedUserAbilities) : null
export default new Ability(existingAbility || initialAbility)
