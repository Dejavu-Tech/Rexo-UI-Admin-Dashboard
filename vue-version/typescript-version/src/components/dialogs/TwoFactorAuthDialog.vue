<script setup lang="ts">
interface Emit {
  (e: 'update:isDialogVisible', value: boolean): void
}
interface Props {
  isDialogVisible: boolean
  smsCode?: string
  authAppCode?: string
}

const props = withDefaults(defineProps<Props>(), {
  isDialogVisible: false,
  smsCode: '',
  authAppCode: '',
})

const emit = defineEmits<Emit>()

const authMethods = [
  {
    icon: 'tabler-settings',
    title: '身份验证应用',
    subtitle: '从诸如 Google Authenticator 或 Microsoft Authenticator 的应用中获取验证码。',
    method: 'authApp',
  },
  {
    icon: 'tabler-message',
    title: '短信',
    subtitle: '如果需要使用备用登录方式，我们将通过短信发送验证码。',
    method: 'sms',
  },
]

const selectedMethod = ref(['authApp'])
const isAuthAppDialogVisible = ref(false)
const isSmsDialogVisible = ref(false)

const openSelectedMethodDialog = () => {
  if (selectedMethod.value[0] === 'authApp') {
    isAuthAppDialogVisible.value = true
    isSmsDialogVisible.value = false
    emit('update:isDialogVisible', false)
  }
  if (selectedMethod.value[0] === 'sms') {
    isAuthAppDialogVisible.value = false
    isSmsDialogVisible.value = true
    emit('update:isDialogVisible', false)
  }
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
      <VCardItem class="text-center">
        <VCardTitle class="text-h5 mb-3">
          选择身份验证方式
        </VCardTitle>
        <VCardSubtitle>
          <span class="text-base">
            您还需要选择代理向目录服务器进行身份验证的方式
          </span>
        </VCardSubtitle>
      </VCardItem>

      <VCardText>
        <VList
          v-model:selected="selectedMethod"
          mandatory
          variant="outlined"
          class="card-list auth-method-card"
          :class="$vuetify.display.xs ? 'responsive-card' : ''"
        >
          <VListItem
            v-for="item of authMethods"
            :key="item.title"
            rounded
            :value="item.method"
            class="py-5 px-6 my-6"
            :class="selectedMethod[0] === item.method && 'bg-light-primary text-primary'"
          >
            <template #prepend>
              <VIcon
                :icon="item.icon"
                size="38"
              />
            </template>

            <VListItemTitle class="mb-2">
              <span class="text-xl font-weight-medium">
                {{ item.title }}
              </span>
            </VListItemTitle>
            <p class="text-base mb-0">
              {{ item.subtitle }}
            </p>
          </VListItem>
        </VList>

        <div class="d-flex gap-4 justify-center">
          <VBtn @click="openSelectedMethodDialog">
            确认
          </VBtn>
          <VBtn
            color="secondary"
            variant="tonal"
            @click="$emit('update:isDialogVisible', false)"
          >
            取消
          </VBtn>
        </div>
      </VCardText>
    </VCard>
  </VDialog>

  <AddAuthenticatorAppDialog
    v-model:isDialogVisible="isAuthAppDialogVisible"
    :auth-code="props.authAppCode"
  />
  <EnableOneTimePasswordDialog
    v-model:isDialogVisible="isSmsDialogVisible"
    :mobile-number="props.smsCode"
  />
</template>

<style lang="scss">
.auth-method-card {
  &.card-list .v-list-item {
    padding-block: 20px !important;
    padding-inline: 30px !important;
  }

  .v-list-item--active {
    background-color: transparent !important;

    .v-list-item__overlay {
      opacity: 0;
    }
  }

  &.responsive-card {
    .v-list-item {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      text-align: center;

      .v-list-item__prepend {
        svg {
          margin: 0;
        }
      }
    }
  }
}
</style>
