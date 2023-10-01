<script setup>
import apiPricingIllustration from '@images/pages/api-pricing-illustration.png'

const props = defineProps({
  isDialogVisible: {
    type: Boolean,
    required: true,
  },
})

const emit = defineEmits([
  'update:isDialogVisible',
  'updatedData',
])

const currentStep = ref(0)

const createApp = [
  {
    icon: 'tabler-clipboard',
    title: '基本信息',
    subtitle: '名称 / 类型',
  },
  {
    icon: 'tabler-box',
    title: '框架',
    subtitle: '选择框架',
  },
  {
    icon: 'tabler-database',
    title: '数据库',
    subtitle: '选择数据库',
  },
  {
    icon: 'tabler-credit-card',
    title: '订阅计费',
    subtitle: '订阅和付款',
  },
  {
    icon: 'tabler-check',
    title: '提交',
    subtitle: '确认提交',
  },
]

const categories = [
  {
    icon: 'tabler-briefcase',
    color: 'info',
    title: 'CRM 客户关系管理',
    subtitle: '客户管理业务扩展',
    slug: 'crm-application',
  },
  {
    icon: 'tabler-shopping-cart',
    color: 'success',
    title: '电子商务平台',
    subtitle: '发展线上商务应用',
    slug: 'ecommerce-application',
  },
  {
    icon: 'tabler-device-laptop',
    color: 'error',
    title: '在线学习平台',
    subtitle: '多功能教育学习应用',
    slug: 'online-learning-application',
  },
]

const frameworks = [
  {
    icon: 'tabler-brand-react-native',
    color: 'info',
    title: 'React Native',
    subtitle: '创建原生 APP',
    slug: 'react-framework',
  },
  {
    icon: 'tabler-brand-angular',
    color: 'error',
    title: 'Angular',
    subtitle: '渐进式前端框架',
    slug: 'angular-framework',
  },
  {
    icon: 'tabler-brand-html5',
    color: 'warning',
    title: 'HTML',
    subtitle: '基础入门网页',
    slug: 'html-framework',
  },
  {
    icon: 'tabler-brand-python',
    color: 'primary',
    title: 'Python',
    subtitle: '后端 web 框架',
    slug: 'js-framework',
  },
]

const databases = [
  {
    icon: 'tabler-brand-firebase',
    color: 'error',
    title: 'Firebase',
    subtitle: 'Firestore 数据库',
    slug: 'firebase-database',
  },
  {
    icon: 'tabler-brand-amazon',
    color: 'warning',
    title: 'AWS',
    subtitle: '亚马逊 NoSQL 数据库',
    slug: 'aws-database',
  },
  {
    icon: 'tabler-database',
    color: 'info',
    title: 'MySQL',
    subtitle: 'MySQL 数据库',
    slug: 'mysql-database',
  },
]

const createAppData = ref({
  category: 'crm-application',
  framework: 'react-framework',
  database: 'firebase-database',
  cardNumber: null,
  cardName: '',
  cardExpiry: '',
  cardCvv: '',
  isSave: false,
})

const dialogVisibleUpdate = val => {
  emit('update:isDialogVisible', val)
  currentStep.value = 0
}

watch(props, () => {
  if (!props.isDialogVisible)
    currentStep.value = 0
})

const onSubmit = () => {
  // eslint-disable-next-line no-alert
  alert('提交成功！')
  emit('updatedData', createAppData.value)
}
</script>

