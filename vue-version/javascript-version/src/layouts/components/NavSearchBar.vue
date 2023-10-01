<script setup>
import Shepherd from 'shepherd.js'
import axios from '@axios'
import { useThemeConfig } from '@core/composable/useThemeConfig'

const { appContentLayoutNav } = useThemeConfig()

defineOptions({ inheritAttrs: false })

// 搜索栏是否可见
const isAppSearchBarVisible = ref(false)

// 默认搜索建议
const suggestionGroups = [
  {
    title: '热门搜索',
    content: [
      {
        icon: 'tabler-chart-donut',
        title: '数据模板',
        url: { name: 'dashboards-analytics' },
      },
      {
        icon: 'tabler-chart-bubble',
        title: 'CRM 客户关系模板',
        url: { name: 'dashboards-crm' },
      },
      {
        icon: 'tabler-file',
        title: '发票列表',
        url: { name: 'apps-invoice-list' },
      },
      {
        icon: 'tabler-users',
        title: '用户列表',
        url: { name: 'apps-user-list' },
      },
    ],
  },
  {
    title: '应用 & 页面',
    content: [
      {
        icon: 'tabler-calendar',
        title: '日历',
        url: { name: 'apps-calendar' },
      },
      {
        icon: 'tabler-file-plus',
        title: '添加发票',
        url: { name: 'apps-invoice-add' },
      },
      {
        icon: 'tabler-currency-yuan',
        title: '定价',
        url: { name: 'pages-pricing' },
      },
      {
        icon: 'tabler-user',
        title: '账户设置',
        url: {
          name: 'pages-account-settings-tab',
          params: { tab: 'account' },
        },
      },
    ],
  },
  {
    title: 'UI 元素',
    content: [
      {
        icon: 'tabler-letter-a',
        title: 'Typography 排版',
        url: { name: 'pages-typography' },
      },
      {
        icon: 'tabler-square',
        title: 'Tabs 选项卡',
        url: { name: 'components-tabs' },
      },
      {
        icon: 'tabler-hand-click',
        title: 'Buttons 按钮',
        url: { name: 'components-button' },
      },
      {
        icon: 'tabler-keyboard',
        title: 'Statistics 统计卡片',
        url: { name: 'pages-cards-card-statistics' },
      },
    ],
  },
  {
    title: '表单组件',
    content: [
      {
        icon: 'tabler-list',
        title: 'Select 下拉选择框',
        url: { name: 'forms-select' },
      },
      {
        icon: 'tabler-space',
        title: 'Combobox 组合框',
        url: { name: 'forms-combobox' },
      },
      {
        icon: 'tabler-calendar',
        title: '日期时间选择器',
        url: { name: 'forms-date-time-picker' },
      },
      {
        icon: 'tabler-hexagon',
        title: 'Rating 评分',
        url: { name: 'forms-rating' },
      },
    ],
  },
]

// 无数据建议
const noDataSuggestions = [
  {
    title: '数据模板',
    icon: 'tabler-shopping-cart',
    url: { name: 'dashboards-analytics' },
  },
  {
    title: '账户设置',
    icon: 'tabler-user',
    url: {
      name: 'pages-account-settings-tab',
      params: { tab: 'account' },
    },
  },
  {
    title: '定价页',
    icon: 'tabler-cash',
    url: { name: 'pages-pricing' },
  },
]

const searchQuery = ref('')
const searchResult = ref([])
const router = useRouter()

// 提取搜索结果 API
watchEffect(() => {
  axios.get('/app-bar/search', { params: { q: searchQuery.value } }).then(response => {
    searchResult.value = response.data
  })
})

// 重定向至所选页面
const redirectToSuggestedOrSearchedPage = selected => {
  router.push(selected.url)
  isAppSearchBarVisible.value = false
  searchQuery.value = ''
}

const LazyAppBarSearch = defineAsyncComponent(() => import('@core/components/AppBarSearch.vue'))
</script>

<template>
  <div
    class="d-flex align-center cursor-pointer"
    v-bind="$attrs"
    style="user-select: none;"
    @click="isAppSearchBarVisible = !isAppSearchBarVisible"
  >
    <!-- 搜索触发器按钮 -->
    <!-- 打开搜索栏时关闭活动的导览 -->
    <IconBtn
      class="me-1"
      @click="Shepherd.activeTour?.cancel()"
    >
      <VIcon
        size="26"
        icon="tabler-search"
      />
    </IconBtn>

    <span
      v-if="appContentLayoutNav === 'vertical'"
      class="d-none d-md-flex align-center text-disabled"
      @click="Shepherd.activeTour?.cancel()"
    >
      <span class="me-3">搜索</span>
      <span class="meta-key">Ctrl + K</span>
    </span>
  </div>

  <!-- 应用栏搜索 -->
  <LazyAppBarSearch
    v-model:isDialogVisible="isAppSearchBarVisible"
    v-model:search-query="searchQuery"
    :search-results="searchResult"
    :suggestions="suggestionGroups"
    :no-data-suggestion="noDataSuggestions"
    @item-selected="redirectToSuggestedOrSearchedPage"
  >
    <!--
      <template #suggestions>
      如果要重写默认的搜索建议，请使用此插槽
      </template>
    -->

    <!--
      <template #noData>
      如果要修改无数据建议时的视图，请使用此插槽
      </template>
    -->

    <!--
      <template #searchResult="{ item }">
      如果要更改搜索项，使用此插槽
      </template>
    -->
  </LazyAppBarSearch>
</template>

<style lang="scss" scoped>
@use "@styles/variables/_vuetify.scss";

.meta-key {
  border: thin solid rgba(var(--v-border-color), var(--v-border-opacity));
  border-radius: 6px;
  block-size: 1.5625rem;
  line-height: 1.3125rem;
  padding-block: 0.125rem;
  padding-inline: 0.25rem;
}
</style>
