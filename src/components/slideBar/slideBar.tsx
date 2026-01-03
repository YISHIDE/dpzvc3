// src/components/slideBar/slideBar.tsx
import {
  defineComponent,
  ref,
  computed,
  onMounted,
  onBeforeUnmount,
  PropType
} from 'vue'
import type { SlideBarProps, SlideBarItem } from './types'

export type { SlideBarProps }

const prefixCls = 'dpzvc3-slideBar'

export default defineComponent({
  name: 'SlideBar',

  props: {
    scrollHeight: {
      type: [String, Number] as PropType<string | number>,
      default: '30px'
    },
    height: {
      type: [String, Number] as PropType<string | number>,
      default: '100%'
    },
    styles: {
      type: Object as PropType<Record<string, any>>,
      default: () => ({})
    },
    childWidth: {
      type: Number,
      default: 70
    },
    scrollColor: {
      type: String,
      default: '#036eb8'
    },
    textAlign: {
      type: String,
      default: 'center'
    },
    flex: {
      type: Boolean,
      default: true
    },
    type: {
      type: String as PropType<SlideBarProps['type']>,
      default: 'normal'
    },
    list: {
      type: Array as PropType<SlideBarItem[]>,
      default: () => [{ name: '1' }, { name: '2' }, { name: '3' }, { name: '4' }]
    },
    index: {
      type: Number,
      default: 0
    },
    distanceIndex: {
      type: Number,
      default: 1.5
    },
    canDrag: {
      type: Boolean,
      default: true
    }
  },

  emits: ['on-change'],

  setup(props: SlideBarProps, { emit, slots }) {
    const headerRef = ref<HTMLDivElement | null>(null)
    const contentRef = ref<HTMLDivElement | null>(null)

    const startIndex = ref(props.index ?? 0)
    const clientWidth = ref(0)
    const dragging = ref(false)
    const distance = ref(0)
    const startTranslateX = ref(0)
    const startX = ref(0)

    const items = ref(props.list ?? [])
    const isFlex = ref(!!props.flex)
    const fixed = ref(false)

    const translateX = ref(0)

    const getItemWidth = computed(() =>
      isFlex.value
        ? clientWidth.value / items.value.length
        : props.childWidth!
    )

    const classes = computed(() => [prefixCls])

    const headerClasses = computed(() => [
      `${prefixCls}-header`,
      { fixed: fixed.value }
    ])

    const wrapperClasses = computed(() => [
      `${prefixCls}-wrapper`,
      isFlex.value ? `${prefixCls}-flex` : `${prefixCls}-slide`,
      {
        normal: props.type === 'normal' && isFlex.value,
        vertical: props.type === 'vertical' && isFlex.value
      }
    ])

    const contentClasses = computed(() => [
      `${prefixCls}-content`,
      { [`${prefixCls}-dragging`]: dragging.value }
    ])

    const absoluteClass = computed(() => [`${prefixCls}-wrapper-absolute`])
    const containerClass = computed(() => [`${prefixCls}-container`])

    const getStyles = computed(() => ({ ...props.styles }))

    const getContainerStyle = computed(() => ({
      width: clientWidth.value * items.value.length + 'px',
      transform: `translate3d(${translateX.value}px,0,0)`
    }))

    const getScrollStyle = computed(() => ({
      width: getItemWidth.value + 'px',
      transform: `translate3d(${startIndex.value * getItemWidth.value}px,0,0)`,
      backgroundColor: props.scrollColor
    }))

    const maxIndex = computed(() => items.value.length - 1)

    /* tab 切换 */
    const changeBar = (index: number) => {
      if (startIndex.value === index) return
      startIndex.value = index
      translateX.value = -index * clientWidth.value
      emit('on-change', index)
    }

    /* 拖拽逻辑 */
    const onTouchStart = (e: TouchEvent) => {
      startTranslateX.value = translateX.value
      distance.value = 0
      startX.value = e.touches[0].clientX
      dragging.value = true
    }

    const onTouchMove = (e: TouchEvent) => {
      const currentX = e.touches[0].clientX
      distance.value = props.distanceIndex
        ? (currentX - startX.value) / props.distanceIndex
        : currentX - startX.value
      translateX.value = startTranslateX.value + distance.value
    }

    const onTouchEnd = () => {
      if (distance.value < 0 && Math.abs(distance.value) > clientWidth.value / 2) {
        slideLeft()
      } else if (distance.value > 0 && Math.abs(distance.value) > clientWidth.value / 2) {
        slideRight()
      } else {
        translateX.value = startTranslateX.value
      }
      dragging.value = false
    }

    const slideLeft = () => {
      if (startIndex.value >= maxIndex.value) {
        translateX.value = startTranslateX.value
      } else {
        startIndex.value++
        translateX.value = startTranslateX.value - clientWidth.value
      }
      emit('on-change', startIndex.value)
    }

    const slideRight = () => {
      if (startIndex.value <= 0) {
        translateX.value = startTranslateX.value
      } else {
        startIndex.value--
        translateX.value = startTranslateX.value + clientWidth.value
      }
      emit('on-change', startIndex.value)
    }

    /* 固定 header */
    const onScroll = () => {
      if (!headerRef.value) return
      fixed.value = headerRef.value.getBoundingClientRect().top <= 0
    }

    const onResize = () => {
      if (!headerRef.value) return
      clientWidth.value = headerRef.value.clientWidth
    }

    onMounted(() => {
      if (!headerRef.value) return
      clientWidth.value = headerRef.value.clientWidth
      translateX.value = -startIndex.value * clientWidth.value

      window.addEventListener('resize', onResize)
      window.addEventListener('scroll', onScroll)

      if (props.canDrag && contentRef.value) {
        contentRef.value.addEventListener('touchstart', onTouchStart)
        contentRef.value.addEventListener('touchmove', onTouchMove)
        contentRef.value.addEventListener('touchend', onTouchEnd)
      }
    })

    onBeforeUnmount(() => {
      window.removeEventListener('resize', onResize)
      window.removeEventListener('scroll', onScroll)

      if (props.canDrag && contentRef.value) {
        contentRef.value.removeEventListener('touchstart', onTouchStart)
        contentRef.value.removeEventListener('touchmove', onTouchMove)
        contentRef.value.removeEventListener('touchend', onTouchEnd)
      }
    })

    return () => (
      <div class={classes.value} style={getStyles.value}>
        {/* header */}
        <div ref={headerRef} class={headerClasses.value}>
          <div
            class={wrapperClasses.value}
            style={{
              width: isFlex.value
                ? 'auto'
                : items.value.length * getItemWidth.value + 'px'
            }}
          >
            {items.value.map((item, key) => (
              <div
                key={key}
                class={[
                  'dpzvc3-slideBar-child',
                  startIndex.value === key && 'active',
                  !isFlex.value && 'normalChild'
                ]}
                style={{
                  textAlign: props.textAlign,
                  width: getItemWidth.value + 'px',
                  height: props.scrollHeight,
                  lineHeight: String(props.scrollHeight)
                }}
                onClick={() => changeBar(key)}
              >
                {slots[`slide-bar-header-${key}`]
                  ? slots[`slide-bar-header-${key}`]!()
                  : <a class="content ellipse-fir">{item.name}</a>}
              </div>
            ))}
          </div>

          <div class={absoluteClass.value} style={getScrollStyle.value} />
        </div>

        {/* content */}
        <div class={containerClass.value} style={{ height: props.height }}>
          <div
            ref={contentRef}
            class={contentClasses.value}
            style={getContainerStyle.value}
          >
            {items.value.map((_, index) => (
              <div
                key={index}
                class={[
                  'dpzvc3-slideBar-content-item',
                  startIndex.value === index && 'active'
                ]}
                style={{ width: clientWidth.value + 'px' }}
              >
                {slots[`slot-item-${index}`]?.()}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
})