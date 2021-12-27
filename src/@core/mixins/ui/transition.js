export const heightTransition = {
  /*
    1. 设置适当的过渡速度值：`transition: 0.35s height;`
    2. 可选择设置高度动画时隐藏元素溢出：`overflow: hidden;`
    3. 在进行任何操作之前，设置元素动态初始高度为：`trSetHeight`，建议安装钩子以使用 'ref' 作为动态内容
    5. 如果浏览器出现任何问题，则使用 $nextTick 切换高度（未全面验证）
  */

  data() {
    return {
      trHeight: null,
    }
  },
  methods: {
    trAddHeight(val) {
      // 添加新元素或添加更多高度（例如列表附加）。假设高度已指定且为字符串，则传入值是 'number' 或字符串中的有效数字
      const heightValue = Number(this.trHeight.substring(0, this.trHeight.length - 2))
      this.trHeight = `${heightValue + Number(val)}px`
    },
    trTrimHeight(val) {
      // 从现有高度中移除新元素或移除高度
      const heightValue = Number(this.trHeight.substring(0, this.trHeight.length - 2))
      this.trHeight = `${heightValue - Number(val)}px`
    },
    trSetHeight(val) {
      // 设定高度用于从已安装的钩子中分配初始值。假设未指定高度或无指定操作添加 / 删除的内容，则传入值是 'number' 或字符串中的有效数字
      if (val === null) this.trHeight = 'auto'
      else this.trHeight = `${Number(val)}px`
    },
  },
}

// 当前版本忽略下面的内容。后续版本预留添加更多转换内容
export const _ = null
