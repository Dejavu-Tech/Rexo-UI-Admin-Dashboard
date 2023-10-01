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
</script>

<template>
  <VDialog
    :model-value="props.isDialogVisible"
    class="v-dialog-xl"
    @update:model-value="dialogVisibleUpdate"
  >
    <!-- 对话框关闭按钮 -->
    <DialogCloseBtn @click="$emit('update:isDialogVisible', false)" />

    <VCard class="pricing-dialog pa-5 pa-sm-8">
      <VCardText>
        <AppPricing
          title="订阅计划"
          md="4"
        />
      </VCardText>
    </VCard>
  </VDialog>
</template>
