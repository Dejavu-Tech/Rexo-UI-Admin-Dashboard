<script setup lang="ts">
import avatar1 from '@images/avatars/avatar-1.png'
import avatar2 from '@images/avatars/avatar-2.png'
import avatar3 from '@images/avatars/avatar-3.png'
import avatar4 from '@images/avatars/avatar-4.png'
import avatar5 from '@images/avatars/avatar-5.png'
import avatar6 from '@images/avatars/avatar-6.png'
import avatar7 from '@images/avatars/avatar-7.png'
import avatar8 from '@images/avatars/avatar-8.png'

interface Props {
  isDialogVisible: boolean
}

interface Emit {
  (e: 'update:isDialogVisible', val: boolean): void
}

const props = defineProps<Props>()

const emit = defineEmits<Emit>()

const dialogVisibleUpdate = (val: boolean) => {
  emit('update:isDialogVisible', val)
}

type Permission = '项目所有者' | '可以编辑' | '可以评论' | '可以查看'

interface Member {
  avatar: string
  name: string
  email: string
  permission: Permission
}

const membersList: Member[] = [
  {
    avatar: avatar1,
    name: '张翼德',
    email: 'zhangfly@mail.com',
    permission: '可以编辑',
  },
  {
    avatar: avatar2,
    name: '许褚',
    email: 'xuchu@mail.com',
    permission: '项目所有者',
  },
  {
    avatar: avatar3,
    name: '张辽',
    email: 'zhangliao@mail.com',
    permission: '可以评论',
  },
  {
    avatar: avatar4,
    name: '典韦',
    email: 'xiaodiandian0@net.com',
    permission: '可以查看',
  },
  {
    avatar: avatar5,
    name: '诸葛亮',
    email: 'kongming@god.com',
    permission: '可以编辑',
  },
  {
    avatar: avatar6,
    name: '许攸',
    email: 'xuyou@here.com',
    permission: '可以查看',
  },
  {
    avatar: avatar7,
    name: '马孟起',
    email: 'machao@mozilla.org',
    permission: '可以评论',
  },
  {
    avatar: avatar8,
    name: '魏延',
    email: 'xiaoweiwei@sql.com',
    permission: '可以编辑',
  },
]
</script>

<template>
  <VDialog
    :model-value="props.isDialogVisible"
    max-width="800"
    @update:model-value="dialogVisibleUpdate"
  >
    <!-- 对话框关闭按钮 -->
    <DialogCloseBtn @click="$emit('update:isDialogVisible', false)" />

    <VCard class="share-project-dialog pa-5 pa-sm-8">
      <VCardText>
        <h5 class="text-h5 text-center mb-3">
          共享项目
        </h5>
        <p class="text-sm-body-1 text-center mb-6">
          向团队成员共享项目
        </p>

        <p class="font-weight-medium mb-1">
          添加成员
        </p>
        <AppAutocomplete
          :items="membersList"
          item-title="name"
          item-value="name"
          placeholder="选择团队成员"
          density="compact"
        >
          <template #item="{ props: listItemProp, item }">
            <VListItem v-bind="listItemProp">
              <template #prepend>
                <VAvatar
                  :image="item.raw.avatar"
                  size="30"
                />
              </template>
            </VListItem>
          </template>
        </AppAutocomplete>

        <h6 class="text-h6 mb-4 mt-8">
          8 个成员
        </h6>

        <VList class="card-list">
          <VListItem
            v-for="member in membersList"
            :key="member.name"
          >
            <template #prepend>
              <VAvatar :image="member.avatar" />
            </template>

            <VListItemTitle class="text-sm">
              {{ member.name }}
            </VListItemTitle>
            <VListItemSubtitle>
              {{ member.email }}
            </VListItemSubtitle>

            <template #append>
              <VBtn
                variant="plain"
                color="default"
                :icon="$vuetify.display.xs"
              >
                <span class="d-none d-sm-block">{{ member.permission }}</span>
                <VIcon icon="tabler-chevron-down" />

                <VMenu activator="parent">
                  <VList :selected="[member.permission]">
                    <VListItem
                      v-for="(item, index) in ['项目所有者', '可以编辑', '可以评论', '可以查看']"
                      :key="index"
                      :value="item"
                    >
                      <VListItemTitle>{{ item }}</VListItemTitle>
                    </VListItem>
                  </VList>
                </VMenu>
              </VBtn>
            </template>
          </VListItem>
        </VList>

        <div class="d-flex align-center justify-space-between flex-wrap gap-3 mt-6">
          <h6 class="text-sm font-weight-medium d-flex align-start">
            <VIcon
              icon="tabler-users"
              class="me-2"
            />
            <span>公共成员 - 蒂佳芙科技</span>
          </h6>

          <VBtn class="text-capitalize">
            复制项目链接
          </VBtn>
        </div>
      </VCardText>
    </VCard>
  </VDialog>
</template>

<style lang="scss">
.share-project-dialog {
  .card-list {
    --v-card-list-gap: 1rem;
  }
}
</style>
