<script setup>
const props = defineProps({
  collapsed: {
    type: Boolean,
    required: false,
    default: false,
  },
  noActions: {
    type: Boolean,
    required: false,
    default: false,
  },
  actionCollapsed: {
    type: Boolean,
    required: false,
    default: false,
  },
  actionRefresh: {
    type: Boolean,
    required: false,
    default: false,
  },
  actionRemove: {
    type: Boolean,
    required: false,
    default: false,
  },
  title: {
    type: String,
    required: false,
    default: undefined,
  },
})

const emit = defineEmits([
  'collapsed',
  'refresh',
  'trash',
])

defineOptions({ inheritAttrs: false })

const isContentCollapsed = ref(props.collapsed)
const isCardRemoved = ref(false)
const isOverlayVisible = ref(false)

// 隐藏覆盖层
const hideOverlay = () => {
  isOverlayVisible.value = false
}

// 触发器折叠
const triggerCollapse = () => {
  isContentCollapsed.value = !isContentCollapsed.value
  emit('collapsed', isContentCollapsed.value)
}

// 触发器刷新
const triggerRefresh = () => {
  isOverlayVisible.value = true
  emit('refresh', hideOverlay)
}

// 触发器移除
const triggeredRemove = () => {
  isCardRemoved.value = true
  emit('trash')
}
</script>

<template>
  <VExpandTransition>
    <!-- TODO:  v-card 组件中有过渡效果时移除 div。参考：https://github.com/vuetifyjs/vuetify/issues/15111 -->
    <div v-if="!isCardRemoved">
      <VCard v-bind="$attrs">
        <VCardItem>
          <VCardTitle v-if="props.title || $slots.title">
            <!-- 标题插槽和 prop -->
            <slot name="title">
              {{ props.title }}
            </slot>
          </VCardTitle>

          <template #append>
            <!-- 动作插槽之前 -->
            <div>
              <slot name="before-actions" />

              <!-- 折叠按钮 -->
              <IconBtn
                v-if="(!(actionRemove || actionRefresh) || actionCollapsed) && !noActions"
                @click="triggerCollapse"
              >
                <VIcon
                  size="20"
                  icon="tabler-chevron-up"
                  :style="{ transform: isContentCollapsed ? 'rotate(-180deg)' : null }"
                  style="transition-duration: 0.28s;"
                />
              </IconBtn>

              <!-- 覆盖按钮 -->
              <IconBtn
                v-if="(!(actionRemove || actionCollapsed) || actionRefresh) && !noActions"
                @click="triggerRefresh"
              >
                <VIcon
                  size="20"
                  icon="tabler-refresh"
                />
              </IconBtn>

              <!-- 关闭按钮 -->
              <IconBtn
                v-if="(!(actionRefresh || actionCollapsed) || actionRemove) && !noActions"
                @click="triggeredRemove"
              >
                <VIcon
                  size="20"
                  icon="tabler-x"
                />
              </IconBtn>
            </div>
          </template>
        </VCardItem>

        <!-- 卡片内容 -->
        <VExpandTransition>
          <div
            v-show="!isContentCollapsed"
            class="v-card-content"
          >
            <slot />
          </div>
        </VExpandTransition>

        <!-- 覆盖层（遮罩） -->
        <VOverlay
          v-model="isOverlayVisible"
          contained
          persistent
          class="align-center justify-center"
        >
          <VProgressCircular indeterminate />
        </VOverlay>
      </VCard>
    </div>
  </VExpandTransition>
</template>

<style lang="scss">
.v-card-item {
  +.v-card-content {
    .v-card-text:first-child {
      padding-block-start: 0;
    }
  }
}
</style>
