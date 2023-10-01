<script setup>
import { VForm } from 'vuetify/components/VForm'

const props = defineProps({
  rolePermissions: {
    type: Object,
    required: false,
    default: () => ({
      name: '',
      permissions: [],
    }),
  },
  isDialogVisible: {
    type: Boolean,
    required: true,
  },
})

const emit = defineEmits([
  'update:isDialogVisible',
  'update:rolePermissions',
])


// 权限列表
const permissions = ref([
  {
    name: '用户管理',
    read: false,
    write: false,
    create: false,
  },
  {
    name: '内容管理',
    read: false,
    write: false,
    create: false,
  },
  {
    name: '角色管理',
    read: false,
    write: false,
    create: false,
  },
  {
    name: '数据库管理',
    read: false,
    write: false,
    create: false,
  },
  {
    name: '财务管理',
    read: false,
    write: false,
    create: false,
  },
  {
    name: '报告',
    read: false,
    write: false,
    create: false,
  },
  {
    name: '接口控制',
    read: false,
    write: false,
    create: false,
  },
  {
    name: '存储管理',
    read: false,
    write: false,
    create: false,
  },
  {
    name: '工资管理',
    read: false,
    write: false,
    create: false,
  },
])

const isSelectAll = ref(false)
const role = ref('')
const refPermissionForm = ref()

const checkedCount = computed(() => {
  let counter = 0
  permissions.value.forEach(permission => {
    Object.entries(permission).forEach(([key, value]) => {
      if (key !== 'name' && value)
        counter++
    })
  })
  
  return counter
})

const isIndeterminate = computed(() => checkedCount.value > 0 && checkedCount.value < permissions.value.length * 3)

// 选择所有
watch(isSelectAll, val => {
  permissions.value = permissions.value.map(permission => ({
    ...permission,
    read: val,
    write: val,
    create: val,
  }))
})

// 如果 Indeterminate 为 false，则将 isSelectAll 设置为 false
watch(isIndeterminate, () => {
  if (!isIndeterminate.value)
    isSelectAll.value = false
})

// 如果选中了所有权限，则将 isSelectAll 设置为 true
watch(permissions, () => {
  if (checkedCount.value === permissions.value.length * 3)
    isSelectAll.value = true
}, { deep: true })

// 如果角色权限不为空，则设置权限
watch(props, () => {
  if (props.rolePermissions && props.rolePermissions.permissions.length) {
    role.value = props.rolePermissions.name
    permissions.value = permissions.value.map(permission => {
      const rolePermission = props.rolePermissions?.permissions.find(item => item.name === permission.name)
      if (rolePermission) {
        return {
          ...permission,
          ...rolePermission,
        }
      }
      
      return permission
    })
  }
})

const onSubmit = () => {
  const rolePermissions = {
    name: role.value,
    permissions: permissions.value,
  }

  emit('update:rolePermissions', rolePermissions)
  emit('update:isDialogVisible', false)
  isSelectAll.value = false
  refPermissionForm.value?.reset()
}

const onReset = () => {
  emit('update:isDialogVisible', false)
  isSelectAll.value = false
  refPermissionForm.value?.reset()
}
</script>

<template>
  <VDialog
    :width="$vuetify.display.smAndDown ? 'auto' : 900"
    :model-value="props.isDialogVisible"
    @update:model-value="onReset"
  >
    <!-- 对话框关闭按钮 -->
    <DialogCloseBtn @click="onReset" />

    <VCard class="pa-sm-8 pa-5">
      <!-- 标题 -->
      <VCardItem class="text-center">
        <VCardTitle class="text-h3 mb-3">
          {{ props.rolePermissions.name ? '编辑' : '添加新' }}角色
        </VCardTitle>
        <p class="text-base mb-0">
          设置角色权限
        </p>
      </VCardItem>

      <VCardText class="mt-6">
        <!-- 表单 -->
        <VForm ref="refPermissionForm">
          <!-- 角色名称 -->
          <AppTextField
            v-model="role"
            label="角色名称"
            placeholder="请输入角色名称"
          />

          <h6 class="text-h4 mt-8 mb-3">
            角色权限
          </h6>

          <!-- 角色权限 -->

          <VTable class="permission-table text-no-wrap">
            <!-- 管理员权限 -->
            <tr>
              <td>
                管理员访问权限
              </td>
              <td colspan="3">
                <div class="d-flex justify-end">
                  <VCheckbox
                    v-model="isSelectAll"
                    v-model:indeterminate="isIndeterminate"
                    label="选择所有"
                  />
                </div>
              </td>
            </tr>

            <!-- 其他权限 -->
            <template
              v-for="permission in permissions"
              :key="permission.name"
            >
              <tr>
                <td>{{ permission.name }}</td>
                <td>
                  <div class="d-flex justify-end">
                    <VCheckbox
                      v-model="permission.read"
                      label="只读"
                    />
                  </div>
                </td>
                <td>
                  <div class="d-flex justify-end">
                    <VCheckbox
                      v-model="permission.write"
                      label="只写"
                    />
                  </div>
                </td>
                <td>
                  <div class="d-flex justify-end">
                    <VCheckbox
                      v-model="permission.create"
                      label="全部权限"
                    />
                  </div>
                </td>
              </tr>
            </template>
          </VTable>

          <!-- 操作按钮 -->
          <div class="d-flex align-center justify-center gap-3 mt-6">
            <VBtn @click="onSubmit">
              提交
            </VBtn>

            <VBtn
              color="secondary"
              variant="tonal"
              @click="onReset"
            >
              取消
            </VBtn>
          </div>
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

    .v-checkbox {
      min-inline-size: 4.75rem;
    }

    &:not(:first-child) {
      padding-inline: 0.5rem;
    }

    .v-label {
      white-space: nowrap;
    }
  }
}
</style>
