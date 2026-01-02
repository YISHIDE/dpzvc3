<template>
  <div :class="classes" :style="wrapperStyles">
    <button :style="styles" :class="buttonClass" :disabled="disabled" @click.stop="handleClick">
      <slot name="left">
        <span v-show="loadingValue" class="loading">
          <Spinner type="blade" size="15" color="#ffffff" />
        </span>
      </slot>
      <slot><span>确定</span></slot>
      <slot name="right" />
    </button>
  </div>
</template>

<script>
import { defineComponent, computed } from 'vue'
import Spinner from '../spinner'

const prefixCls = 'dpzvc3-button'

export default defineComponent({
  name: 'VButton',
  components: { Spinner },
  props: {
    type: {
      type: String,
      default: 'normal',
      validator: (val) =>
        ['success', 'loading', 'normal', 'primary', 'warning', 'danger', 'text'].includes(val)
    },
    styles: {
      type: Object,
      default: () => ({})
    },
    circle: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    inline: { type: Boolean, default: false },
    width: { type: String, default: '100%' },
    height: { type: String, default: '40px' },
    loading: { type: Boolean, default: false },
    radius: { type: Boolean, default: true },
    border: { type: String, default: 'all' }
  },
  setup (props, { emit }) {
    // 外层容器类
    const classes = computed(() => [
      prefixCls,
      {
        [`${prefixCls}-circle`]: props.circle,
        [`${prefixCls}-inline`]: props.inline
      }
    ])

    // 外层容器样式
    const wrapperStyles = computed(() => ({
      display: props.inline ? 'inline-block' : 'block',
      width: props.width,
      height: props.height
    }))

    // button 类
    const buttonClass = computed(() => [
      `${prefixCls}-btn`,
      [`dpzvc3-1px-${props.border}`],
      {
        [`${prefixCls}-success`]: props.type === 'success',
        [`${prefixCls}-loading`]: props.type === 'loading',
        [`${prefixCls}-normal`]: props.type === 'normal',
        [`${prefixCls}-warning`]: props.type === 'warning',
        [`${prefixCls}-danger`]: props.type === 'danger',
        [`${prefixCls}-text`]: props.type === 'text',
        [`${prefixCls}-primary`]: props.type === 'primary',
        [`${prefixCls}-disabled`]: props.disabled,
        [`${prefixCls}-radius`]: props.radius
      }
    ])

    // 点击事件
    const handleClick = (e) => {
      if (props.disabled || props.loading) return
      emit('click', e)
    }

    // 状态
    const loadingValue = computed(() => props.loading)

    return {
      classes,
      wrapperStyles,
      buttonClass,
      handleClick,
      loadingValue
    }
  }
})
</script>
