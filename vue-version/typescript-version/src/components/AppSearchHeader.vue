<script setup lang="ts">
import AppSearchHeaderBg from '@images/pages/header-bg.png'

interface Props {
  title?: string
  subtitle?: string
  customClass?: string
}

const props = defineProps<Props>()

defineOptions({
  inheritAttrs: false,
})
</script>

<template>
  <!-- 搜索横幅 -->
  <VCard
    flat
    class="text-center search-header"
    :class="props.customClass"
    :style="`background: url(${AppSearchHeaderBg});`"
  >
    <VCardText>
      <h5 class="text-h3 font-weight-medium">
        {{ props.title }}
      </h5>

      <!-- 搜索框 -->
      <AppTextField
        v-bind="$attrs"
        placeholder="搜索问题..."
        class="search-header-input mx-auto my-3"
        density="comfortable"
      >
        <template #prepend-inner>
          <VIcon
            icon="tabler-search"
            size="23"
          />
        </template>
      </AppTextField>

      <p class="mb-0">
        {{ props.subtitle }}
      </p>
    </VCardText>
  </VCard>
</template>

<style lang="scss">
.search-header {
  padding: 4rem !important;
  background-size: cover !important;
}

// 搜索框
.search-header-input {
  border-radius: 0.25rem !important;
  border-radius: 0.375rem !important;
  background-color: rgb(var(--v-theme-surface));
  max-inline-size: 40.125rem !important;

  .v-field__prepend-inner {
    i {
      inset-block-start: 3px !important;
    }
  }
}

@media (max-width: 37.5rem) {
  .search-header {
    padding: 1.5rem !important;
  }
}
</style>
