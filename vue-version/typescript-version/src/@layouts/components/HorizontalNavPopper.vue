<script lang="ts" setup>
import { computePosition, flip, shift } from '@floating-ui/dom'
import { useLayouts } from '@layouts/composable/useLayouts'
import { config } from '@layouts/config'
import { themeConfig } from '@themeConfig'

interface Props {
  popperInlineEnd?: boolean
  tag?: string
  contentContainerTag?: string
  isRtl?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  popperInlineEnd: false,
  tag: 'div',
  contentContainerTag: 'div',
  isRTL: false,
})

const refPopperContainer = ref<HTMLElement>()
const refPopper = ref<HTMLElement>()

const popperContentStyles = ref({
  left: '0px',
  top: '0px',
})

const updatePopper = async () => {
  const { x, y } = await computePosition(refPopperContainer.value, refPopper.value, {
    placement: props.popperInlineEnd ? (props.isRtl ? 'left-start' : 'right-start') : 'bottom-start',
    middleware: [
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      flip({ boundary: document.querySelector('body')! }),
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      shift({ boundary: document.querySelector('body')! }),
    ],
  })

  popperContentStyles.value.left = `${x}px`
  popperContentStyles.value.top = `${y}px`
}

until(config.horizontalNav.type)
  .toMatch(type => type === 'static')
  .then(() => { useEventListener('scroll', updatePopper) })

const isContentShown = ref(false)

const showContent = () => {
  isContentShown.value = true
  updatePopper()
}

const hideContent = () => {
  isContentShown.value = false
}

onMounted(updatePopper)

const { isAppRtl, appContentWidth } = useLayouts()

watch([isAppRtl, appContentWidth], updatePopper)

// 监视路由变化，并在路由发生更改时关闭弹出内容
const route = useRoute()

watch(() => route.fullPath, hideContent)
</script>

<template>
  <div
    class="nav-popper"
    :class="[{
      'popper-inline-end': popperInlineEnd,
      'show-content': isContentShown,
    }]"
  >
    <div
      ref="refPopperContainer"
      class="popper-triggerer"
      @mouseenter="showContent"
      @mouseleave="hideContent"
    >
      <slot />
    </div>

    <!-- 导航下拉列表 -->
    <!-- 无弹出效果 -->
    <template v-if="!themeConfig.horizontalNav.transition">
      <div
        ref="refPopper"
        class="popper-content"
        :style="popperContentStyles"
        @mouseenter="showContent"
        @mouseleave="hideContent"
      >
        <div>
          <slot name="content" />
        </div>
      </div>
    </template>

    <!-- 有弹出效果 -->
    <template v-else-if="typeof themeConfig.horizontalNav.transition === 'string'">
      <Transition :name="themeConfig.horizontalNav.transition">
        <div
          v-show="isContentShown"
          ref="refPopper"
          class="popper-content"
          :style="popperContentStyles"
          @mouseenter="showContent"
          @mouseleave="hideContent"
        >
          <div>
            <slot name="content" />
          </div>
        </div>
      </Transition>
    </template>

    <!-- 使用主题配置弹出效果 -->
    <template v-else>
      <Component :is="themeConfig.horizontalNav.transition">
        <div
          v-show="isContentShown"
          ref="refPopper"
          class="popper-content"
          :style="popperContentStyles"
          @mouseenter="showContent"
          @mouseleave="hideContent"
        >
          <div>
            <slot name="content" />
          </div>
        </div>
      </Component>
    </template>
  </div>
</template>

<style lang="scss">
.popper-content {
  position: absolute;
}
</style>
