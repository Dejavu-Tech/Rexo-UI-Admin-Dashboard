import { createLayouts } from '@layouts'
import '@layouts/styles/index.scss'
import { layoutConfig } from '@themeConfig'

// ℹ️ 调用 createLayouts 从 themeConfig 中传参，以避免重复编写布局配置
export default createLayouts(layoutConfig)
