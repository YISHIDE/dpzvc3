<template>
  <div
    class="dpzvc3-spinner-fading-circle"
    :style="spinnerStyle"
  >
    <div
      v-for="i in 12"
      :key="i"
      class="block"
      :class="'block-' + i"
      :style="blockStyle(i - 1)"
    >
      <div
        class="circle"
        :class="'circle-' + i"
        :style="circleStyle(i - 1)"
      />
    </div>
  </div>
</template>

<script>
import { computed, defineComponent } from 'vue'
import spinnerProps from '../props'

export default defineComponent({
  name: 'Dpzvc3FadingCircle',
  props: spinnerProps.props,
  setup (props) {
    // 使用复用的 spinnerStyle
    const { spinnerStyle } = spinnerProps.setup(props)

    // block 旋转样式
    const blockStyle = (index) => {
      return {
        transform: `rotate(${30 * index}deg)`
      }
    }

    // circle 样式，包括颜色和动画延迟
    const circleStyle = (index) => {
      return {
        backgroundColor: props.color || '#39f',
        animationDelay: `${(1.2 / 12) * index - 1.2}s`
      }
    }

    return {
      spinnerStyle,
      blockStyle,
      circleStyle
    }
  }
})
</script>
