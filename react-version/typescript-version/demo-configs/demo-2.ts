/**
 * 模板主题配置
 * ---------------------------------------------------------------------------------------------!
 * 提示：更改主题配置后请确保清除浏览器 localstorage，否则将无法预览更改后的配置
 * 清理本地存储请参阅：https://www.leadshook.comhelphow-to-clear-local-storage-in-google-chrome-browser
 * 模板 DEMO 的六个配置文件位于 demo-configs/demo-*.ts，可根据主题需要更名为 themeConfig.ts 并覆盖本文件
 */

// 导入 Material-UI
import { Direction } from '@mui/material'

// 导入 TS 类型
import {
  Skin,
  Mode,
  AppBar,
  Footer,
  ContentWidth,
  VerticalNavToggle,
  HorizontalMenuToggle
} from 'src/@core/layouts/types'

type ThemeConfig = {
  skin: Skin
  mode: Mode
  appBar: AppBar
  footer: Footer
  navHidden: boolean
  appBarBlur: boolean
  direction: Direction
  templateName: string
  navCollapsed: boolean
  routingLoader: boolean
  disableRipple: boolean
  navigationSize: number
  navSubItemIcon: string
  menuTextTruncate: boolean
  contentWidth: ContentWidth
  disableCustomizer: boolean
  responsiveFontSizes: boolean
  collapsedNavigationSize: number
  horizontalMenuAnimation: boolean
  layout: 'vertical' | 'horizontal'
  verticalNavToggleType: VerticalNavToggle
  horizontalMenuToggle: HorizontalMenuToggle
  afterVerticalNavMenuContentPosition: 'fixed' | 'static'
  beforeVerticalNavMenuContentPosition: 'fixed' | 'static'
  toastPosition: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'
}

const themeConfig: ThemeConfig = {
  // 布局配置
  templateName: 'Rexo-UI' /* 应用名称 */,
  layout: 'vertical' /* vertical | horizontal （垂直导航 | 水平导航）*/,
  mode: 'light' as Mode /* light | dark | semi-dark （外观：浅色 | 深色 | 混合（深色导航栏 + 浅色内容））！混合外观只适用于垂直导航布局 */,
  direction: 'ltr' /* ltr | rtl （文本方向：从左到右 | 从右到左）*/,
  skin: 'bordered' /* default | bordered （皮肤：立体阴影 (默认) | 平面线框）*/,
  contentWidth: 'full' /* full | boxed （内容宽度：自适应 | 固定）*/,
  footer: 'static' /* fixed | static | hidden （页脚：粘性定位 | 静态定位 | 隐藏）*/,

  // 路由配置
  routingLoader: true /* true | false （路由加载效果）*/,

  // 导航配置
  navHidden: false /* true | false （是否隐藏导航）*/,
  menuTextTruncate: true /* true | false （溢出文本是否显示省略号）*/,
  navSubItemIcon: 'tabler:circle' /* 导航子项图标 */,
  verticalNavToggleType: 'collapse' /* accordion | collapse （导航项展开时其他展开项：折叠 | 不折叠）！只适用于垂直导航布局 */,
  navCollapsed: false /* true | false （导航栏是否折叠）！只适用于垂直导航布局 */,
  navigationSize: 260 /* 非折叠态导航栏宽度（，单位：px） ！只适用于垂直导航布局 */,
  collapsedNavigationSize: 75 /* 折叠态导航栏宽度（单位：px) ！只适用于垂直导航布局 */,
  afterVerticalNavMenuContentPosition: 'fixed' /* fixed | static （导航栏底部内容定位：随导航滚动 | 固定）！只适用于垂直导航布局 */,
  beforeVerticalNavMenuContentPosition: 'fixed' /* fixed | static （导航栏顶部内容定位：随导航滚动 | 固定）！只适用于垂直导航布局 */,
  horizontalMenuToggle: 'hover' /* click | hover （导航项展开模式：鼠标悬停 | 点击）！只适用于水平导航布局 */,
  horizontalMenuAnimation: true /* true | false （导航项展开是否有动画效果）！只适用于水平导航布局 */,

  // 应用栏配置
  appBar: 'fixed' /* fixed | static | hidden （应用栏：粘性定位 | 静态定位 | 隐藏）！只适用于垂直导航布局 */,
  appBarBlur: true /* true | false （是否有应用栏滤镜（毛玻璃效果））*/,

  // 其他配置
  responsiveFontSizes: false /* true | false （是否启用 Material-UI 自动调整字体大小）*/,
  disableRipple: false /* true | false （是否禁用 Material-UI 按钮、图标等组件点击时显示涟漪效果）*/,
  disableCustomizer: false /* true | false （是否禁用模板主题定制器）*/,
  toastPosition: 'top-right' /* top-left | top-center | top-right | bottom-left | bottom-center | bottom-right */
}

export default themeConfig
