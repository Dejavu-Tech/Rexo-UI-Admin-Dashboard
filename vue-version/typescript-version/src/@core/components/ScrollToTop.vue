<script setup lang="ts">
const { y } = useWindowScroll()

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}
</script>

<template>
  <VScaleTransition
    style="transform-origin: center;"
    class="scroll-to-top d-print-none"
  >
    <VBtn
      v-show="y > 200"
      icon
      density="comfortable"
      @click="scrollToTop"
    >
      <VIcon
        size="22"
        icon="tabler-arrow-up"
      />
    </VBtn>
  </VScaleTransition>
</template>

<style lang="scss">
.scroll-to-top {
  position: fixed !important;

  // 在 v-layout 中保持滚动到顶部按钮置于顶层
  z-index: 999;
  inset-block-end: 5%;
  inset-inline-end: 25px;
}
</style>
