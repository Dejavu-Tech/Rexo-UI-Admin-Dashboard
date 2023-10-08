<script setup lang="ts">
import safeBoxWithGoldenCoin from '@images/misc/3d-safe-box-with-golden-dollar-coins.png'
import spaceRocket from '@images/misc/3d-space-rocket-with-smoke.png'
import dollarCoinPiggyBank from '@images/misc/dollar-coins-flying-pink-piggy-bank.png'

interface Pricing {
  title?: string
  xs?: number | string
  sm?: number | string
  md?: string | number
  lg?: string | number
  xl?: string | number
}

const props = defineProps<Pricing>()

const annualMonthlyPlanPriceToggler = ref(true)

const pricingPlans = [
  {
    name: '基础版',
    tagLine: '适合初学者学习入门',
    logo: dollarCoinPiggyBank,
    monthlyPrice: 0,
    yearlyPrice: 0,
    isPopular: false,
    current: true,
    features: [
      '每月 50 M API 请求',
      '无限制文本长度',
      '基本表单创建工具',
      '3 套自定义页面',
      '最多 2 个子域名',
    ],
  },
  {
    name: '标准版',
    tagLine: '适用于中小企业 / 团队',
    logo: safeBoxWithGoldenCoin,
    monthlyPrice: 129,
    yearlyPrice: 1100,
    isPopular: true,
    current: false,
    features: [
      '无限 API 请求',
      '无限制表单',
      '个性化个人主页',
      '高级文档集成',
      '全套自定义页面',
    ],
  },
  {
    name: '企业版',
    tagLine: '大型组织的解决方案',
    logo: spaceRocket,
    monthlyPrice: 600,
    yearlyPrice: 5000,
    isPopular: false,
    current: false,
    features: [
      '1000 人在线协同',
      '专属 Git 库',
      '50 GB 对象存储',
      '自定义域名支持',
      '支付插件集成',
    ],
  },
]
</script>

<template>
  <!-- 标题和子标题 -->
  <div class="text-center">
    <h4 class="text-h2 pricing-title mb-4">
      {{ props.title ? props.title : '定价' }}
    </h4>
    <p class="mb-0">
      所有订阅计划都包括 40 多个模板和功能，以提升您的产品开发体验
    </p>
    <p>请选择适合您的订阅计划</p>
  </div>

  <!-- 年度和月度价格切换器 -->
  <div class="d-flex align-center justify-center mx-auto my-10">
    <VLabel
      for="pricing-plan-toggle"
      class="me-2"
    >
      按月
    </VLabel>

    <div class="position-relative">
      <VSwitch
        id="pricing-plan-toggle"
        v-model="annualMonthlyPlanPriceToggler"
        label="按年"
      />

      <div class="save-upto-chip position-absolute align-center d-none d-md-flex gap-1">
        <VIcon
          icon="tabler-corner-left-down"
          class="flip-in-rtl"
        />
        <VChip
          label
          color="primary"
        >
          节省 10%
        </VChip>
      </div>
    </div>
  </div>

  <!-- 定价 -->
  <VRow>
    <VCol
      v-for="plan in pricingPlans"
      :key="plan.logo"
      v-bind="props"
      cols="12"
    >
      <!-- 价格卡片 -->
      <VCard
        flat
        border
        :class="plan.isPopular ? 'border-primary border-opacity-100' : ''"
      >
        <VCardText
          style="block-size: 4.125rem;"
          class="text-end"
        >
          <!-- 最受欢迎 -->
          <VChip
            v-show="plan.isPopular"
            label
            color="primary"
            size="small"
          >
            最受欢迎
          </VChip>
        </VCardText>

        <!-- 版本 LOGO -->
        <VCardText class="text-center">
          <VImg
            :height="140"
            :src="plan.logo"
            class="mx-auto mb-5"
          />

          <!-- 版本名称 -->
          <h5 class="text-h5 mb-2">
            {{ plan.name }}
          </h5>
          <p class="mb-0">
            {{ plan.tagLine }}
          </p>
        </VCardText>

        <!-- 版本价格 -->
        <VCardText class="position-relative text-center">
          <div class="d-flex justify-center align-center">
            <sup class="text-sm font-weight-medium me-1">￥</sup>
            <h1 class="text-5xl font-weight-medium text-primary">
              {{ annualMonthlyPlanPriceToggler ? Math.floor(Number(plan.yearlyPrice) / 12) : plan.monthlyPrice }}
            </h1>
            <sub class="text-sm font-weight-medium ms-1 mt-4"> / 月</sub>
          </div>

          <!-- 按年价格 -->
          <span
            v-show="annualMonthlyPlanPriceToggler"
            class="position-absolute text-caption font-weight-medium mt-1"
            style="inset-inline: 0;"
          >
            {{ plan.yearlyPrice === 0 ? '免费' : `￥${plan.yearlyPrice} / 年` }}
          </span>
        </VCardText>

        <!-- 版本特色 -->
        <VCardText class="mt-5">
          <VList class="card-list">
            <VListItem
              v-for="feature in plan.features"
              :key="feature"
            >
              <template #prepend>
                <VIcon
                  :size="14"
                  icon="tabler-circle"
                  class="me-3"
                />
              </template>

              <VListItemTitle>
                {{ feature }}
              </VListItemTitle>
            </VListItem>
          </VList>
        </VCardText>

        <!-- 按钮 -->
        <VCardActions>
          <VBtn
            block
            :color="plan.current ? 'success' : 'primary'"
            :variant="plan.isPopular ? 'elevated' : 'tonal'"
          >
            {{ plan.yearlyPrice === 0 ? '您当前的订阅计划' : '升级' }}
          </VBtn>
        </VCardActions>
      </VCard>
    </VCol>
  </VRow>
</template>

<style lang="scss" scoped>
.card-list {
  --v-card-list-gap: 0.75rem;
}

.save-upto-chip {
  inset-block-start: -1.5rem;
  inset-inline-end: -5rem;
}
</style>
