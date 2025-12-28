<template>
  <component
    :is="spinnerComponent"
    :type="type"
    :size="size"
    :color="color"
  />
</template>

<script>
import { defineComponent, computed } from 'vue'
import SpinnerBlade from './behavior/blade.vue'
import SpinnerSnake from './behavior/snake.vue'
import SpinnerDoubleBounce from './behavior/double-bounce.vue'
import SpinnerTripleBounce from './behavior/triple-bounce.vue'
import SpinnerFadingCircle from './behavior/fading-circle.vue'

const SPINNERS = [
  'blade',
  'snake',
  'double-bounce',
  'triple-bounce',
  'fading-circle'
]

function parseSpinner (index) {
  index = index || 0

  if (/^\d+$/.test(index)) {
    if (SPINNERS.length <= index) {
      console.warn(`'${index}' spinner not found, use the default spinner.`)
      index = 0
    }
    return SPINNERS[index]
  }

  if (!SPINNERS.includes(index)) {
    console.warn(`'${index}' spinner not found, use the default spinner.`)
    index = SPINNERS[0]
  }

  return index
}

export default defineComponent({
  name: 'Dpzvc3Spinner',
  components: {
    'spinner-blade': SpinnerBlade,
    'spinner-snake': SpinnerSnake,
    'spinner-double-bounce': SpinnerDoubleBounce,
    'spinner-triple-bounce': SpinnerTripleBounce,
    'spinner-fading-circle': SpinnerFadingCircle
  },
  props: {
    size: {
      type: [Number, String],
      default: 30
    },
    type: {
      type: [String, Number],
      default: 'snake'
    },
    color: {
      type: String,
      default: '#39f'
    }
  },
  setup (props) {
    const spinnerComponent = computed(() => {
      return `spinner-${parseSpinner(props.type)}`
    })

    return {
      spinnerComponent
    }
  }
})
</script>
