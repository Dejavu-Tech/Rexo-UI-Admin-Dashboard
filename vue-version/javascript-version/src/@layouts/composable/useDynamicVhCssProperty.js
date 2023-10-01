// 解决在移动设备上使用 vh 时的兼容性问题，参考：https://css-tricks.com/the-trick-to-viewport-units-on-mobile/
export const useDynamicVhCssProperty = () => {
  const vh = ref(0)

  const updateVh = () => {
    vh.value = window.innerHeight * 0.01
    document.documentElement.style.setProperty('--vh', `${vh.value}px`)
  }

  tryOnBeforeMount(() => {
    updateVh()
    useEventListener('resize', updateVh)
  })
}
