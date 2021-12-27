import { ref, nextTick } from '@vue/composition-api'

// ===========================================================
// 结合使用 veeValidate 插件
// ===========================================================

export default function formValidation(resetFormData, clearFormData = () => {}) {

  // 表单验证 Observer
  const refFormObserver = ref(null)

  // 表单重置 Observer
  const resetObserver = () => {
    refFormObserver.value.reset()
  }

  // 根据验证返回 true/false
  // eslint-disable-next-line object-curly-newline
  const getValidationState = ({ dirty, validated, required: fieldRequired, changed, valid = null }) => {
    const result = dirty || validated ? valid : null
    return !fieldRequired && !changed ? null : result
  }

  // 使用 resetFormData 参数重置表单数据
  const resetForm = () => {
    resetFormData()
    nextTick(() => {
      resetObserver()
    })
  }

  // 使用 resetFormData 参数重置表单数据
  const clearForm = () => {
    clearFormData()
    nextTick(() => {
      resetObserver()
    })
  }

  return {
    refFormObserver,
    resetObserver,
    getValidationState,
    resetForm,
    clearForm,
  }
}
