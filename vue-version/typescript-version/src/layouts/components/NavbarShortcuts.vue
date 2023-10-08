<script setup lang="ts">
const shortcuts = [
  {
    icon: 'tabler-calendar',
    title: '日历',
    subtitle: '提醒事项',
    to: { name: 'apps-calendar' },
  },
  {
    icon: 'tabler-file',
    title: '发票',
    subtitle: '发票管理',
    to: { name: 'apps-invoice-list' },
  },
  {
    icon: 'tabler-user',
    title: '用户',
    subtitle: '用户管理',
    to: { name: 'apps-user-list' },
  },
  {
    icon: 'tabler-layout',
    title: '模板',
    subtitle: '数据可视化',
    to: { name: 'dashboards-analytics' },
  },
  {
    icon: 'tabler-settings',
    title: '设置',
    subtitle: '账户设置',
    to: { name: 'pages-account-settings-tab', params: { tab: 'account' } },
  },
  {
    icon: 'tabler-help',
    title: '帮助中心',
    subtitle: '常见问题与解答',
    to: { name: 'pages-help-center' },
  },
]
</script>

<template>
  <Shortcuts :shortcuts="shortcuts" />
</template>
