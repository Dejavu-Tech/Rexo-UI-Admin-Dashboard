<script setup>
import { PerfectScrollbar } from 'vue3-perfect-scrollbar'
import {
  VList,
  VListItem,
  VListSubheader,
} from 'vuetify/components/VList'

const props = defineProps({
  isDialogVisible: {
    type: Boolean,
    required: true,
  },
  searchQuery: {
    type: String,
    required: true,
  },
  searchResults: {
    type: Array,
    required: true,
  },
  suggestions: {
    type: Array,
    required: false,
  },
  noDataSuggestion: {
    type: Array,
    required: false,
  },
})

const emit = defineEmits([
  'update:isDialogVisible',
  'update:searchQuery',
  'itemSelected',
])

const { ctrl_k, meta_k } = useMagicKeys({
  passive: false,
  onEventFired(e) {
    if (e.ctrlKey && e.key === 'k' && e.type === 'keydown')
      e.preventDefault()
  },
})

const refSearchList = ref()
const searchQuery = ref(structuredClone(toRaw(props.searchQuery)))
const refSearchInput = ref()
const isLocalDialogVisible = ref(structuredClone(toRaw(props.isDialogVisible)))
const searchResults = ref(structuredClone(toRaw(props.searchResults)))

// 监测 props 变化
watch(props, () => {
  isLocalDialogVisible.value = structuredClone(toRaw(props.isDialogVisible))
  searchResults.value = structuredClone(toRaw(props.searchResults))
  searchQuery.value = structuredClone(toRaw(props.searchQuery))
})
watch([
  ctrl_k,
  meta_k,
], () => {
  isLocalDialogVisible.value = true
  emit('update:isDialogVisible', true)
})

// 清除搜索结果并关闭对话框
const clearSearchAndCloseDialog = () => {
  emit('update:isDialogVisible', false)
  emit('update:searchQuery', '')
}

watchEffect(() => {
  if (!searchQuery.value.length)
    searchResults.value = []
})

const getFocusOnSearchList = e => {
  if (e.key === 'ArrowDown') {
    e.preventDefault()
    refSearchList.value?.focus('next')
  } else if (e.key === 'ArrowUp') {
    e.preventDefault()
    refSearchList.value?.focus('prev')
  }
}

const dialogModelValueUpdate = val => {
  emit('update:isDialogVisible', val)
  emit('update:searchQuery', '')
}

const resolveCategories = val => {
  if (val === 'dashboards')
    return '模板'
  if (val === 'appsPages')
    return '应用 & 页面'
  if (val === 'userInterface')
    return 'UI 元素'
  if (val === 'formsTables')
    return '表单 & 表格'
  if (val === 'chartsMisc')
    return '图表 & 杂项'

  return '其他'
}
</script>

