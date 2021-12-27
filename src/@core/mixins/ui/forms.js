// 本模板 UI 整合于混入中，因此未添加图标的 computed 属性
export const togglePasswordVisibility = {
  data() {
    return {
      passwordFieldType: 'password',
    }
  },
  methods: {
    togglePasswordVisibility() {
      this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password'
    },
  },
}

export const _ = null
