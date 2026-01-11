// src/components/rater/rater.tsx
// src/components/rater/rater.tsx

import { defineComponent, ref, watch, computed, PropType } from 'vue'
import type { RaterProps } from './types'
export type { RaterProps }
const prefixCls = 'dpzvc3-rater'

export default defineComponent({
  name: 'Dpzvc3Rater',

  props: {
    modelValue: { type: Number as PropType<number>, default: -1 },
    distance: { type: Number as PropType<number>, default: 10 },
    max: { type: Number as PropType<number>, default: 5 },
    size: { type: Number as PropType<number>, default: 18 },
    star: { type: String as PropType<string>, default: '★' },
    defaultColor: { type: String as PropType<string>, default: '#ccc' },
    activeColor: { type: String as PropType<string>, default: '#f5a623' },
    disabled: { type: Boolean as PropType<boolean>, default: false }
  },

  emits: ['update:modelValue'],

  setup (props, { emit }) {
    const currentValue = ref(props.modelValue)

    watch(() => props.modelValue, v => {
      currentValue.value = v
    })

    const classes = computed(() => [prefixCls])
    const starClass = `${prefixCls}-star`

    /** ⭐️ 关键：提前算好 stars 数组 */
    const stars = computed(() => {
      return Array.from({ length: props.max }).map((_, index) => {
        const baseStyle: Record<string, string> = {
          fontSize: `${props.size}px`,
          marginRight: index + 1 < props.max ? `${props.distance}px` : '0px',
          color: props.defaultColor
        }

        const activeStyle: Record<string, string> = {
          fontSize: `${props.size}px`,
          marginRight: baseStyle.marginRight
        }

        const [int, decimal] = String(currentValue.value).split('.')

        if (index + 1 <= Number(int)) {
          activeStyle.color = props.activeColor
        }

        if (
          decimal &&
          Number(decimal) >= 5 &&
          index + 1 === Number(int) + 1
        ) {
          activeStyle.width = '50%'
          activeStyle.color = props.activeColor
        }

        return {
          index,
          baseStyle,
          activeStyle
        }
      })
    })

    const onClickStar = (index: number) => {
      if (props.disabled) return
      const value = index + 1
      currentValue.value = value
      emit('update:modelValue', value)
    }

    /** ✅ render 里只“消费数据”，不计算 */
    return () => (
      <div class={classes.value}>
        {stars.value.map(item => (
          <span
            key={item.index}
            class={starClass}
            style={item.baseStyle}
          >
            {props.star}
            <span
              style={item.activeStyle}
              onClick={() => onClickStar(item.index)}
            >
              {props.star}
            </span>
          </span>
        ))}
      </div>
    )
  }
})
