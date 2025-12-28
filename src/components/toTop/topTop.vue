<template>
  <div
    v-show="back"
    :class="classes"
    :style="positionStyles"
    @click="toTop"
  >
    <slot>
      <div :class="wrapperClasses" />
    </slot>
  </div>
</template>

<script>
import { ref, computed, onMounted, onBeforeUnmount, defineComponent } from 'vue'
import { scrollTop } from '../../utils/util'

const prefixCls = 'dpzvc3-toTop'

export default defineComponent({
  name: 'ToTop',
  props: {
    distance: {
      type: Number,
      default: 200
    },
    bottom: {
      type: [Number, String],
      default: 30
    },
    right: {
      type: [Number, String],
      default: 30
    },
    duration: {
      type: Number,
      default: 1000
    }
  },
  setup (props) {
    const back = ref(false)

    const classes = computed(() => [prefixCls])
    const wrapperClasses = computed(() => [`${prefixCls}-wrapper`])
    const positionStyles = computed(() => ({
      bottom: props.bottom + 'px',
      right: props.right + 'px'
    }))

    // 滚动监听
    const scroll = () => {
      back.value = window.pageYOffset > props.distance
    }

    const toTop = () => {
      scrollTop(window, window.pageYOffset, 0, props.duration)
    }

    onMounted(() => {
      window.addEventListener('scroll', scroll, false)
      window.addEventListener('resize', scroll, false)
    })

    onBeforeUnmount(() => {
      window.removeEventListener('scroll', scroll, false)
      window.removeEventListener('resize', scroll, false)
    })

    return {
      back,
      classes,
      wrapperClasses,
      positionStyles,
      toTop
    }
  }
})
</script>
