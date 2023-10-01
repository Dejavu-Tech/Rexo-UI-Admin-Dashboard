<script setup>
import themeselectionQr from '@images/pages/rexoui-qr.png'

const props = defineProps({
  authCode: {
    type: String,
    required: false,
  },
  isDialogVisible: {
    type: Boolean,
    required: true,
  },
})

const emit = defineEmits([
  'update:isDialogVisible',
  'submit',
])

const authCode = ref(structuredClone(toRaw(props.authCode)))

const formSubmit = () => {
  if (authCode.value) {
    emit('submit', authCode.value)
    emit('update:isDialogVisible', false)
  }
}

const resetAuthCode = () => {
  authCode.value = structuredClone(toRaw(props.authCode))
  emit('update:isDialogVisible', false)
}
</script>

<template>
  <VDialog
    max-width="787"
    :model-value="props.isDialogVisible"
    @update:model-value="(val) => $emit('update:isDialogVisible', val)"
  >
    <!-- 对话框关闭按钮 -->
    <DialogCloseBtn @click="$emit('update:isDialogVisible', false)" />

    <VCard class="pa-5 pa-sm-8">
      <VCardItem>
        <VCardTitle class="text-h5 font-weight-medium text-center">
          添加身份验证应用
        </VCardTitle>
      </VCardItem>

      <VCardText class="pt-3">
        <h6 class="text-lg font-weight-medium mb-2">
          身份验证应用
        </h6>

        <p class="mb-6">
          使用像 Google Authenticator、Microsoft Authenticator、Authy 或 1Password 这样的身份验证应用来扫描下方二维码。应用会生成一个 6 位数的代码供您在下方输入
        </p>

        <div class="mb-4">
          <VImg
            width="122"
            :src="themeselectionQr"
            class="mx-auto"
          />
        </div>

        <VAlert
          color="light-warning"
          class="text-warning"
        >
          <span class="text-lg font-weight-medium">DSFGFVVH456GF3DFGS8JHKGY3DFFG</span>
          <p class="mb-0">
            如果您无法扫描二维码，您可以在应用中手动输入上方的密钥
          </p>
        </VAlert>
        <VForm @submit.prevent="() => {}">
          <AppTextField
            v-model="authCode"
            name="auth-code"
            label="请输入验证码"
            class="my-4"
          />

          <div class="d-flex justify-end flex-wrap gap-3">
            <VBtn
              color="secondary"
              variant="tonal"
              @click="resetAuthCode"
            >
              取消
            </VBtn>

            <VBtn
              type="submit"
              @click="formSubmit"
            >
              下一步
              <VIcon
                end
                icon="tabler-arrow-right"
                class="flip-in-rtl"
              />
            </VBtn>
          </div>
        </VForm>
      </VCardText>
    </VCard>
  </VDialog>
</template>
