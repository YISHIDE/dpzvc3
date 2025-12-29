<template>
  <div
    :href="toLink"
    :class="classes"
    @click.prevent="handleClick"
    @touchstart="cellTouchStart"
    @touchmove="cellTouchMove"
    @touchend="cellTouchEnd"
  >
    <span
      v-if="hasMask"
      :class="maskClass"
    />
    <div :class="leftClasses">
      <slot name="left" />
    </div>
    <div :class="wrapperClasses">
      <div :class="titleClass">
        <slot name="icon" />
        <slot name="title">
          <span v-text="title" />
          <span
            :class="labelClass"
            v-text="label"
          />
        </slot>
      </div>
      <div :class="valueClass">
        <slot name="value">
          <span v-text="value" />
        </slot>
      </div>
    </div>
    <div :class="rightClasses">
      <slot name="right" />
    </div>
  </div>
</template>

<script>
import { computed, defineComponent } from 'vue'
import { useRouter } from 'vue-router'

const prefixCls = 'dpzvc3-cell'

export default defineComponent({
  name: 'Dpzvc3Cell',
  props: {
    title: String,
    value: {},
    label: String,
    link: String,
    hasMask: Boolean
  },
  emits: ['touchstart', 'touchmove', 'touchend', 'click'],
  setup (props, { emit }) {
    const router = useRouter()

    // 计算链接
    const toLink = computed(() => {
      if (!props.link) return ''
      // Vue 3 router.resolve 替代 Vue 2 match
      const resolved = router.resolve(props.link)
      return resolved.matched.length ? resolved.href : props.link
    })

    // 样式类
    const classes = computed(() => [`${prefixCls}`])
    const maskClass = computed(() => [`${prefixCls}-mask`])
    const leftClasses = computed(() => [`${prefixCls}-left`])
    const rightClasses = computed(() => [`${prefixCls}-right`])
    const wrapperClasses = computed(() => [`${prefixCls}-main`, 'dpzvc3-1px-top'])
    const titleClass = computed(() => [`${prefixCls}-main-title`])
    const valueClass = computed(() => [`${prefixCls}-main-value`])
    const labelClass = computed(() => [`${prefixCls}-main-label`])

    // 点击跳转
    const handleClick = (e) => {
      if (props.link) { router.push(props.link) } else {
        emit('click', e)
      }
    }

    // 定义touchstart，touchmove，touchend事件
    const cellTouchStart = (e) => {
      emit('touchstart', e)
    }
    const cellTouchMove = (e) => {
      emit('touchmove', e)
    }
    const cellTouchEnd = (e) => {
      emit('touchend', e)
    }

    return {
      toLink,
      classes,
      maskClass,
      leftClasses,
      rightClasses,
      wrapperClasses,
      titleClass,
      valueClass,
      labelClass,
      handleClick,
      emit,
      cellTouchStart,
      cellTouchMove,
      cellTouchEnd
    }
  }
})
</script>
