// src/components/cell-swipe/cell-swipe.tsx
import {
  ref,
  reactive,
  watch,
  nextTick,
  onMounted,
  defineComponent
} from 'vue'

import Cell from '../cell'
import type { CellSwipeProps, CellSwipeAction } from './types'

export type { CellSwipeProps }

const translate3d = (x: number) => `translate3d(${x}px,0,0)`

export default defineComponent({
  name: 'Dpzvc3CellSwipe',
  props: {
    title: String,
    value: null,
    label: String,
    link: String,
    hasMask: Boolean,
    left: {
      type: Array as () => CellSwipeAction[],
      default: () => []
    },
    right: {
      type: Array as () => CellSwipeAction[],
      default: () => []
    }
  },
  setup(props) {
    const cellRef = ref<any>(null)
    const leftRef = ref<HTMLElement | null>(null)
    const rightRef = ref<HTMLElement | null>(null)

    const state = reactive({
      translate: 0,
      startX: 0,
      currentX: 0,
      direction: '' as 'left' | 'right' | '',
      leftWidth: 0,
      rightWidth: 0,
      wrapper: null as HTMLElement | null,
      leftEl: null as HTMLElement | null,
      rightEl: null as HTMLElement | null
    })

    const swipe = (translate = 0) => {
      state.translate = translate
      state.wrapper && (state.wrapper.style.transform = translate3d(translate))
      state.leftEl &&
        (state.leftEl.style.transform = translate3d(-state.leftWidth + translate))
      state.rightEl &&
        (state.rightEl.style.transform = translate3d(state.rightWidth + translate))
    }

    const onTouchStart = (e: TouchEvent) => {
      state.startX = e.touches[0].clientX
    }

    const onTouchMove = (e: TouchEvent) => {
      e.preventDefault()
      state.currentX = e.touches[0].clientX
      const diff = state.currentX - state.startX
      state.direction = diff < 0 ? 'left' : 'right'

      if (state.direction === 'left') {
        state.translate = Math.max(-state.rightWidth, diff)
      } else {
        state.translate = Math.min(state.leftWidth, diff)
      }

      nextTick(() => swipe(state.translate))
    }

    const onTouchEnd = () => {
      if (
        state.direction === 'right' &&
        Math.abs(state.translate) > state.leftWidth / 2
      ) {
        swipe(state.leftWidth)
      } else if (
        state.direction === 'left' &&
        Math.abs(state.translate) > state.rightWidth / 2
      ) {
        swipe(-state.rightWidth)
      } else {
        swipe(0)
      }
    }

    watch(
      () => props.left,
      () => {
        nextTick(() => {
          state.leftWidth = leftRef.value?.offsetWidth || 0
          swipe()
        })
      }
    )

    watch(
      () => props.right,
      () => {
        nextTick(() => {
          state.rightWidth = rightRef.value?.offsetWidth || 0
          swipe()
        })
      }
    )

    onMounted(() => {
      nextTick(() => {
        if (!cellRef.value) return

        const el = cellRef.value.$el as HTMLElement
        state.wrapper = el.querySelector('.dpzvc3-cell-main')
        state.leftEl = leftRef.value?.parentElement || null
        state.rightEl = rightRef.value?.parentElement || null

        state.leftWidth = state.leftEl?.offsetWidth || 0
        state.rightWidth = state.rightEl?.offsetWidth || 0

        state.leftEl &&
          (state.leftEl.style.transform = translate3d(-state.leftWidth))
        state.rightEl &&
          (state.rightEl.style.transform = translate3d(state.rightWidth + 1))
        state.wrapper && (state.wrapper.style.transform = translate3d(0))
      })
    })

    return () => (
      <Cell
        ref={cellRef}
        title={props.title}
        value={props.value}
        label={props.label}
        link={props.link}
        hasMask={props.hasMask}
        onClick={() => swipe(0)}
        onTouchstart={onTouchStart}
        onTouchmove={onTouchMove}
        onTouchend={onTouchEnd}
      >
        {{
          left: () => (
            <div ref={leftRef} class="dpzvc3-cell-swipe-group">
              {props.left?.map((item, index) => (
                <span
                  key={index}
                  class="dpzvc3-cell-swipe-btn"
                  style={item.style}
                  innerHTML={item.content}
                  onClick={(e: any) => {
                    e.stopPropagation()
                    item.handleClick?.()
                    swipe(0)
                  }}
                />
              ))}
            </div>
          ),
          right: () => (
            <div ref={rightRef} class="dpzvc3-cell-swipe-group">
              {props.right?.map((item, index) => (
                <span
                  key={index}
                  class="dpzvc3-cell-swipe-btn"
                  style={item.style}
                  innerHTML={item.content}
                  onClick={(e: any) => {
                    e.stopPropagation()
                    item.handleClick?.()
                    swipe(0)
                  }}
                />
              ))}
            </div>
          )
        }}
      </Cell>
    )
  }
})