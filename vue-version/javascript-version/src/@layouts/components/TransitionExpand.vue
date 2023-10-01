<script>
import { Transition } from 'vue'

// 导航动画过渡，参考：https://markus.oberlehner.net/blog/transition-to-height-auto-with-vue/
export default defineComponent({
  name: 'TransitionExpand',
  setup(_, { slots }) {
    const onEnter = element => {
      const width = getComputedStyle(element).width

      element.style.width = width
      element.style.position = 'absolute'
      element.style.visibility = 'hidden'
      element.style.height = 'auto'

      const height = getComputedStyle(element).height

      element.style.width = ''
      element.style.position = ''
      element.style.visibility = ''
      element.style.height = '0px'

      // 强制重绘高度以确保动画已正确触发
      // eslint-disable-next-line no-unused-expressions
      getComputedStyle(element).height

      // 设置高度为 0px 后浏览器会立即设置高度可能会导致动画无法正常触发
      // 使用 requestAnimationFrame 来确保在浏览器绘制完成后再执行动画
      requestAnimationFrame(() => {
        element.style.height = height
      })
    }

    const onAfterEnter = element => {
      element.style.height = 'auto'
    }

    const onLeave = element => {
      const height = getComputedStyle(element).height

      element.style.height = height

      // 强制重绘高度以确保动画已正确触发
      // eslint-disable-next-line no-unused-expressions
      getComputedStyle(element).height
      requestAnimationFrame(() => {
        element.style.height = '0px'
      })
    }

    return () => h(h(Transition), {
      name: 'expand',
      onEnter,
      onAfterEnter,
      onLeave,
    }, () => slots.default?.())
  },
})
</script>

<style>
.expand-enter-active,
.expand-leave-active {
  overflow: hidden;
  transition: block-size var(--expand-transition-duration, 0.25s) ease;
}

.expand-enter-from,
.expand-leave-to {
  block-size: 0;
}
</style>

<style scoped>
* {
  backface-visibility: hidden;
  perspective: 1000px;
  transform: translateZ(0);
  will-change: block-size;
}
</style>
