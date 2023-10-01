// 为空
export const isEmpty = value => {
  if (value === null || value === undefined || value === '')
    return true
  
  return !!(Array.isArray(value) && value.length === 0)
}

// 为 Null 或 Undefined
export const isNullOrUndefined = value => {
  return value === null || value === undefined
}

// 为空数组
export const isEmptyArray = arr => {
  return Array.isArray(arr) && arr.length === 0
}

// 为对象
export const isObject = obj => obj !== null && !!obj && typeof obj === 'object' && !Array.isArray(obj)
export const isToday = date => {
  const today = new Date()
  
  return (
    /* eslint-disable operator-linebreak */
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
    /* eslint-enable */
  )
}
