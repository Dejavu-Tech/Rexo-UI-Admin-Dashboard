<script setup lang="ts">
interface Item {
  title: string
  icon?: string
  size?: string
  subtitle?: string
}

type Direction = 'vertical' | 'horizontal'

interface Props {
  items: Item[]
  currentStep?: number
  direction?: Direction
  iconSize?: string | number
  isActiveStepValid?: boolean
}

interface Emit {
  (e: 'update:currentStep', value: number): void
}

const props = withDefaults(defineProps<Props>(), {
  currentStep: 0,
  direction: 'horizontal',
  iconSize: 52,
  isActiveStepValid: undefined,
})

const emit = defineEmits<Emit>()

const currentStep = ref(props.currentStep || 0)

const activeOrCompletedStepsClasses = computed(() => (index: number) => (
  index < currentStep.value
    ? 'stepper-steps-completed'
    : index === currentStep.value ? 'stepper-steps-active' : ''
))

const isHorizontalAndNotLastStep = computed(() => (index: number) => (
  props.direction === 'horizontal'
  && props.items.length - 1 !== index
))

// 检查是否启用验证
const isValidationEnabled = computed(() => {
  return props.isActiveStepValid !== undefined
})

watchEffect(() => {
  if (
    props.currentStep !== undefined
    && props.currentStep < props.items.length
    && props.currentStep >= 0
  )
    currentStep.value = props.currentStep

  emit('update:currentStep', currentStep.value)
})
</script>

<template>
  <VSlideGroup
    v-model="currentStep"
    class="app-stepper"
    show-arrows
    :direction="props.direction"
  >
    <VSlideGroupItem
      v-for="(item, index) in props.items"
      :key="item.title"
      :value="index"
    >
      <div
        class="cursor-pointer mx-1"
        :class="[
          (!props.isActiveStepValid && (isValidationEnabled)) && 'stepper-steps-invalid',
          activeOrCompletedStepsClasses(index),
        ]"
        @click="!isValidationEnabled && emit('update:currentStep', index)"
      >
        <!-- 带有图标的步骤 -->
        <template v-if="item.icon">
          <div class="stepper-icon-step text-high-emphasis d-flex align-center gap-2">
            <!-- 图标 / 标题 -->
            <div
              class="d-flex align-center gap-4 step-wrapper"
              :class="[props.direction === 'horizontal' && 'flex-column']"
            >
              <div class="stepper-icon">
                <VIcon
                  :icon="item.icon"
                  :size="item.size || props.iconSize"
                />
              </div>

              <div>
                <p class="stepper-title font-weight-medium mb-0">
                  {{ item.title }}
                </p>
                <span
                  v-if="item.subtitle"
                  class="stepper-subtitle"
                >
                  <span class="text-sm">{{ item.subtitle }}</span>
                </span>
              </div>
            </div>

            <!-- 非最后一步添加箭头（chevron） -->
            <VIcon
              v-if="isHorizontalAndNotLastStep(index)"
              class="flip-in-rtl stepper-chevron-indicator mx-6"
              size="24"
              icon="tabler-chevron-right"
            />
          </div>
        </template>

        <!-- 不带图标的步骤 -->
        <template v-else>
          <div class="d-flex align-center gap-x-2">
            <div class="d-flex align-center gap-2">
              <div
                class="d-flex align-center justify-center"
                style="block-size: 24px; inline-size: 24px;"
              >
                <!-- 自定义圆形图标 -->
                <template v-if="index >= currentStep">
                  <div
                    v-if="(!isValidationEnabled || props.isActiveStepValid || index !== currentStep)"
                    class="stepper-step-indicator"
                  />

                  <VIcon
                    v-else
                    icon="tabler-alert-circle"
                    size="24"
                    color="error"
                  />
                </template>

                <!-- 步骤完成图标 -->
                <VIcon
                  v-else
                  icon="custom-check-circle"
                  class="stepper-step-icon"
                  size="24"
                />
              </div>

              <!-- 步骤编号 -->
              <h4 class="text-h4 step-number">
                {{ (index + 1).toString().padStart(2, '0') }}
              </h4>
            </div>

            <!-- 标题和子标题 -->
            <div style="line-height: 0;">
              <h6 class="text-sm font-weight-medium step-title">
                {{ item.title }}
              </h6>

              <span
                v-if="item.subtitle"
                class="text-xs step-subtitle"
              >
                {{ item.subtitle }}
              </span>
            </div>

            <!-- 步骤线 -->
            <div
              v-if="isHorizontalAndNotLastStep(index)"
              class="stepper-step-line"
            />
          </div>
        </template>
      </div>
    </VSlideGroupItem>
  </VSlideGroup>
</template>

<style lang="scss">
.app-stepper {
  // 步骤背景颜色
  &.stepper-icon-step-bg {
    .stepper-icon-step {
      .step-wrapper {
        flex-direction: row !important;
      }

      .stepper-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 0.3125rem;
        background-color: rgba(var(--v-theme-on-surface), var(--v-selected-opacity));
        block-size: 2.5rem;
        color: rgba(var(--v-theme-on-surface), var(--v-high-emphasis-opacity));
        inline-size: 2.5rem;
        margin-inline-end: 0.3rem;
      }

      .stepper-title,
      .stepper-subtitle {
        line-height: normal;
      }

      .stepper-title {
        color: rgba(var(--v-theme-on-surface), var(--v-high-emphasis-opacity));
        font-size: 0.9375rem;
        font-weight: 500 !important;
      }

      .stepper-subtitle {
        color: rgba(var(--v-theme-on-surface), var(--v-disabled-opacity));
        font-size: 0.875rem;
      }
    }

    .stepper-steps-active {
      .stepper-icon-step {
        .stepper-icon {
          background-color: rgb(var(--v-theme-primary));
          color: rgba(var(--v-theme-on-primary));
        }
      }
    }

    .stepper-steps-completed {
      .stepper-icon-step {
        .stepper-icon {
          background: rgba(var(--v-theme-primary), 0.08);
          color: rgba(var(--v-theme-primary));
        }
      }
    }
  }

  // 带图标和默认样式的步骤
  .v-slide-group__content {
    justify-content: center;
    row-gap: 1.5rem;

    .stepper-step-indicator {
      border: 0.3125rem solid rgb(var(--v-theme-primary));
      border-radius: 50%;
      background-color: rgb(var(--v-theme-surface));
      block-size: 1.25rem;
      inline-size: 1.25rem;
      opacity: var(--v-activated-opacity);
    }

    .stepper-step-line {
      border-radius: 0.1875rem;
      background-color: rgb(var(--v-theme-primary));
      block-size: 0.1875rem;
      inline-size: 3.75rem;
      opacity: var(--v-activated-opacity);
    }

    .stepper-chevron-indicator {
      color: rgba(var(--v-theme-on-surface), var(--v-disabled-opacity));
    }

    .stepper-steps-completed,
    .stepper-steps-active {
      .stepper-icon-step,
      .stepper-step-icon {
        color: rgb(var(--v-theme-primary)) !important;
      }

      .stepper-step-indicator {
        opacity: 1;
      }
    }

    .stepper-steps-completed {
      .stepper-step-line {
        opacity: 1;
      }

      .stepper-chevron-indicator {
        color: rgb(var(--v-theme-primary));
      }
    }

    .stepper-steps-invalid.stepper-steps-active {
      .stepper-icon-step,
      .step-number,
      .step-title,
      .step-subtitle {
        color: rgb(var(--v-theme-error)) !important;
      }
    }
  }
}
</style>
