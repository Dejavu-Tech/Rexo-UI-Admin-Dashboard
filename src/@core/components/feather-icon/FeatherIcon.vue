<script>
import * as icons from 'vue-feather-icons'

export default {
  name: 'FeatherIcon',
  functional: true,
  props: {
    icon: {
      required: true,
      type: [String, Object],
    },
    size: {
      type: String,
      default: '14',
    },
    badge: {
      type: [String, Object, Number],
      default: null,
    },
    badgeClasses: {
      type: [String, Object, Array],
      default: 'badge-primary',
    },
  },
  render(h, { props, data }) {
    // 创建羽毛图标
    const svg = h(icons[props.icon], { props: { size: props.size }, ...data })

    // 无徽章时只渲染 SVG
    if (!props.badge) return svg

    // 有徽章
    const badgeEl = h('span', { staticClass: 'badge badge-up badge-pill', class: props.badgeClasses }, [props.badge])

    // 子元素返回 span
    return h('span', { staticClass: 'feather-icon position-relative' }, [svg, badgeEl])
  },
}
</script>

<style lang="scss">
svg.feather {
  outline: none
}
</style>
