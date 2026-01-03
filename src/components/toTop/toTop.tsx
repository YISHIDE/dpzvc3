import { defineComponent, ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { scrollTop } from '../../utils/util'
import { ToTopProps } from './types'

const prefixCls = 'dpzvc3-toTop'

export default defineComponent({
  name: 'ToTop',
  props: {
    distance: { type: Number, default: 200 },
    bottom: { type: [Number, String], default: 30 },
    right: { type: [Number, String], default: 30 },
    duration: { type: Number, default: 1000 }
  }, //as unknown as Record<keyof ToTopProps, any>
  setup(props: ToTopProps) {
    const back = ref(false)

    const classes = computed(() => [prefixCls])
    const wrapperClasses = computed(() => [`${prefixCls}-wrapper`])
    const positionStyles = computed(() => ({
      bottom: typeof props.bottom === 'number' ? props.bottom + 'px' : props.bottom,
      right: typeof props.right === 'number' ? props.right + 'px' : props.right
    }))

    const scroll = () => {
      back.value = window.pageYOffset > (props.distance || 0)
    }

    const toTopHandler = () => {
      scrollTop(window, window.pageYOffset, 0, props.duration || 1000)
    }

    onMounted(() => {
      window.addEventListener('scroll', scroll, false)
      window.addEventListener('resize', scroll, false)
      scroll() // 初始化判断
    })

    onBeforeUnmount(() => {
      window.removeEventListener('scroll', scroll, false)
      window.removeEventListener('resize', scroll, false)
    })

    return () => {
      return back.value ? (
        <div class={classes.value} style={positionStyles.value} onClick={toTopHandler}>
          <slot>
            <div class={wrapperClasses.value}></div>
          </slot>
        </div>
      ) : null
    }
  }
})