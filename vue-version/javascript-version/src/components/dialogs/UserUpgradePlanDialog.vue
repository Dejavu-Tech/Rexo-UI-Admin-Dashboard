<script setup>
const props = defineProps({
  isDialogVisible: {
    type: Boolean,
    required: true,
  },
})

const emit = defineEmits(['update:isDialogVisible'])

const selectedPlan = ref('standard')

const plansList = [
  {
    desc: '￥129.9 元 / 月',
    title: '标准版',
    value: '标准版',
  },
  {
    desc: '免费',
    title: '基础版',
    value: '基础版',
  },
  {
    desc: '￥2699.9 元 / 月',
    title: '大型企业版',
    value: '大型企业版',
  },
  {
    desc: '￥899.9 元 / 月',
    title: '小微企业版',
    value: '小微企业版',
  },
]

const isConfirmDialogVisible = ref(false)

const dialogModelValueUpdate = val => {
  emit('update:isDialogVisible', val)
}
</script>

<template>
  <!-- 升级订阅计划 -->
  <VDialog
    :width="$vuetify.display.smAndDown ? 'auto' : 560"
    :model-value="props.isDialogVisible"
    @update:model-value="dialogModelValueUpdate"
  >
    <!-- 对话框关闭按钮 -->
    <DialogCloseBtn @click="dialogModelValueUpdate(false)" />

    <VCard class="py-8">
      <!-- 对话框关闭按钮 -->
      <DialogCloseBtn
        variant="text"
        size="small"
        @click="$emit('update:isDialogVisible', false)"
      />

      <VCardItem class="text-center">
        <VCardTitle class="text-h5 mb-5">
          升级订阅计划
        </VCardTitle>

        <VCardSubtitle>
          请选择适合的订阅计划
        </VCardSubtitle>
      </VCardItem>

      <VCardText class="d-flex align-center flex-column flex-sm-nowrap px-15">
        <CustomRadios
          :radio-content="plansList"
          :selected-radio="selectedPlan"
          :grid-column="{ cols: '12', sm: '6' }"
        />
        <VBtn class="mt-5">
          升级
        </VBtn>
      </VCardText>

      <VDivider class="my-3" />

      <VCardText class="px-15">
        <p class="font-weight-medium mb-2">
          用户当前订阅计划：标准版
        </p>
        <div class="d-flex justify-space-between flex-wrap">
          <div class="d-flex align-center me-3">
            <sup class="text-primary">￥</sup>
            <h3 class="text-h3 text-primary">
              129.9
            </h3>
            <sub class="text-sm">/ 月</sub>
          </div>
          <VBtn
            color="error"
            variant="tonal"
            class="mt-3"
            @click="isConfirmDialogVisible = true"
          >
            取消订阅
          </VBtn>
        </div>
      </VCardText>

      <!-- 确认对话框 -->
      <ConfirmDialog
        v-model:isDialogVisible="isConfirmDialogVisible"
        cancel-title="取消"
        confirm-title="已退订"
        confirm-msg="您的订阅已成功退订"
        confirmation-question="您确定要取消订阅吗？"
        cancel-msg="退订已取消"
      />
    </VCard>
  </VDialog>
</template>
