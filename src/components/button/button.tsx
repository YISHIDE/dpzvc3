// src/components/button/button.tsx
import { defineComponent, computed, PropType } from 'vue'
import type { CSSProperties } from 'vue'
import Spinner from '../spinner'
import { inputEmits } from './types'
import type { ButtonProps, ButtonEmits, ButtonClassName } from './types'
export type { ButtonProps, ButtonEmits }

const prefixCls = 'dpzvc3-button'

export default defineComponent({
  name: 'VButton',
  props: {
    type: {
      type: String as PropType<ButtonProps['type']>,
      default: 'normal',
      validator: (val: string) =>
        ['success', 'loading', 'normal', 'primary', 'warning', 'danger', 'text'].includes(val)
    },
    styles: {
      type: Object as PropType<ButtonProps['styles']>,
      default: () => ({})
    },
    circle: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    inline: { type: Boolean, default: false },
    width: { type: String, default: '100%' },
    height: { type: String, default: '40px' },
    loading: { type: Boolean, default: false },
    radius: { type: Boolean, default: true },
    border: { type: String as PropType<ButtonProps['border']>, default: 'all' }
  },
  emits: inputEmits,
  setup(props, { emit, slots }) {
    /** 外层容器类 */
    type classesBoolean = Partial<{[k in ButtonClassName]: boolean}>
    type classes = [ButtonClassName, classesBoolean]
    const classes = computed<classes>(() => [
      prefixCls,
      {
        [`${prefixCls}-circle`]: props.circle,
        [`${prefixCls}-inline`]: props.inline
      }
    ])

    /** 外层容器样式 */
    const wrapperStyles = computed<CSSProperties>(() => ({
      display: props.inline ? 'inline-block' : 'block',
      width: props.width,
      height: props.height
    }))

    /** button 类 */
    type buttonBorder = `dpzvc3-1px-${ButtonProps['border']}`
    type buttonClasses = [ButtonClassName,[buttonBorder],classesBoolean]
    const buttonClass = computed<buttonClasses>(() => [
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

    /** 点击事件 */
    const handleClick = (e: MouseEvent) => {
      if (props.disabled || props.loading) return
      emit('click', e)
    }

    /** loading 状态 */
    const loadingValue = computed<ButtonProps['loading']>(() => props.loading)

    /** JSX 渲染 */
    return () => (
      <div class={classes.value} style={wrapperStyles.value}>
        <button
          class={buttonClass.value}
          style={props.styles}
          disabled={props.disabled}
          onClick={handleClick}
        >
          {/* left slot */}
          {slots.left ? (
            slots.left()
          ) : (
            loadingValue.value && (
              <span class="loading">
                <Spinner type="blade" size={15} color="#ffffff" />
              </span>
            )
          )}

          {/* default slot */}
          {slots.default ? slots.default() : <span>确定</span>}

          {/* right slot */}
          {slots.right?.()}
        </button>
      </div>
    )
  }
})