<template>
  <p class="clearfix mb-0">
    <span class="float-md-left d-block d-md-inline-block mt-25">
      COPYRIGHT  © 2019 - {{ new Date().getFullYear() }}
      <b-link
        class="ml-25"
        href="https://www.rexotech.cn"
        target="_blank"
      >Dejavu Tech.</b-link>
      <span class="d-none d-sm-inline-block">, 设计开发 & 版权所有</span>
    </span>

    <span class="float-md-right d-none d-md-block">Rexo-UI 管理模板
      <feather-icon
        icon="HeartIcon"
        size="21"
        class="text-danger stroke-current"
      />
    </span>
  </p>
</template>

<script>
import { BLink } from 'bootstrap-vue'

export default {
  components: {
    BLink,
  },
}
</script>
