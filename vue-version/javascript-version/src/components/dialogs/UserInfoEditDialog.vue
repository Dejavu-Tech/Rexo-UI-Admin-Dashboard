<script setup>
const props = defineProps({
  userData: {
    type: Object,
    required: false,
    default: () => ({
      id: 0,
      fullName: '',
      firstName: '',
      lastName: '',
      company: '',
      role: '',
      username: '',
      country: '',
      contact: '',
      email: '',
      currentPlan: '',
      status: '',
      avatar: '',
      taskDone: null,
      projectDone: null,
      userId: '',
      language: '',
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

const userData = ref(structuredClone(toRaw(props.userData)))
const isAgreeThePrivacy = ref(false)

watch(props, () => {
  userData.value = structuredClone(toRaw(props.userData))
})

const onFormSubmit = () => {
  emit('update:isDialogVisible', false)
  emit('submit', userData.value)
}

const onFormReset = () => {
  userData.value = structuredClone(toRaw(props.userData))
  emit('update:isDialogVisible', false)
}

const dialogModelValueUpdate = val => {
  emit('update:isDialogVisible', val)
}

const compoundSurnames = /(司马|夏侯|诸葛)/
const fullName = userData.value.fullName

const [firstName, lastName] = fullName.match(compoundSurnames)
  ? [fullName.slice(0, 2), fullName.slice(2)]
  : [fullName.slice(0, 1), fullName.slice(1)]
</script>

<template>
  <VDialog
    :width="$vuetify.display.smAndDown ? 'auto' : 677"
    :model-value="props.isDialogVisible"
    @update:model-value="dialogModelValueUpdate"
  >
    <!-- 对话框关闭按钮 -->
    <DialogCloseBtn @click="dialogModelValueUpdate(false)" />

    <VCard class="pa-sm-8 pa-5">
      <VCardItem class="text-center">
        <VCardTitle class="text-h5 mb-3">
          编辑用户信息
        </VCardTitle>
        <p class="mb-0">
          用户详细信息将纳入个人隐私保护和数据安全政策
        </p>
      </VCardItem>

      <VCardText>
        <!-- 表单 -->
        <VForm
          class="mt-6"
          @submit.prevent="onFormSubmit"
        >
          <VRow>
            <!-- 姓 -->
            <VCol
              cols="12"
              md="6"
            >
              <AppTextField
                v-model="firstName"
                label="姓"
              />
            </VCol>

            <!-- 名 -->
            <VCol
              cols="12"
              md="6"
            >
              <AppTextField
                v-model="lastName"
                label="名"
              />
            </VCol>

            <!-- 电子邮件 -->
            <VCol
              cols="12"
              md="6"
            >
              <AppTextField
                v-model="userData.email"
                label="电子邮件"
              />
            </VCol>

            <!-- 状态 -->
            <VCol
              cols="12"
              md="6"
            >
              <AppTextField
                v-model="userData.status"
                label="状态"
              />
            </VCol>

            <!-- ID -->
            <VCol
              cols="12"
              md="6"
            >
              <AppTextField
                v-model="userData.userId"
                label="ID"
              />
            </VCol>

            <!-- 电话 -->
            <VCol
              cols="12"
              md="6"
            >
              <AppTextField
                v-model="userData.contact"
                label="电话"
              />
            </VCol>

            <!-- 语言 -->
            <VCol
              cols="12"
              md="6"
            >
              <AppTextField
                v-model="userData.language"
                chips
                multiple
                label="语言"
              />
            </VCol>

            <!-- 国家 -->
            <VCol
              cols="12"
              md="6"
            >
              <AppTextField
                v-model="userData.country"
                label="国家"
              />
            </VCol>

            <!-- 开关 -->
            <VCol cols="12">
              <VSwitch
                v-model="isAgreeThePrivacy"
                density="compact"
                label="点击同意本公司用户隐私政策"
              />
            </VCol>

            <!-- 提交和取消按钮 -->
            <VCol
              cols="12"
              class="d-flex flex-wrap justify-center gap-4"
            >
              <VBtn type="submit">
                提交
              </VBtn>

              <VBtn
                color="secondary"
                variant="tonal"
                @click="onFormReset"
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
