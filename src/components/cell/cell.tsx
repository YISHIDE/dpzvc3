// src/components/cell/cell.tsx
import { defineComponent, computed,PropType} from 'vue'
import { useRouter } from 'vue-router'

import type { CellProps } from './types'
export type { CellProps }

const prefixCls = 'dpzvc3-cell'

export default defineComponent({
  name: 'Dpzvc3Cell',
  props: {
    title: String,
    value: null,
    label: String,
    link: String,
    hasMask: Boolean
  },
  emits: ['touchstart', 'touchmove', 'touchend', 'click'],
  setup(props, { emit, slots }) {
    const router = useRouter()

    const toLink = computed(() => {
      if (!props.link) return ''
      const resolved = router.resolve(props.link)
      return resolved.matched.length ? resolved.href : props.link
    })

    const classes = computed(() => [prefixCls])
    const maskClass = computed(() => [`${prefixCls}-mask`])
    const leftClasses = computed(() => [`${prefixCls}-left`])
    const rightClasses = computed(() => [`${prefixCls}-right`])
    const wrapperClasses = computed(() => [`${prefixCls}-main`, 'dpzvc3-1px-top'])
    const titleClass = computed(() => [`${prefixCls}-main-title`])
    const valueClass = computed(() => [`${prefixCls}-main-value`])
    const labelClass = computed(() => [`${prefixCls}-main-label`])

    const handleClick = (e: MouseEvent) => {
      if (props.link) {
        router.push(props.link)
      } else {
        emit('click', e)
      }
    }

    const cellTouchStart = (e: TouchEvent) => emit('touchstart', e)
    const cellTouchMove = (e: TouchEvent) => emit('touchmove', e)
    const cellTouchEnd = (e: TouchEvent) => emit('touchend', e)

    return () => (
      <div
        href={toLink.value}
        class={classes.value}
        onClick={handleClick}
        onTouchstart={cellTouchStart}
        onTouchmove={cellTouchMove}
        onTouchend={cellTouchEnd}
      >
        {props.hasMask && <span class={maskClass.value} />}

        <div class={leftClasses.value}>
          {slots.left?.()}
        </div>

        <div class={wrapperClasses.value}>
          <div class={titleClass.value}>
            {slots.icon?.()}
            {slots.title ? (
              slots.title()
            ) : (
              <>
                <span>{props.title}</span>
                <span class={labelClass.value}>{props.label}</span>
              </>
            )}
          </div>

          <div class={valueClass.value}>
            {slots.value ? slots.value() : <span>{props.value}</span>}
          </div>
        </div>

        <div class={rightClasses.value}>
          {slots.right?.()}
        </div>
      </div>
    )
  }
})