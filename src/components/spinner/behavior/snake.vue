<template>
  <div
    class="dpzvc3-spinner-snake"
    :style="spinnerStyle"
  />
</template>

<script>
import { computed, defineComponent } from 'vue'
import spinnerProps from '../props'

export default defineComponent({
  name: 'Dpzvc3Snake',
  props: spinnerProps.props,
  setup (props) {
    // 计算 spinner 样式
    const spinnerStyle = computed(() => {
      const style = {}

      if (props.size) {
        const borderSize = Math.ceil(props.size / 8)
        style.height = props.size + 'px'
        style.width = props.size + 'px'
        style.borderWidth = borderSize + 'px'
      }

      if (props.color) {
        style.borderTopColor = props.color
        style.borderLeftColor = props.color
        style.borderBottomColor = props.color
      }

      return style
    })

    return {
      spinnerStyle
    }
  }
})
</script>
