<script setup>
const props = defineProps({
  isDialogVisible: {
    type: Boolean,
    required: true,
  },
})

const emit = defineEmits(['update:isDialogVisible'])

const dialogVisibleUpdate = val => {
  emit('update:isDialogVisible', val)
}

const referAndEarnSteps = [
  {
    icon: 'tabler-send',
    title: '发送邀请 👍🏻',
    subtitle: '将推荐链接发送给您的朋友',
  },
  {
    icon: 'tabler-rocket',
    title: '注册 😎',
    subtitle: '让您的朋友注册 Rexo-UI',
  },
  {
    icon: 'tabler-keyboard',
    title: '免费试用 🎉',
    subtitle: '免费的 30 天试用期',
  },
]
</script>

<template>
  <VDialog
    :model-value="props.isDialogVisible"
    max-width="740"
    @update:model-value="dialogVisibleUpdate"
  >
    <!-- 对话框关闭按钮 -->
    <DialogCloseBtn @click="$emit('update:isDialogVisible', false)" />

    <VCard class="refer-and-earn-dialog">
      <VCardText class="px-5 px-sm-16 pt-16 pb-10">
        <h5 class="text-h5 text-center mb-3">
          推荐 & 裂变
        </h5>
        <p class="text-sm-body-1 text-center">
          邀请您的朋友使用 Rexo-UI，如果他们注册并成功付款，您和您的朋友将获得 30 天的免费试用期
        </p>

        <VRow class="text-center mt-8">
          <VCol
            v-for="step in referAndEarnSteps"
            :key="step.title"
            cols="12"
            sm="4"
          >
            <VAvatar
              variant="tonal"
              size="82"
              color="primary"
              rounded
            >
              <VIcon
                size="40"
                :icon="step.icon"
              />
            </VAvatar>

            <h6 class="text-lg mt-4 mb-2">
              {{ step.title }}
            </h6>
            <span class="text-base">{{ step.subtitle }}</span>
          </VCol>
        </VRow>
      </VCardText>

      <VDivider />

      <VCardText class="px-5 px-sm-16 pt-10 pb-16">
        <h6 class="text-lg mb-4">
          邀请您的朋友
        </h6>

        <p class="mb-1 text-sm">
          请输入朋友的电子邮件地址并邀请他们使用 Rexo-UI 😍
        </p>
        <VForm
          class="d-flex align-center gap-4"
          @submit.prevent="() => {}"
        >
          <AppTextField
            density="compact"
            placeholder="example@mail.com"
          />

          <VBtn type="submit">
            提交
          </VBtn>
        </VForm>

        <h6 class="text-h6 mb-4 mt-7">
          分享推荐链接
        </h6>

        <p class="mb-1 text-sm">
          可复制此链接在社交媒体上分享 🚀
        </p>
        <VForm
          class="d-flex align-center flex-wrap gap-3"
          @submit.prevent="() => {}"
        >
          <AppTextField
            density="compact"
            placeholder="http://rexoui.com"
            class="refer-link-input me-1"
          >
            <template #append-inner>
              <VBtn variant="text">
                复制链接
              </VBtn>
            </template>
          </AppTextField>

          <div class="d-flex gap-3">
            <VBtn
              icon
              class="rounded"
              color="#07C160"
              size="38"
            >
              <VIcon
                color="white"
                icon="tabler-brand-wechat"
                size="22"
              />
            </VBtn>

            <VBtn
              icon
              class="rounded"
              color="#FF4500"
              size="38"
            >
              <VIcon
                color="white"
                icon="tabler-brand-weibo"
                size="22"
              />
            </VBtn>

            <VBtn
              icon
              class="rounded"
              color="#00BEFF"
              size="38"
            >
              <VIcon
                color="white"
                icon="tabler-brand-qq"
                size="22"
              />
            </VBtn>
          </div>
        </VForm>
      </VCardText>
    </VCard>
  </VDialog>
</template>

<style lang="scss">
.refer-link-input {
  .v-field--appended {
    padding-inline-end: 0;
  }

  .v-field__append-inner {
    padding-block-start: 0.125rem;
  }
}
</style>
