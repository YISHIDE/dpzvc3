<template>
  <transition name="dpzvc3-ani-scale">
    <div :class="classes">
      <div
        v-if="showLeft"
        :class="leftClasses"
      >
        <slot name="message-left">
          <Spinner
            size="65"
            type="blade"
            color="#ffffff"
          />
        </slot>
      </div>

      <p :class="wrapperClasses">
        {{ text }}
      </p>

      <div
        v-if="!rightHide"
        :class="rightClasses"
      >
        <slot name="message-right" />
      </div>
    </div>
  </transition>
</template>

<script>
import { defineComponent, computed, onMounted, onBeforeUnmount, inject } from 'vue'
import Spinner from '../spinner'

const prefixCls = 'dpzvc3-message'

export default defineComponent({
  name: 'DpzMessage',
  components: { Spinner },

  props: {
    name: {
      type: [String, Number],
      required: true
    },
    text: {
      type: [String, Number],
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
      type: String,
      default: 'normal',
      validator: val =>
        ['success', 'loading', 'error', 'normal', 'warning', 'danger'].includes(val)
    },
    onClose: {
      type: Function,
      default: () => {}
    },
    position: {
      type: String,
      default: 'top'
    }
  },

  setup (props) {
    /** 🔑 从 messageGroup 注入 remove 方法 */
    const remove = inject('removeMessage')

    let timer = null

    const classes = computed(() => [
      prefixCls,
      `${prefixCls}-position-${props.position}`
    ])

    const wrapperClasses = computed(() => [
      `${prefixCls}-text`
    ])

    const leftClasses = computed(() => [
      `${prefixCls}-left`
    ])

    const rightClasses = computed(() => [
      `${prefixCls}-right`
    ])

    const closeTimer = () => {
      if (timer) {
        clearTimeout(timer)
        timer = null
      }
    }

    const close = () => {
      closeTimer()
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      remove && remove(props.name)
      props.onClose()
    }

    onMounted(() => {
      closeTimer()

      if (props.duration !== 0) {
        timer = setTimeout(() => {
          close()
        }, props.duration * 1000)
      }
    })

    onBeforeUnmount(() => {
      closeTimer()
    })

    return {
      classes,
      wrapperClasses,
      leftClasses,
      rightClasses,
      close
    }
  }
})
</script>
