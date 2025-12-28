<template>
  <div
    class="dpzvc3-spinner-blade"
    :style="spinnerStyle"
  >
    <div
      v-for="i in 12"
      :key="i"
      class="blade"
      :class="'blade-' + i"
      :style="bladeStyle"
    />
  </div>
</template>

<script>
import { defineComponent, computed } from 'vue'
import spinnerProps from '../props' // 复用 spinnerProps
// 如果原来 mixins props 是这样
// {
//   color: String,
//   size: [Number, String]
// }

export default defineComponent({
  name: 'Dpzvc3Blade',
  props: spinnerProps.props,
  setup (props) {
    // 计算每个 blade 的样式
    const bladeStyle = computed(() => {
      return props.color ? { backgroundColor: props.color } : {}
    })
    const { spinnerStyle } = spinnerProps.setup(props)
    // console.log(spinnerStyle, 'ddds')
    // 如果需要设置整个 spinner 容器的大小
    return {
      bladeStyle,
      spinnerStyle
    }
  }
})
</script>
