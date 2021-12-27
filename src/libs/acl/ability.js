import { Ability } from '@casl/ability'
import { initialAbility } from './config'

// 从本地存储读取数据
// * 如果用户已登则自动获取以前的功能
// ? 如果将用户功能存储到其他非本地存储则可更新此功能
// ! 任何人都可以更新本地存储数据
const userData = JSON.parse(localStorage.getItem('userData'))
const existingAbility = userData ? userData.ability : null

export default new Ability(existingAbility || initialAbility)
