import { defineComponent, computed, ref, watch,PropType } from 'vue'

import type { BadgeProps, BadgeClassNameArray, BadgeClassName } from './types'
export type { BadgeProps } 

export default defineComponent({
  name: 'Dpzvc3Badge',

  props: {
    type: {
      type: String as PropType<BadgeProps['type']>,
      default: 'danger'
    },
    size: {
      type: String as PropType<BadgeProps['size']>,
      default: 'normal'
    },
    dot: {
      type: Boolean,
      default: false
    },
    max: {
      type: [Number, String],
      default: 99
    },
    number: {
      type: [Number, String]
    }
  },

  setup (props, { slots }) {
    const prefixCls = 'dpzvc3-badge'
    const visible = ref(true)

    watch(
      () => props.number,
      (val) => {
        if (props.dot) {
          visible.value = true
        } else if (val == null || isNaN(Number(val))) {
          visible.value = false
        } else {
          visible.value = true
        }
      },
      { immediate: true }
    )

    const classes = computed<BadgeClassNameArray>(() => [prefixCls])
    type arr = [BadgeClassName, Partial<{[key in BadgeClassName]: boolean}>]
    const supClasses = computed<arr>(() => [
      `${prefixCls}-${props.type}`,
      {
        [`${prefixCls}-size-${props.size}`]: !props.dot,
        [`${prefixCls}-dot`]: props.dot
      }
    ])

    const displayCount = computed<string>(() => {
      if (props.dot) return ''
      const num = Number(props.number)
      return num <= Number(props.max) ? String(num) : `${props.max}+`
    })

    return () => (
      <span class={classes.value}>
        {slots.default?.()}
        {visible.value && (
          <sup class={supClasses.value}>
            {displayCount.value}
          </sup>
        )}
      </span>
    )
//     h('span', { class: classes.value }, [
//   slots.default ? slots.default() : null,
//   visible.value ? h('sup', { class: supClasses.value }, displayCount.value) : null
// ])
  }
})