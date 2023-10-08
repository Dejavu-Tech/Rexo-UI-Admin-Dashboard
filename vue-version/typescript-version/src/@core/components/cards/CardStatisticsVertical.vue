<script setup lang="ts">
import VueApexCharts from 'vue3-apexcharts'

interface Props {
  title: string
  color?: string
  icon: string
  stats: string
  height: number
  series: unknown[]
  chartOptions: unknown
}

const props = withDefaults(defineProps<Props>(), {
  color: 'primary',
})
</script>

<template>
  <VCard>
    <VCardText class="d-flex flex-column pb-0">
      <VAvatar
        v-if="props.icon"
        size="42"
        variant="tonal"
        :color="props.color"
        :icon="props.icon"
        class="mb-3"
      />

      <h6 class="text-lg font-weight-medium">
        {{ props.stats }}
      </h6>
      <span class="text-sm">{{ props.title }}</span>
    </VCardText>

    <VueApexCharts
      :series="props.series"
      :options="props.chartOptions"
      :height="props.height"
    />
  </VCard>
</template>
