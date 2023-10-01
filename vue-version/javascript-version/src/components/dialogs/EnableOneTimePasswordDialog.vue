<script setup>
const props = defineProps({
  mobileNumber: {
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

const phoneNumber = ref(structuredClone(toRaw(props.mobileNumber)))

const formSubmit = () => {
  if (phoneNumber.value) {
    emit('submit', phoneNumber.value)
    emit('update:isDialogVisible', false)
  }
}

const resetPhoneNumber = () => {
  phoneNumber.value = structuredClone(toRaw(props.mobileNumber))
  emit('update:isDialogVisible', false)
}

const dialogModelValueUpdate = val => {
  emit('update:isDialogVisible', val)
}
</script>

<template>
  <VDialog
    max-width="787"
    :model-value="props.isDialogVisible"
    @update:model-value="dialogModelValueUpdate"
  >
    <!-- 对话框关闭按钮 -->
    <DialogCloseBtn @click="dialogModelValueUpdate(false)" />

    <VCard class="pa-5 pa-sm-8">
      <VCardItem class="text-start">
        <VCardTitle class="text-h6 font-weight-medium mb-2">
          短信验证码验证
        </VCardTitle>
        <VCardSubtitle>
          <span class="text-base">
            请输入手机号码，我们将向您发送一条验证码短信
          </span>
        </VCardSubtitle>
      </VCardItem>

      <VCardText class="pt-6">
        <VForm @submit.prevent="() => {}">
          <AppTextField
            v-model="phoneNumber"
            name="mobile"
            label="电话"
            type="number"
            placeholder="189 8728 6909"
            class="mb-5"
          />

          <div class="d-flex flex-wrap justify-end gap-4">
            <VBtn
              color="secondary"
              variant="tonal"
              @click="resetPhoneNumber"
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
