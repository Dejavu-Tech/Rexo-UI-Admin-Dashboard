import { isToday } from './index'

export const avatarText = value => {
  if (!value)
    return ''
  const nameArray = value.split(' ')
  
  return nameArray.map(word => word.charAt(0).toUpperCase()).join('')
}

export const kFormatter = num => {
  const regex = /\B(?=(\d{3})+(?!\d))/g
  
  return Math.abs(num) > 9999 ? `${Math.sign(num) * +((Math.abs(num) / 1000).toFixed(1))}k` : Math.abs(num).toFixed(0).replace(regex, ',')
}

/**
 * 根据语言格式化日期和时间
 * MDN 国际化 Intl 文档:: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/format
 * 国际化构造器: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat
 * @param {String} value 格式化日期
 * @param {Intl.DateTimeFormatOptions} formatting 要格式化的 Intl 对象
 */
export const formatDate = (value, formatting = { month: 'short', day: 'numeric', year: 'numeric' }) => {
  if (!value)
    return value
  
  return new Intl.DateTimeFormat('zh-CN', formatting).format(new Date(value))
}

/**
 * 返回日期的简短格式以方便阅读习惯
 * 如果日期是今天 / 当前，可以将日期转换为仅时间格式
 * @param {String} value 格式化日期
 * @param {Boolean} toTimeForCurrentDay 应转换为时间（如果日期为今天/当前）
 */
export const formatDateToMonthShort = (value, toTimeForCurrentDay = true) => {
  const date = new Date(value)
  let formatting = { month: 'short', day: 'numeric' }
  if (toTimeForCurrentDay && isToday(date))
    formatting = { hour: 'numeric', minute: 'numeric' }
  
  return new Intl.DateTimeFormat('zh-CN', formatting).format(new Date(value))
}
export const prefixWithPlus = value => value > 0 ? `+${value}` : value
