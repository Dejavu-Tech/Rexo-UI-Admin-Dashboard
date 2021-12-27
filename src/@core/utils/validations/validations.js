import { extend, localize } from 'vee-validate'
import {
  required as rule_required,
  email as rule_email,
  min as rule_min,
  confirmed as rule_confirmed,
  regex as rule_regex,
  between as rule_between,
  alpha as rule_alpha,
  integer as rule_integer,
  digits as rule_digits,
  alpha_dash as rule_alpha_dash,
  alpha_num as rule_alpha_num,
  length as rule_length,
} from 'vee-validate/dist/rules'
import cn from 'vee-validate/dist/locale/zh_CN.json'
import ar from 'vee-validate/dist/locale/ar.json'
import en from 'vee-validate/dist/locale/en.json'

// eslint-disable-next-line object-curly-newline
import { validatorPositive, validatorUrlValidator, validatorPassword, validatorCreditCard } from './validators'

// ////////////////////////////////////////////////////////
// 通用
// ////////////////////////////////////////////////////////

export const required = extend('required', rule_required)

export const email = extend('email', rule_email)

export const min = extend('min', rule_min)

export const confirmed = extend('confirmed', rule_confirmed)

export const regex = extend('regex', rule_regex)

export const between = extend('between', rule_between)

export const alpha = extend('alpha', rule_alpha)

export const integer = extend('integer', rule_integer)

export const digits = extend('digits', rule_digits)

export const alphaDash = extend('alpha_dash', rule_alpha_dash)

export const alphaNum = extend('alpha_num', rule_alpha_num)

export const length = extend('length', rule_length)

export const positive = extend('positive', {
  validate: validatorPositive,
  message: '请输入正数!',
})

export const credit = extend('credit-card', {
  validate: validatorCreditCard,
  message: '此信用卡无效!',
})

export const password = extend('password', {
  validate: validatorPassword,
  message: '您的{_field_}必须至少包含一个大写、一个小写、一个特殊字符和一个数字！',
})

export const url = extend('url', {
  validate: validatorUrlValidator,
  message: '请填写有效网址',
})

// 安装国际化自定义验证信息
localize({
  cn: {
    messages: cn.messages,
    names: {
      username: '用户名',
      email: '邮箱',
      password: '密码',
    },
    fields: {
      password: {
        min: '{_field_}太短, 你想被黑吗？',
      },
    },
  },
  en: {
    messages: en.messages,
    names: {
      email: 'Email',
      password: 'Password',
    },
    fields: {
      password: {
        min: '{_field_} is too short, you want to get hacked?',
      },
    },
  },
  ar: {
    messages: ar.messages,
    names: {
      email: 'البريد الإلكتروني',
      password: 'كلمة السر',
    },
    fields: {
      password: {
        min: 'كلمة السر قصيرة جداً سيتم اختراقك',
      },
    },
  },
})
// ////////////////////////////////////////////////////////
// NOTE:
// Quasar validation for reference only
// Remove this note once development is finished and make sure to
// to convert all of them in veevalidate version
// ////////////////////////////////////////////////////////

// export const required = (val) => {
//   return (val && val.length > 0) || '*Field is required'
// }

// export const required_obj = (obj) => {
//   if (obj === null || obj === undefined) return '*Field is required'
//   return (Object.entries(obj).length > 0 && obj.constructor === Object) || '*Field is required'
// }

// export const no_blank_spaces_arr = (arr) => {
//   return arr.every(val => (val.trim() && val.trim().length > 0)) || 'Blank Spaces are not allowed'
// }

// export const url = val => {
//   // If blank return
//   if (val === undefined || val === null || val.length === 0) return true

//   // Used
//   // https://stackoverflow.com/questions/4314741/url-regex-validation

//   // Other
//   // https://stackoverflow.com/questions/5717093/check-if-a-javascript-string-is-a-url
//   // https://www.w3resource.com/javascript-exercises/javascript-regexp-exercise-9.php
//   // https://www.geeksforgeeks.org/how-to-validate-url-using-regular-expression-in-javascript/

//   /* eslint-disable no-useless-escape */
//   const re = /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/
//   /* eslint-enable no-useless-escape */
//   return re.test(val) || 'URL is invalid'
// }

// export const date = val => {

//   // If blank return
//   if (val === undefined || val === null || val.length === 0) return true

//   // https://github.com/quasarframework/quasar/blob/dev/ui/src/utils/patterns.js
//   return /^-?[\d]+\/[0-1]\d\/[0-3]\d$/.test(val) || 'Date is invalid'
// }

// export const max = (val, max) => {

//   // If blank return
//   if (val === undefined || val === null) return true

//   return val.length <= max || `More than ${max} characters are not allowed`
// }

// export const max_arr = (val, max) => {
//   return val.length <= max || `More than ${max} values are not allowed`
// }

// export const min = (val, min) => {

//   // If blank return
//   if (val === undefined || val === null || val.length === 0) return true

//   return val.length >= min || `Minimum ${min} characters are required`
// }

// export const num_range = (val, min, max) => {

//   // If blank return
//   if (val === undefined || val === null || val.length === 0) return true

//   const msg = 'Value is invalid'
//   if (min === null) return val <= max || msg
//   else if (max === null) return val >= min || msg
//   else return (val >= min && val <= max) || msg
// }
