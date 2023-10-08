import type { HorizontalNavItems } from '@layouts/types'

export default [
  {
    title: '主页',
    to: { name: 'index' },
    icon: { icon: 'tabler-smart-home' },
  },
  {
    title: '第二页',
    to: { name: 'second-page' },
    icon: { icon: 'tabler-file' },
  },
] as HorizontalNavItems