<template>
  <VDialog
    max-width="600"
    :model-value="isLocalDialogVisible"
    :height="$vuetify.display.smAndUp ? '550' : '100%'"
    :fullscreen="$vuetify.display.width < 600"
    class="app-bar-search-dialog"
    @update:model-value="dialogModelValueUpdate"
    @keyup.esc="clearSearchAndCloseDialog"
  >
    <VCard
      height="100%"
      width="100%"
      class="position-relative"
    >
      <VCardText
        class="pt-1"
        style="min-block-size: 65px;"
      >
        <!-- 搜索框 -->
        <VTextField
          ref="refSearchInput"
          v-model="searchQuery"
          autofocus
          density="comfortable"
          variant="plain"
          class="app-bar-autocomplete-box"
          @keyup.esc="clearSearchAndCloseDialog"
          @keydown="getFocusOnSearchList"
          @update:model-value="$emit('update:searchQuery', searchQuery)"
        >
          <!-- 内部前置内容 -->
          <template #prepend-inner>
            <div class="d-flex align-center text-high-emphasis me-1">
              <VIcon
                size="22"
                icon="tabler-search"
                class="mt-1"
                style="opacity: 1;"
              />
            </div>
          </template>

          <!-- 内部后置内容 -->
          <template #append-inner>
            <div class="d-flex align-center">
              <div
                class="text-base text-disabled cursor-pointer me-1"
                @click="clearSearchAndCloseDialog"
              >
                [esc]
              </div>

              <IconBtn
                size="small"
                @click="clearSearchAndCloseDialog"
              >
                <VIcon icon="tabler-x" />
              </IconBtn>
            </div>
          </template>
        </VTextField>
      </VCardText>

      <!-- 分割线 -->
      <VDivider />

      <!-- Perfect Scrollbar -->
      <PerfectScrollbar
        :options="{ wheelPropagation: false, suppressScrollX: true }"
        class="h-100"
      >
        <!-- 搜索列表 -->
        <VList
          v-show="searchQuery.length && !!searchResults.length"
          ref="refSearchList"
          density="compact"
          class="app-bar-search-list"
        >
          <!-- 搜索列表项 / 列表子标题 -->
          <template
            v-for="item in searchResults"
            :key="item.title"
          >
            <VListSubheader
              v-if="'header' in item"
              class="text-disabled"
            >
              {{ resolveCategories(item.title) }}
            </VListSubheader>

            <template v-else>
              <slot
                name="searchResult"
                :item="item"
              >
                <VListItem
                  link
                  @click="$emit('itemSelected', item)"
                >
                  <template #prepend>
                    <VIcon
                      size="20"
                      :icon="item.icon"
                      class="me-3"
                    />
                  </template>

                  <template #append>
                    <VIcon
                      size="20"
                      icon="tabler-corner-down-left"
                      class="enter-icon text-disabled"
                    />
                  </template>

                  <VListItemTitle>
                    {{ item.title }}
                  </VListItemTitle>
                </VListItem>
              </slot>
            </template>
          </template>
        </VList>

        <!-- 搜索建议 -->
        <div
          v-show="!!searchResults && !searchQuery"
          class="h-100"
        >
          <slot name="suggestions">
            <VCardText class="app-bar-search-suggestions h-100 pa-10">
              <VRow
                v-if="props.suggestions"
                class="gap-y-4"
              >
                <VCol
                  v-for="suggestion in props.suggestions"
                  :key="suggestion.title"
                  cols="12"
                  sm="6"
                  class="ps-6"
                >
                  <p class="text-xs text-disabled text-uppercase">
                    {{ suggestion.title }}
                  </p>

                  <VList class="card-list">
                    <VListItem
                      v-for="item in suggestion.content"
                      :key="item.title"
                      link
                      :title="item.title"
                      class="app-bar-search-suggestion"
                      @click="$emit('itemSelected', item)"
                    >
                      <template #prepend>
                        <VIcon
                          :icon="item.icon"
                          size="20"
                          class="me-2"
                        />
                      </template>
                    </VListItem>
                  </VList>
                </VCol>
              </VRow>
            </VCardText>
          </slot>
        </div>

        <!-- 无搜索数据 -->
        <div
          v-show="!searchResults.length && searchQuery.length"
          class="h-100"
        >
          <slot name="noData">
            <VCardText class="h-100">
              <div class="app-bar-search-suggestions d-flex flex-column align-center justify-center text-high-emphasis h-100">
                <VIcon
                  size="75"
                  icon="tabler-file-x"
                />
                <div class="d-flex align-center flex-wrap justify-center gap-2 text-h6 my-3">
                  <span>未找到</span>
                  <span>"{{ searchQuery }}"</span>
                  <span>的搜索结果</span>
                </div>
                <div
                  v-if="props.noDataSuggestion"
                  class="mt-8"
                >
                  <span class="d-flex justify-center text-disabled">尝试搜索</span>
                  <h6
                    v-for="suggestion in props.noDataSuggestion"
                    :key="suggestion.title"
                    class="app-bar-search-suggestion text-sm font-weight-regular cursor-pointer mt-3"
                    @click="$emit('itemSelected', suggestion)"
                  >
                    <VIcon
                      size="20"
                      :icon="suggestion.icon"
                      class="me-3"
                    />
                    <span class="text-sm">{{ suggestion.title }}</span>
                  </h6>
                </div>
              </div>
            </VCardText>
          </slot>
        </div>
      </PerfectScrollbar>
    </VCard>
  </VDialog>
</template>

<style lang="scss">
.app-bar-search-suggestions {
  .app-bar-search-suggestion {
    &:hover {
      color: rgb(var(--v-theme-primary));
    }
  }
}

.app-bar-autocomplete-box {
  .v-field__input {
    padding-block-end: 0.425rem;
    padding-block-start: 1.16rem;
  }

  .v-field__append-inner,
  .v-field__prepend-inner {
    padding-block-start: 0.95rem;
  }

  .v-field__field input {
    text-align: start !important;
  }
}

.app-bar-search-dialog {
  .v-overlay__scrim {
    backdrop-filter: blur(4px);
  }

  .v-list-item-title {
    font-size: 0.875rem !important;
  }

  .app-bar-search-list {
    .v-list-item,
    .v-list-subheader {
      font-size: 0.75rem;
      padding-inline: 1.5rem !important;
    }

    .v-list-item {
      .v-list-item__append {
        .enter-icon {
          visibility: hidden;
        }
      }

      &:hover,
      &:active,
      &:focus {
        .v-list-item__append {
          .enter-icon {
            visibility: visible;
          }
        }
      }
    }

    .v-list-subheader {
      line-height: 1;
      min-block-size: auto;
      padding-block: 0.6875rem 0.3125rem;
      text-transform: uppercase;
    }
  }
}
</style>

<style lang="scss" scoped>
.card-list {
  --v-card-list-gap: 16px;
}
</style>
