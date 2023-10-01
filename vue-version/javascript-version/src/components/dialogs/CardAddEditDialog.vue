<script setup>
const props = defineProps({
  cardDetails: {
    type: Object,
    required: false,
    default: () => ({
      number: '',
      name: '',
      expiry: '',
      cvv: '',
      isPrimary: false,
      type: '',
    }),
  },
  isDialogVisible: {
    type: Boolean,
    required: true,
  },
})

const emit = defineEmits([
  'submit',
  'update:isDialogVisible',
])

const cardDetails = ref(structuredClone(toRaw(props.cardDetails)))

watch(props, () => {
  cardDetails.value = structuredClone(toRaw(props.cardDetails))
})

const formSubmit = () => {
  emit('submit', cardDetails.value)
}

const dialogModelValueUpdate = val => {
  emit('update:isDialogVisible', val)
}
</script>

<template>
  <VDialog
    :width="$vuetify.display.smAndDown ? 'auto' : 580"
    :model-value="props.isDialogVisible"
    @update:model-value="dialogModelValueUpdate"
  >
    <!-- 对话框关闭按钮 -->
    <DialogCloseBtn @click="dialogModelValueUpdate(false)" />

    <VCard class="pa-5 pa-sm-8">
      <!-- 标题 -->
      <VCardItem class="text-center">
        <VCardTitle class="text-h5 font-weight-medium mb-3">
          {{ props.cardDetails.name ? '编辑信用卡' : '添加新的信用卡' }}
        </VCardTitle>
        <p class="mb-0">
          {{ props.cardDetails.name ? '编辑您的卡片详细信息' : '添加您的卡片详细信息' }}
        </p>
      </VCardItem>

      <VCardText class="pt-6">
        <VForm @submit.prevent="() => {}">
          <VRow>
            <!-- 卡号 -->
            <VCol cols="12">
              <AppTextField
                v-model="cardDetails.number"
                label="卡号"
                type="number"
              />
            </VCol>

            <!-- 持卡人姓名 -->
            <VCol
              cols="12"
              md="6"
            >
              <AppTextField
                v-model="cardDetails.name"
                label="持卡人姓名"
              />
            </VCol>

            <!-- 卡片有效期 -->
            <VCol
              cols="6"
              md="3"
            >
              <AppTextField
                v-model="cardDetails.expiry"
                label="有效期（月 / 年）"
              />
            </VCol>

            <!-- CVV -->
            <VCol
              cols="6"
              md="3"
            >
              <AppTextField
                v-model="cardDetails.cvv"
                type="number"
                label="卡背面末三位数"
              />
            </VCol>

            <!-- 设为默认卡片 -->
            <VCol cols="12">
              <VSwitch
                v-model="cardDetails.isPrimary"
                label="设为默认卡"
              />
            </VCol>

            <!-- 卡片操作 -->
            <VCol
              cols="12"
              class="text-center"
            >
              <VBtn
                class="me-3"
                type="submit"
                @click="formSubmit"
              >
                提交
              </VBtn>
              <VBtn
                color="secondary"
                variant="tonal"
                @click="$emit('update:isDialogVisible', false)"
              >
                取消
              </VBtn>
            </VCol>
          </VRow>
        </VForm>
      </VCardText>
    </VCard>
  </VDialog>
</template>
