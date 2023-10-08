<script setup lang="ts">
interface BillingAddress {
  companyName: string
  billingEmail: string
  ID: string
  vatNumber: string
  address: string
  contact: string
  country: string | null
  state: string
  zipCode: number | null
}
interface Props {
  billingAddress?: BillingAddress
  isDialogVisible: boolean
}
interface Emit {
  (e: 'update:isDialogVisible', value: boolean): void
  (e: 'submit', value: BillingAddress): void
}

const props = withDefaults(defineProps<Props>(), {
  billingAddress: () => ({
    companyName: '',
    billingEmail: '',
    ID: '',
    vatNumber: '',
    address: '',
    contact: '',
    country: null,
    state: '',
    zipCode: null,
  }),
})

const emit = defineEmits<Emit>()

const billingAddress = ref<BillingAddress>(structuredClone(toRaw(props.billingAddress)))

const resetForm = () => {
  emit('update:isDialogVisible', false)
  billingAddress.value = structuredClone(toRaw(props.billingAddress))
}

const onFormSubmit = () => {
  emit('update:isDialogVisible', false)
  emit('submit', billingAddress.value)
}

const selectedAddress = ref('Home')

const addressTypes = [
  {
    icon: { icon: 'custom-home', size: '40' },
    title: '家',
    desc: '送货时间（07:00 至 21:00）',
    value: 'Home',
  },
  {
    icon: { icon: 'custom-office', size: '40' },
    title: '办公室',
    desc: '送货时间（09:00 至 17:00）',
    value: 'Office',
  },
]
</script>

<template>
  <VDialog
    :width="$vuetify.display.smAndDown ? 'auto' : 610 "
    :model-value="props.isDialogVisible"
    @update:model-value="val => $emit('update:isDialogVisible', val)"
  >
    <!-- 对话框关闭按钮 -->
    <DialogCloseBtn @click="$emit('update:isDialogVisible', false)" />

    <VCard
      v-if="props.billingAddress"
      class="pa-sm-8 pa-5"
    >
      <!-- 标题 -->
      <VCardItem>
        <VCardTitle class="text-h4 text-center">
          {{ props.billingAddress.address ? '编辑' : '添加新的' }}账单信息
        </VCardTitle>
      </VCardItem>

      <VCardText>
        <!-- 子标题 -->
        <VCardSubtitle class="text-center mb-6">
          <span class="text-base">

            请务必填写真实的地址和其他信息
          </span>
        </VCardSubtitle>

        <div class="d-flex">
          <CustomRadiosWithIcon
            v-model:selected-radio="selectedAddress"
            :radio-content="addressTypes"
            :grid-column="{ sm: '6', cols: '12' }"
          />
        </div>

        <!-- 表单 -->
        <VForm
          class="mt-4"
          @submit.prevent="onFormSubmit"
        >
          <VRow>
            <!-- 公司名称 -->
            <VCol
              cols="12"
              md="6"
            >
              <AppTextField
                v-model="billingAddress.companyName"
                label="公司名称"
              />
            </VCol>

            <!-- 电子邮件 -->
            <VCol
              cols="12"
              md="6"
            >
              <AppTextField
                v-model="billingAddress.billingEmail"
                label="电子邮件"
              />
            </VCol>

            <!-- ID -->
            <VCol
              cols="12"
              md="6"
            >
              <AppTextField
                v-model="billingAddress.ID"
                label="ID"
              />
            </VCol>

            <!-- 税号 -->
            <VCol
              cols="12"
              md="6"
            >
              <AppTextField
                v-model="billingAddress.vatNumber"
                label="税号"
              />
            </VCol>

            <!-- 地址 -->
            <VCol cols="12">
              <AppTextarea
                v-model="billingAddress.address"
                rows="2"
                label="地址"
              />
            </VCol>

            <!-- 电话 -->
            <VCol
              cols="12"
              md="6"
            >
              <AppTextField
                v-model="billingAddress.contact"
                label="电话"
              />
            </VCol>

            <!-- 国家 -->
            <VCol
              cols="12"
              md="6"
            >
              <AppTextField
                v-model="billingAddress.country"
                label="国家"
              />
            </VCol>

            <!-- 地区 -->
            <VCol
              cols="12"
              md="6"
            >
              <AppTextField
                v-model="billingAddress.state"
                label="地区"
              />
            </VCol>

            <!-- 邮政编码 -->
            <VCol
              cols="12"
              md="6"
            >
              <AppTextField
                v-model="billingAddress.zipCode"
                label="邮政编码"
                type="number"
              />
            </VCol>

            <!-- 提交和取消按钮 -->
            <VCol
              cols="12"
              class="text-center"
            >
              <VBtn
                type="submit"
                class="me-3"
              >
                确认
              </VBtn>

              <VBtn
                variant="tonal"
                color="secondary"
                @click="resetForm"
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
