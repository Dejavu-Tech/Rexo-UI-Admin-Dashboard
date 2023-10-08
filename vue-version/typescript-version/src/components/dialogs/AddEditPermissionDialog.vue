<script setup lang="ts">
interface Props {
  isDialogVisible: boolean
  permissionName?: string
}
interface Emit {
  (e: 'update:isDialogVisible', value: boolean): void
  (e: 'update:permissionName', value: string): void
}

const props = withDefaults(defineProps<Props>(), {
  permissionName: '',
})

const emit = defineEmits<Emit>()

const permissionName = ref('')

const onReset = () => {
  emit('update:isDialogVisible', false)
  permissionName.value = ''
}

const onSubmit = () => {
  emit('update:isDialogVisible', false)
  emit('update:permissionName', permissionName.value)
}

watch(props, () => {
  permissionName.value = props.permissionName
})
</script>

<template>
  <VDialog
    :width="$vuetify.display.smAndDown ? 'auto' : 600"
    :model-value="props.isDialogVisible"
    @update:model-value="onReset"
  >
    <!-- 对话框关闭按钮 -->
    <DialogCloseBtn @click="onReset" />

    <VCard class="pa-sm-8 pa-5">
      <!-- 标题 -->
      <VCardItem class="text-center">
        <VCardTitle class="text-h5">
          {{ props.permissionName ? '编辑' : '添加新' }}权限
        </VCardTitle>
        <VCardSubtitle>
          请根据业务需求谨慎{{ props.permissionName ? '编辑' : '添加新' }}权限
        </VCardSubtitle>
      </VCardItem>

      <VCardText class="mt-1">
        <!-- 表单 -->
        <VForm>
          <VAlert
            type="warning"
            title="警告"
            variant="tonal"
            class="mb-6"
          >
            编辑或添加新的权限名称，可能会破坏系统权限功能。在继续之前，请确保您绝对确定
          </VAlert>

          <!-- 角色名称 -->
          <div class="d-flex align-end gap-3 mb-3">
            <AppTextField
              v-model="permissionName"
              density="compact"
              label="权限名称"
              placeholder="请输入权限名称"
            />

            <VBtn @click="onSubmit">
              确定
            </VBtn>
          </div>

          <VCheckbox label="设置为核心权限" />
        </VForm>
      </VCardText>
    </VCard>
  </VDialog>
</template>

<style lang="scss">
.permission-table {
  td {
    border-block-end: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
    padding-block: 0.5rem;
    padding-inline: 0;
  }
}
</style>
