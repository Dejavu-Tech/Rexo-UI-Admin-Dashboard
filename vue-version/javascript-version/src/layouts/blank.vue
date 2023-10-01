<script>
import { useSkins } from '@core/composable/useSkins'

export default defineComponent({
  setup() {
    const routerView = resolveComponent('router-view')
    const { injectSkinClasses } = useSkins()

    // 调用 injectSkinClasses() 方法将样式相关的类名注入到 body 标签中，以准确地应用样式
    injectSkinClasses()
    
    return () => h('div', { class: 'layout-wrapper layout-blank' }, h(routerView))
  },
})
</script>

<style>
.layout-wrapper.layout-blank {
  flex-direction: column;
}
</style>
