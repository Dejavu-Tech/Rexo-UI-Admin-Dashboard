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
    <VCardText class="d-flex align-center justify-space-between">
      <div>
        <div class="d-flex align-center flex-wrap">
          <span class="text-h5">{{ props.stats }}</span>
        </div>
        <span class="text-body-2">{{ props.title }}</span>
      </div>

      <VAvatar
        :icon="props.icon"
        :color="props.color"
        :size="42"
        variant="tonal"
      />
    </VCardText>
  </VCard>
</template>