<template>
  <VDialog
    :model-value="props.isDialogVisible"
    max-width="900"
    @update:model-value="dialogVisibleUpdate"
  >
    <!-- 对话框关闭按钮 -->
    <DialogCloseBtn
      size="small"
      @click="emit('update:isDialogVisible', false)"
    />
    <VCard class="create-app-dialog">
      <VCardText class="pa-5 pa-sm-10">
        <h5 class="text-h5 text-center mb-2">
          创建应用
        </h5>
        <p class="text-sm text-center mb-8">
          使用此表单提供数据以创建应用
        </p>

        <VRow>
          <VCol
            cols="12"
            sm="5"
            md="4"
            lg="3"
          >
            <AppStepper
              v-model:current-step="currentStep"
              direction="vertical"
              :items="createApp"
              icon-size="24"
              class="stepper-icon-step-bg"
            />
          </VCol>

          <VCol
            cols="12"
            sm="7"
            md="8"
            lg="9"
          >
            <VWindow
              v-model="currentStep"
              class="disable-tab-transition stepper-content"
            >
              <!-- 类别 -->
              <VWindowItem>
                <AppTextField label="应用名称" />

                <h6 class="text-h6 my-4">
                  类别
                </h6>
                <VRadioGroup v-model="createAppData.category">
                  <VList class="card-list">
                    <VListItem
                      v-for="category in categories"
                      :key="category.title"
                      @click="createAppData.category = category.slug"
                    >
                      <template #prepend>
                        <VAvatar
                          size="48"
                          rounded
                          variant="tonal"
                          :color="category.color"
                          :icon="category.icon"
                        />
                      </template>

                      <VListItemTitle class="mb-1">
                        {{ category.title }}
                      </VListItemTitle>
                      <VListItemSubtitle>
                        {{ category.subtitle }}
                      </VListItemSubtitle>

                      <template #append>
                        <VRadio :value="category.slug" />
                      </template>
                    </VListItem>
                  </VList>
                </VRadioGroup>
              </VWindowItem>

              <!-- 框架 -->
              <VWindowItem>
                <h6 class="text-h6 mb-4">
                  选择框架
                </h6>
                <VRadioGroup v-model="createAppData.framework">
                  <VList class="card-list">
                    <VListItem
                      v-for="framework in frameworks"
                      :key="framework.title"
                      @click="createAppData.framework = framework.slug"
                    >
                      <template #prepend>
                        <VAvatar
                          size="48"
                          rounded
                          variant="tonal"
                          :color="framework.color"
                        >
                          <VIcon :icon="framework.icon" />
                        </VAvatar>
                      </template>
                      <VListItemTitle class="mb-1">
                        {{ framework.title }}
                      </VListItemTitle>
                      <VListItemSubtitle>
                        {{ framework.subtitle }}
                      </VListItemSubtitle>
                      <template #append>
                        <VRadio :value="framework.slug" />
                      </template>
                    </VListItem>
                  </VList>
                </VRadioGroup>
              </VWindowItem>

              <!-- 数据库 -->
              <VWindowItem>
                <AppTextField label="数据库名称" />

                <h6 class="text-h6 my-4">
                  选择数据库
                </h6>
                <VRadioGroup v-model="createAppData.database">
                  <VList class="card-list">
                    <VListItem
                      v-for="database in databases"
                      :key="database.title"
                      @click="createAppData.database = database.slug"
                    >
                      <template #prepend>
                        <VAvatar
                          size="48"
                          rounded
                          variant="tonal"
                          :color="database.color"
                        >
                          <VIcon :icon="database.icon" />
                        </VAvatar>
                      </template>
                      <VListItemTitle class="mb-1">
                        {{ database.title }}
                      </VListItemTitle>
                      <VListItemSubtitle>
                        {{ database.subtitle }}
                      </VListItemSubtitle>
                      <template #append>
                        <VRadio :value="database.slug" />
                      </template>
                    </VListItem>
                  </VList>
                </VRadioGroup>
              </VWindowItem>

              <!-- 付款表单 -->
              <VWindowItem>
                <h6 class="text-h6 mb-4">
                  订阅和付款
                </h6>

                <VForm>
                  <VRow>
                    <VCol cols="12">
                      <AppTextField
                        v-model="createAppData.cardNumber"
                        label="卡号"
                        type="number"
                      />
                    </VCol>

                    <VCol
                      cols="12"
                      md="6"
                    >
                      <AppTextField
                        v-model="createAppData.cardName"
                        label="持卡人姓名"
                      />
                    </VCol>

                    <VCol
                      cols="6"
                      md="3"
                    >
                      <AppTextField
                        v-model="createAppData.cardExpiry"
                        label="有效期（月 / 年）"
                      />
                    </VCol>

                    <VCol
                      cols="6"
                      md="3"
                    >
                      <AppTextField
                        v-model="createAppData.cardCvv"
                        label="卡背面末三位数"
                      />
                    </VCol>

                    <VCol cols="12">
                      <VSwitch
                        v-model="createAppData.isSave"
                        label="订阅到期前 3 日将自动扣费"
                      />
                    </VCol>
                  </VRow>
                </VForm>
              </VWindowItem>

              <VWindowItem class="text-center">
                <h6 class="text-h6 mb-2">
                  提交 🥳
                </h6>
                <p class="text-sm mb-6">
                  提交并开启您的应用
                </p>

                <VImg
                  :src="apiPricingIllustration"
                  width="180"
                  class="mx-auto"
                />
              </VWindowItem>
            </VWindow>

            <div class="d-flex justify-space-between mt-8">
              <VBtn
                variant="tonal"
                color="secondary"
                :disabled="currentStep === 0"
                @click="currentStep--"
              >
                <VIcon
                  icon="tabler-arrow-left"
                  start
                  class="flip-in-rtl"
                />
                上一页
              </VBtn>

              <VBtn
                v-if="createApp.length - 1 === currentStep"
                color="success"
                @click="onSubmit"
              >
                提交
                <VIcon
                  icon="tabler-check"
                  end
                  class="flip-in-rtl"
                />
              </VBtn>

              <VBtn
                v-else
                @click="currentStep++"
              >
                下一页

                <VIcon
                  icon="tabler-arrow-right"
                  end
                  class="flip-in-rtl"
                />
              </VBtn>
            </div>
          </VCol>
        </VRow>
      </VCardText>
    </VCard>
  </VDialog>
</template>

<style lang="scss">
.stepper-content .card-list {
  --v-card-list-gap: 24px;
}
</style>
