<template>
  <div class="h-100 d-flex align-center justify-end">
    <!-- 页脚右侧内容 -->
    <span class="d-md-flex gap-x-4 text-primary d-none px-5">
      <a
        href="https://github.com/Dejavu-Tech/Rexo-UI-Admin-Dashboard"
        target="noopener noreferrer"
      >License</a>
      <a
        href="http://wpa.qq.com/msgrd?v=3&uin=142997&site=qq&menu=yes"
        target="noopener noreferrer"
      >销售/技术支持</a>
      <a
        href="https://rexoui.com/"
        target="noopener noreferrer"
      >Rexo-UI 文档</a>
    </span>
    <span class="d-flex align-center">
      &copy;
      {{ new Date().getFullYear() }}
      <a
        href="https://rexotech.cn"
        target="_blank"
        rel="noopener noreferrer"
        class="text-primary ms-1"
      >Dejavu Tech.</a>
      <VIcon
        icon="tabler-heart"
        color="error"
        size="1.25rem"
        class="mx-1"
      />
    </span>
  </div>
</template>
