<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: false,
    default: 'primary',
  },
  icon: {
    type: String,
    required: true,
  },
  stats: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <VCard>
    <VCardText class="d-flex flex-column align-center justify-center">
      <VAvatar
        v-if="props.icon"
        size="42"
        variant="tonal"
        :color="props.color"
      >
        <VIcon :icon="props.icon" />
      </VAvatar>

      <h5 class="text-h5 my-2">
        {{ props.stats }}
      </h5>
      <span class="text-body-2">{{ props.title }}</span>
    </VCardText>
  </VCard>
</template>
