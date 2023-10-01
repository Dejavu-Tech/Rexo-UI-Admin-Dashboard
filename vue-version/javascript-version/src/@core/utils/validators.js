import { isEmpty, isEmptyArray, isNullOrUndefined } from './index'

// 必要验证
export const requiredValidator = value => {
  if (isNullOrUndefined(value) || isEmptyArray(value) || value === false)
    return '必须填写此字段'
  
  return !!String(value).trim().length || '必须填写此字段'
}

// 电子邮件验证
export const emailValidator = value => {
  if (isEmpty(value))
    return true
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  if (Array.isArray(value))
    return value.every(val => re.test(String(val))) || '请输入有效的电子邮件账号'
  
  return re.test(String(value)) || '请输入有效的电子邮件账号'
}

// 密码验证
export const passwordValidator = password => {
  const regExp = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%&*()]).{8,}/
  const validPassword = regExp.test(password)
  
  return (
    // eslint-disable-next-line operator-linebreak
    validPassword ||
        '密码最少为8位，并至少包含一个大写、小写、特殊字符和数字')
}

// 确认密码验证
export const confirmedValidator = (value, target) => value === target || '输入的确认密码与重置密码不一致'

// 位数验证
export const betweenValidator = (value, min, max) => {
  const valueAsNumber = Number(value)
  
  return (Number(min) <= valueAsNumber && Number(max) >= valueAsNumber) || `请输入 ${min} - ${max} 位的数字`
}

// 整数验证
export const integerValidator = value => {
  if (isEmpty(value))
    return true
  if (Array.isArray(value))
    return value.every(val => /^-?[0-9]+$/.test(String(val))) || '必须只填写整数'
  
  return /^-?[0-9]+$/.test(String(value)) || '必须只填写整数'
}

// 正则验证
export const regexValidator = (value, regex) => {
  if (isEmpty(value))
    return true
  let regeX = regex
  if (typeof regeX === 'string')
    regeX = new RegExp(regeX)
  if (Array.isArray(value))
    return value.every(val => regexValidator(val, regeX))
  
  return regeX.test(String(value)) || '必须输入匹配正则表达式的字符'
}

// 字母验证
export const alphaValidator = value => {
  if (isEmpty(value))
    return true
  
  return /^[A-Z]*$/i.test(String(value)) || '必须只填写英文字母'
}

// URL 验证
export const urlValidator = value => {
  if (isEmpty(value))
    return true
  const re = /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/
  
  return re.test(String(value)) || 'URL 格式错误'
}

// 长度验证
export const lengthValidator = (value, length) => {
  if (isEmpty(value))
    return true
  
  return String(value).length >= length || `请输入至少 ${length} 个字符`
}

// Alpha-dash 验证器
export const alphaDashValidator = value => {
  if (isEmpty(value))
    return true
  const valueAsString = String(value)
  
  return /^[0-9A-Z_-]*$/i.test(valueAsString) || '输入的字符无效'
}
