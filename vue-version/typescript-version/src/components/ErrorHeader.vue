<script setup lang="ts">
interface Props {
  errorCode?: string
  errorTitle?: string
  errorDescription?: string
}

const props = defineProps<Props>()
</script>

<template>
  <div class="text-center">
    <!-- 标题和子标题 -->
    <h1
      v-if="props.errorCode"
      class="text-h1 font-weight-medium"
    >
      {{ props.errorCode }}
    </h1>
    <h4
      v-if="props.errorTitle"
      class="text-h4 font-weight-medium mb-3"
    >
      {{ props.errorTitle }}
    </h4>
    <p v-if="props.errorDescription">
      {{ props.errorDescription }}
    </p>
  </div>
</template>
