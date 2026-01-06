// src/components/Loadmore/Loadmore.tsx
import {
  defineComponent,
  ref,
  computed,
  watch,
  onMounted,
  onBeforeUnmount
} from 'vue'
import type { PropType, CSSProperties } from 'vue'
import Spinner from '../spinner'
import type { LoadmoreProps, LoadmoreEmits, LoadmoreUpStatus, LoadmoreDownStatus } from './types'
export type { LoadmoreProps, LoadmoreEmits }
import { inputEmits } from './types'

const prefixCls = 'dpzvc3-loadmore'

export default defineComponent({
  name: 'Dpzvc3Loadmore',

  props: {
    height: {
      type: [Number, String] as PropType<number | string>,
      default: '100%'
    },
    refresh: Function as PropType<LoadmoreProps['refresh']>,
    upLoadingText: { type: String, default: '加载中...' },
    upDistance: { type: Number, default: 70 },
    upPullText: { type: String, default: '↓ 下拉刷新' },
    upDropText: { type: String, default: '↑ 释放更新' },
    maxDistance: { type: Number, default: 0 },
    speed: { type: Number, default: 3 },

    downEndText: { type: String, default: '没有更多了' },
    downDropText: { type: String, default: '↑ 上拉加载数据' },
    downLoadingText: { type: String, default: '加载中...' },
    downDistance: { type: Number, default: 50 },
    loadMore: Function as PropType<LoadmoreProps['loadMore']>,
    hasMore: { type: Boolean, default: true },

    styles: {
      type: Object as PropType<CSSProperties>,
      default: () => ({})
    },
    auto: { type: Boolean, default: true },
    autoFill: { type: Boolean, default: true }
  },

  emits: inputEmits,

  setup(props, { slots, emit, expose }) {
    const containerRef = ref<HTMLDivElement | null>(null)

    /** 状态 */
    const translateY = ref(0)
    const startTranslateY = ref(0)
    const currentY = ref(0)
    const startY = ref(0)
    const upStatus = ref<LoadmoreUpStatus>('')
    const downStatus = ref<LoadmoreDownStatus>('')
    const direction = ref('')
    const upText = ref('')
    const downText = ref('')
    const down = ref(false)
    const drag = ref(false)
    const more = ref(props.hasMore)

    /** classes */
    const containerClasses = computed(() => [prefixCls])
    const topClasses = computed(() => [
      `${prefixCls}-top`,
      { [`${prefixCls}-drag`]: !drag.value }
    ])
    const bottomClasses = computed(() => [`${prefixCls}-bottom`])
    const contentClasses = computed(() => [`${prefixCls}-content`])
    const statusClass = computed(() => [`${prefixCls}-status`])

    /** watch */
    watch<LoadmoreUpStatus>(upStatus, val => {
      switch (val) {
        case 'pull': upText.value = props.upPullText; break
        case 'drop': upText.value = props.upDropText; break
        case 'loading': upText.value = props.upLoadingText; break
      }
      emit('on-change-up-status', val)
    })

    watch<LoadmoreDownStatus>(downStatus, val => {
      switch (val) {
        case 'end': downText.value = props.downEndText; break
        case 'drop': downText.value = props.downDropText; break
        case 'loading': downText.value = props.downLoadingText; break
        default: downText.value = ''; break
      }
      emit('on-change-down-status', val)
    })

    watch(() => props.hasMore, val => {
      more.value = val
      if (!val) downStatus.value = 'end'
    })

    /** utils */
    const isBottom = () => {
      const el = containerRef.value
      return !!el && el.scrollHeight <= el.offsetHeight
    }

    const onLoadOff = () => {
      translateY.value = 0
      upStatus.value = ''
      downStatus.value = ''
      if (!more.value) downStatus.value = 'end'

      setTimeout(() => {
        if (more.value && isBottom()) {
          direction.value = 'up'
          downStatus.value = 'loading'
          props.loadMore?.()
        }
      }, 1000)
    }

    /** scroll */
    const onScroll = (e: Event) => {
      e.preventDefault()
      if (downStatus.value === 'loading') return

      const el = containerRef.value
      if (!el || !props.loadMore) return

      const scrollTop = el.scrollTop
      const absY = el.scrollHeight - (el.offsetHeight + scrollTop)

      if (absY > props.downDistance && downStatus.value === 'drop') {
        downStatus.value = ''
      } else if (absY <= props.downDistance) {
        downStatus.value = 'loading'
        //   props.loadMore()
          if (more.value) props.loadMore()
          else setTimeout(onLoadOff, 1000)
      }
    }

    /** touch */
    const onTouchStart = (e: TouchEvent) => {
      if (upStatus.value === 'loading') return
      startY.value = e.touches[0].clientY
      startTranslateY.value = translateY.value
      down.value = false
    }

    const onTouchMove = (e: TouchEvent) => {
      const el = containerRef.value
      if (!el || upStatus.value === 'loading') return

      currentY.value = e.touches[0].clientY
      const distance = (currentY.value - startY.value) / props.speed
      const scrollTop = el.scrollTop
      direction.value = distance > 0 ? 'down' : 'up'

      if (
        currentY.value >= startY.value &&
        props.refresh &&
        scrollTop === 0 &&
        direction.value === 'down'
      ) {
        e.preventDefault()
        translateY.value = props.maxDistance > 0
          ? Math.min(distance - scrollTop, props.maxDistance)
          : distance - scrollTop

        if (translateY.value < 0) translateY.value = 0
        upStatus.value = translateY.value >= props.upDistance ? 'drop' : 'pull'
        drag.value = true
        down.value = down.value || isBottom()
      }
    }

    const onTouchEnd = () => {
      const el = containerRef.value
      if (!el || upStatus.value === 'loading') return

      if (direction.value === 'down' && el.scrollTop <= 0) {
        if (upStatus.value === 'drop') {
          translateY.value = 40
          upStatus.value = 'loading'
          props.refresh?.()
        } else {
          translateY.value = 0
        }
      }
      direction.value = ''
      drag.value = false
    }

    onMounted(() => {
      if (props.auto && props.refresh) {
        translateY.value = 40
        upStatus.value = 'loading'
        props.refresh()
      }

      const el = containerRef.value
      el?.addEventListener('touchstart', onTouchStart)
      el?.addEventListener('touchmove', onTouchMove)
      el?.addEventListener('touchend', onTouchEnd)
    })

    onBeforeUnmount(() => {
      const el = containerRef.value
      el?.removeEventListener('touchstart', onTouchStart)
      el?.removeEventListener('touchmove', onTouchMove)
      el?.removeEventListener('touchend', onTouchEnd)
    })
    expose({ onLoadOff }) 
    return () => (
      <div
        ref={containerRef}
        class={containerClasses.value}
        style={{ height: props.height, ...props.styles }}
        onScroll={onScroll}
      >
        {props.refresh && (
          <div
            class={topClasses.value}
            style={{ height: `${translateY.value}px` }}
          >
            <div class={statusClass.value}>
              {slots.top?.() ?? (
                <>
                  <span class="spinner">
                    {upStatus.value === 'loading' && (
                      <Spinner size="15" type="snake" />
                    )}
                  </span>
                  <span class="dpzvc3-loadmore-text">{upText.value}</span>
                </>
              )}
            </div>
          </div>
        )}

        <div class={contentClasses.value}>
          {slots.default?.()}
        </div>

        {props.loadMore && (
          <div class={bottomClasses.value}>
            <div class={statusClass.value}>
              {slots.bottom?.() ?? (
                <>
                  <span class="spinner">
                    {downStatus.value === 'loading' && (
                      <Spinner size="15" type="snake" />
                    )}
                  </span>
                  <span class="dpzvc3-loadmore-text">{downText.value}</span>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    )
  }
})