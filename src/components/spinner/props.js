// spinnerProps.js
import { computed } from 'vue'

export default {
  props: {
    size: {
      type: [Number, String]
    },
    color: {
      type: String
    }
  },
  setup (props) {
    const spinnerStyle = computed(() => {
      if (props.size) {
        return {
          height: typeof Number(props.size) === 'number' ? `${props.size}px` : props.size,
          width: typeof Number(props.size) === 'number' ? `${props.size}px` : props.size
        }
      }
      return {}
    })

    return {
      spinnerStyle
    }
  }
}
