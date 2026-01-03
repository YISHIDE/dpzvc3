import { defineComponent, computed, onMounted, onBeforeUnmount, inject, PropType } from 'vue'
import Spinner from '../spinner'
import type { MessageProps } from './types'

const prefixCls = 'dpzvc3-message'

export default defineComponent({
  name: 'DpzMessage',
  props: {
    name: {
      type: [String, Number] as PropType<string | number>,
      required: true
    },
    text: {
      type: [String, Number] as PropType<string | number>,
      default: ''
    },
    duration: {
      type: Number,
      default: 1.5
    },
    showLeft: {
      type: Boolean,
      default: false
    },
    rightHide: {
      type: Boolean,
      default: true
    },
    type: {
      type: String as PropType<MessageProps['type']>,
      default: 'normal'
    },
    onClose: {
      type: Function as PropType<() => void>,
      default: () => {}
    },
    position: {
      type: String as PropType<MessageProps['position']>,
      default: 'top'
    }
  },
  setup(props) {
    /** 🔑 从 MessageGroup 注入 remove 方法 */
    const remove = inject<(name: string | number) => void>('removeMessage')

    let timer: number | null = null

    const classes = computed(() => [prefixCls, `${prefixCls}-position-${props.position}`])
    const wrapperClasses = computed(() => [`${prefixCls}-text`])
    const leftClasses = computed(() => [`${prefixCls}-left`])
    const rightClasses = computed(() => [`${prefixCls}-right`])

    const closeTimer = () => {
      if (timer) {
        clearTimeout(timer)
        timer = null
      }
    }

    const close = () => {
      closeTimer()
      remove?.(props.name)
      props.onClose?.()
    }

    onMounted(() => {
      closeTimer()
      if (props.duration !== 0) {
        timer = window.setTimeout(() => {
          close()
        }, props.duration * 1000)
      }
    })

    onBeforeUnmount(() => {
      closeTimer()
    })

    return () => (
      <div class={classes.value}>
        {props.showLeft && (
          <div class={leftClasses.value}>
            <slot name="message-left">
              <Spinner size="65" type="blade" color="#ffffff" />
            </slot>
          </div>
        )}

        <p class={wrapperClasses.value}>{props.text}</p>

        {!props.rightHide && (
          <div class={rightClasses.value}>
            <slot name="message-right" />
          </div>
        )}
      </div>
    )
  }
})