// src/components/swipe/swipe.tsx
import {
  defineComponent,
  ref,
  computed,
  onMounted,
  onBeforeUnmount,
  PropType
} from 'vue'
import rafTimeout from '../../lib/lib'
import type { SwipeItem, SwipeProps } from './types'

export type { SwipeProps }

const prefixCls = 'dpzvc3-swipe'

export default defineComponent({
  name: 'Dpzvc3Swipe',

  props: {
    auto: { type: Boolean, default: true },
    list: { type: Array as PropType<SwipeItem[]>, default: () => [] },
    startIndex: { type: Number, default: 0 },
    height: { type: [Number, String] as PropType<number | string>, default: 'auto' },
    dots: { type: String as PropType<'top' | 'bottom'>, default: 'bottom' },
    multiple: { type: Boolean, default: false },
    distanceIndex: { type: Number, default: 1.5 },
    loop: { type: Boolean, default: true },
    speed: { type: Number, default: 2 },
    perpage: { type: Number, default: 1 }
  },

  setup (props, { slots }) {
    const swipeRef = ref<HTMLDivElement | null>(null)
    const wrapper = ref<HTMLDivElement | null>(null)

    const clientWidth = ref(0)
    const translateX = ref(0)
    const currentTranslateX = ref(0)
    const dragging = ref(false)
    const autoSwipe = ref(true)
    const startX = ref(0)
    const distance = ref(0)
    const slideIndex = ref(props.startIndex)
    const timer = ref<null |(() => void)>(null)

    const localList = ref<SwipeItem[]>([...props.list])
    const transitionRef = ref('transform .2s ease-out')

    /** 是否多列 */
    const isMultiple = computed(() => {
      if (props.perpage <= 1) return false

      const page = props.perpage
      const result: SwipeItem[][] = []
      let temp: SwipeItem[] = []

      localList.value.forEach((item, idx) => {
        temp.push(item)
        if (temp.length === page || idx === localList.value.length - 1) {
          result.push(temp)
          temp = []
        }
      })

      // ⚠️ 保持与你原逻辑一致（computed 内有副作用）
      localList.value = result as any
      return true
    })

    /** 实际渲染数组 */
    const arrayList = computed<any[]>(() => {
      if (!localList.value.length) return []
      return props.loop
        ? [...localList.value, localList.value[0]]
        : localList.value
    })

    const dotLength = computed(() => localList.value.length)
    const minIndex = computed(() => 0)
    const maxIndex = computed(() =>
      props.loop ? arrayList.value.length - 2 : arrayList.value.length - 1
    )

    /** class / style */
    const classes = computed(() => [prefixCls])
    const wrapperClasses = computed(() => [
      `${prefixCls}-wrapper`,
      { [`${prefixCls}-dragging`]: dragging.value }
    ])
    const multipleClass = `${prefixCls}-multiple`
    const singleClass = `${prefixCls}-single`
    const itemClasses = computed(() => [
      `${prefixCls}-item`,
      { multiple: isMultiple.value }
    ])
    const dotsClasses = computed(() => [
      `${prefixCls}-dots`,
      {
        [`${prefixCls}-dots-bottom`]: props.dots === 'bottom',
        [`${prefixCls}-dots-top`]: props.dots === 'top'
      }
    ])

    const wrapperStyle = computed(() => ({
      width: `${arrayList.value.length * clientWidth.value}px`,
      transform: `translate3d(${translateX.value}px,0,0)`,
      transition: transitionRef.value
    }))

    /** 点击 */
    function choose (item: SwipeItem, index: number, e?: Event) {
      if (item.onClick) {
        item.onClick(item, index)
      } else if (item.link) {
        if (/https?:\/\//i.test(item.link)) {
          window.location.href = item.link
        }
      }
    }

    /** touch */
    function onTouchStart (e: TouchEvent) {
      dragging.value = true
      autoSwipe.value = false
      startX.value = e.touches[0].clientX
      currentTranslateX.value = translateX.value
      distance.value = 0
      clearTimer()
    }

    function onTouchMove (e: TouchEvent) {
      const currentX = e.touches[0].clientX
      distance.value = props.distanceIndex
        ? (currentX - startX.value) / props.distanceIndex
        : currentX - startX.value
      translateX.value = currentTranslateX.value + distance.value
    }

    function onTouchEnd () {
      if (distance.value < 0 && Math.abs(distance.value) > clientWidth.value / 5) {
        props.loop ? onLoopSlideLeft() : onSlideLeft()
      } else if (distance.value > 0 && Math.abs(distance.value) > clientWidth.value / 5) {
        props.loop ? onLoopSlideRight() : onSlideRight()
      } else {
        translateX.value = currentTranslateX.value
      }

      dragging.value = false
      autoSwipe.value = true
      props.auto && autoSlide()
    }

    function onSlideLeft () {
      if (slideIndex.value < maxIndex.value) slideIndex.value++
      translateX.value = -slideIndex.value * clientWidth.value
    }

    function onSlideRight () {
      if (slideIndex.value > minIndex.value) slideIndex.value--
      translateX.value = -slideIndex.value * clientWidth.value
    }

    function onLoopSlideLeft () {
      onSlideLeft()
      if (slideIndex.value > maxIndex.value) {
        slideIndex.value = maxIndex.value
      }
    }

    function onLoopSlideRight () {
      onSlideRight()
      if (slideIndex.value < minIndex.value) {
        slideIndex.value = minIndex.value
      }
    }

    function autoSlide () {
      timer.value = rafTimeout(() => {
        if (!dragging.value && autoSwipe.value) {
          translateX.value -= clientWidth.value
          slideIndex.value++
          if (slideIndex.value > maxIndex.value && props.loop) {
            slideIndex.value = minIndex.value
            wrapper.value?.addEventListener('transitionend', resetSlide, false)
          }
          autoSlide()
        }
      }, props.speed < 1 ? 1000 : props.speed * 1000)
    }

    function resetSlide () {
      wrapper.value?.removeEventListener('transitionend', resetSlide)
      slideIndex.value = minIndex.value
      autoSwipe.value = false
      transitionRef.value = 'none'
      translateX.value = -slideIndex.value * clientWidth.value
      setTimeout(() => {
        autoSwipe.value = true
        transitionRef.value = 'transform .2s ease-out'
      })
    }

    function clearTimer () {
      timer.value?.()
      timer.value = null
    }

    function onResize () {
      clientWidth.value = swipeRef.value?.clientWidth || 0
    }

    onMounted(() => {
      clientWidth.value = swipeRef.value?.clientWidth || 0
      props.auto && autoSlide()

      wrapper.value?.addEventListener('touchstart', onTouchStart)
      wrapper.value?.addEventListener('touchmove', onTouchMove)
      wrapper.value?.addEventListener('touchend', onTouchEnd)

      window.addEventListener('resize', onResize)
    })

    onBeforeUnmount(() => {
      wrapper.value?.removeEventListener('touchstart', onTouchStart)
      wrapper.value?.removeEventListener('touchmove', onTouchMove)
      wrapper.value?.removeEventListener('touchend', onTouchEnd)
      window.removeEventListener('resize', onResize)
      clearTimer()
    })

    /** render */
    return () => (
      <div
        ref={swipeRef}
        class={classes.value}
        style={{ height: props.height }}
      >
        <div
          ref={wrapper}
          class={wrapperClasses.value}
          style={wrapperStyle.value}
        >
          {arrayList.value.map((item: any, index: number) => (
            <div key={index} class={itemClasses.value}>
              {isMultiple.value
                ? (
                  item.map((sub: SwipeItem, i: number) => (
                    <a
                      key={i}
                      class={multipleClass}
                      onClick={(e: any) => choose(sub, i, e)}
                    >
                      {slots.default?.({ item: sub, index: i }) ?? (
                        <>
                          <img src={sub.image} />
                          <span>{sub.spec}</span>
                        </>
                      )}
                    </a>
                  ))
                )
                : (
                  <a
                    class={singleClass}
                    onClick={(e: any) => choose(item, index, e)}
                  >
                    {slots.default?.({ item, index }) ?? (
                      <>
                        <img src={item.image} />
                        <span>{item.spec}</span>
                      </>
                    )}
                  </a>
                )}
            </div>
          ))}
        </div>

        <div class={dotsClasses.value}>
          {Array.from({ length: dotLength.value }).map((_, i) => (
            <span
              key={i}
              class={[
                'dpzvc3-swipe-dots-item',
                i === slideIndex.value ? 'active' : ''
              ]}
            />
          ))}
        </div>
      </div>
    )
  }
})
