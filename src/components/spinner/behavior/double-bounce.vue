<template>
  <div
    class="dpzvc3-spinner-double-bounce"
    :style="spinnerStyle"
  >
    <div
      v-for="i in 2"
      :key="i"
      class="bounce"
      :class="'bounce-' + i"
      :style="bounceStyle"
    />
  </div>
</template>

<script>
import { computed, defineComponent } from 'vue'
import spinnerProps from '../props' // 复用 spinnerProps

export default defineComponent({
  name: 'Dpzvc3DoubleBounce',
  props: spinnerProps.props,
  setup (props) {
    const { spinnerStyle } = spinnerProps.setup(props)

    const bounceStyle = computed(() => {
      return props.color
        ? { backgroundColor: props.color }
        : {}
    })

    return {
      spinnerStyle,
      bounceStyle
    }
  }
})
</script>
