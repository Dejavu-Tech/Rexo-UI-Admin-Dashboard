import { isToday } from './utils'

export const kFormatter = num => (num > 999 ? `${(num / 1000).toFixed(1)}k` : num)

export const title = (value, replacer = ' ') => {
  if (!value) return ''
  const str = value.toString()

  const arr = str.split(replacer)
  const capitalizedArray = []
  arr.forEach(word => {
    const capitalized = word.charAt(0).toUpperCase() + word.slice(1)
    capitalizedArray.push(capitalized)
  })
  return capitalizedArray.join(' ')
}

export const avatarText = value => {
  if (!value) return ''
  const nameArray = value.split(' ')
  return nameArray.map(word => word.charAt(0).toUpperCase()).join('')
}

/**
 * 根据语言格式化日期和时间
 * 国际化构造器文档: https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat
 * @param {String} value 格式化日期
 * @param {Object} formatting 要格式化的 Intl （国际化）对象
 */
export const formatDate = (value, formatting = { month: 'short', day: 'numeric', year: 'numeric' }) => {
  if (!value) return value
  return new Intl.DateTimeFormat('zh-CN', formatting).format(new Date(value))
}

/**
 * 返回日期的简短人性化月份表示法
 * 如果日期是今天也可将日期转换为唯一时间
 * @param {String} value 格式化日期
 * @param {Boolean} toTimeForCurrentDay 应转换为时间（如果日期为今天/当前）
 */
export const formatDateToMonthShort = (value, toTimeForCurrentDay = true) => {
  const date = new Date(value)
  let formatting = { month: 'short', day: 'numeric' }

  if (toTimeForCurrentDay && isToday(date)) {
    formatting = { hour: 'numeric', minute: 'numeric' }
  }

  return new Intl.DateTimeFormat('zh-CN', formatting).format(new Date(value))
}

// 删除所有过滤标签并返回纯文本
export const filterTags = value => value.replace(/<\/?[^>]+(>|$)/g, '')
