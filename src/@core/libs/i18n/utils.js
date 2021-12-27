import { getCurrentInstance } from '@vue/composition-api'

/**
 * 如果 Vue 可以使用 i18n，则返回已翻译的字符串
 * 如果没有配置 i18n，则返回正在传递的简单内容
 * 在 @core 文件中不会因为 i18n 缺失而导致错误
 * @param {String} key 用于翻译的 i18n key
 */
export const t = key => {
  const vm = getCurrentInstance().proxy
  return vm.$t ? vm.$t(key) : key
}

export const _ = null
