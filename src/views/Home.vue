<template>
  <div>
    <b-card title="欢迎使用 Rexo-UI - VueJS & HTML 网站/后台管理模板 🚀">
      <b-card-text>此 DEMO 为 Rexo-UI Vue + BootstrapVue 版的基础版</b-card-text>
      <b-card-text>请务必阅读
        <b-link
          href="https://docs.rexoui.com/vuebsv/"
          target="_blank"
        >
          开发文档
        </b-link>以了解如何使用模板和详细的开发流程。同时 Rexo-UI 还有
        <b-link
          href="https://rexoui.com/vueh5/"
          target="_blank"
        >
          H5 版
        </b-link>和正在开发的
        <b-link
          href="https://rexoui.com/vueep/"
          target="_blank"
        >
          Vue 3 + Element-plus 版
        </b-link>。
      </b-card-text>
    </b-card>

    <b-card title="需要常规版的 Rexo-UI ?">
      <b-card-text>请移步至<b-link
        href="https://rexoui.com/"
        target="_blank"
      >
        Rexo-UI 官网
      </b-link>限时特价购买。</b-card-text>
      <b-card-text>常规版包含完整的用户验证（Auth + ACL 鉴权）、界面定制器、i18n 组件多语言国际化、Axios 和多达 200 多种定制页面/卡片/组件。</b-card-text>
    </b-card>
  </div>
</template>

<script>
import { BCard, BCardText, BLink } from 'bootstrap-vue'

export default {
  components: {
    BCard,
    BCardText,
    BLink,
  },
}
</script>

<style>

</style>
