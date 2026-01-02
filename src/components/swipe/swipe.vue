<template>
  <div
    ref="swipeRef"
    :class="classes"
    :style="{ height }"
  >
    <div
      ref="wrapper"
      :class="wrapperClasses"
      :style="wrapperStyle"
    >
      <template v-if="arrayList.length">
        <div
          v-for="(item, index) in arrayList"
          :key="index"
          :class="itemClasses"
        >
          <template v-if="isMultiple">
            <a
              v-for="(_item, $index) in item"
              :key="$index"
              :class="multipleClass"
              @click="choose(_item, $index, $event)"
            >
              <slot
                :item="_item"
                :index="$index"
              >
                <img :src="_item.image">
                <span>{{ _item.spec }}</span>
              </slot>
            </a>
          </template>
          <template v-else>
            <a
              :class="singleClass"
              @click="choose(item, index, $event)"
            >
              <slot
                :item="item"
                :index="index"
              >
                <img :src="item.image">
                <span>{{ item.spec }}</span>
              </slot>
            </a>
          </template>
        </div>
      </template>
    </div>
    <!-- :class="['dpzvc3-swipe-dots-item', (loop ? index + 1 : index) === slideIndex ? 'active' : '']" -->
    <div :class="dotsClasses">
      <span
        v-for="(item, index) in dotLength"
        :key="index"
        :class="['dpzvc3-swipe-dots-item', (index) === slideIndex ? 'active' : '']"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, computed, onMounted, onBeforeUnmount } from 'vue'
import rafTimeout from '../../lib/lib'
const prefixCls = 'dpzvc3-swipe'

export default defineComponent({
  name: 'Dpzvc3Swipe',
  props: {
    auto: { type: Boolean, default: true },
    list: { type: Array, default: () => [] },
    startIndex: { type: Number, default: 0 },
    height: { type: [Number, String], default: 'auto' },
    dots: { type: String, default: 'bottom' },
    multiple: { type: Boolean, default: false },
    distanceIndex: { type: Number, default: 1.5 },
    loop: { type: Boolean, default: true },
    speed: { type: Number, default: 2 },
    perpage: { type: Number, default: 1 }
  },
  setup (props) {
    const wrapper = ref(null)
    const swipeRef = ref(null)
    const clientWidth = ref(0)
    const translateX = ref(0)
    const currentTranslateX = ref(0)
    const dragging = ref(false)
    const autoSwipe = ref(true)
    const startX = ref(0)
    const distance = ref(0)
    // const slideIndex = ref(props.loop ? props.startIndex + 1 : props.startIndex)
    const slideIndex = ref(props.startIndex)
    const timer = ref(null)
    const localList = ref([...props.list])
    const transitionRef = ref('transform .2s ease-out')

    const isMultiple = computed(() => {
      if (props.perpage <= 1) return false
      const page = props.perpage
      const multipleArr = []
      let arr = []
      localList.value.forEach((item, idx) => {
        arr.push(item)
        if (arr.length === page || idx === localList.value.length - 1) {
          multipleArr.push(arr)
          arr = []
        }
      })
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      localList.value = multipleArr
      return true
    })

    const arrayList = computed(() => {
      if (!localList.value.length) return []
      if (props.loop) {
        // return [localList.value[localList.value.length - 1], ...localList.value, localList.value[0]]
        return [...localList.value, localList.value[0]]
      }
      return localList.value
    })

    const dotLength = computed(() => localList.value.length)

    // const minIndex = computed(() => (props.loop ? 1 : 0))
    const minIndex = computed(() => (0))
    const maxIndex = computed(() => (props.loop ? arrayList.value.length - 2 : arrayList.value.length - 1))

    const classes = computed(() => [prefixCls])
    const wrapperClasses = computed(() => [prefixCls + '-wrapper', { [`${prefixCls}-dragging`]: dragging.value }])
    const multipleClass = computed(() => prefixCls + '-multiple')
    const singleClass = computed(() => prefixCls + '-single')
    const itemClasses = computed(() => [prefixCls + '-item', { multiple: isMultiple.value }])
    const dotsClasses = computed(() => [
      prefixCls + '-dots',
      { [`${prefixCls}-dots-bottom`]: props.dots === 'bottom', [`${prefixCls}-dots-top`]: props.dots === 'top' }
    ])
    const wrapperStyle = computed(() => ({
      width: arrayList.value.length * clientWidth.value + 'px',
      transform: `translate3d(${translateX.value}px,0,0)`,
      height: 'auto',
      transition: transitionRef.value
    }))

    function choose (item, index, e) {
      if (item.onClick && typeof item.onClick === 'function') {
        item.onClick(item, index)
      } else if (item.link) {
        if (/https?:\/\//i.test(item.link)) {
          window.location.href = item.link
        } else if (e?.router) {
          e.preventDefault()
          e.router.push(item.link)
        }
      }
    }

    function onTouchStart (e) {
      dragging.value = true
      autoSwipe.value = false
      startX.value = e.touches[0].clientX
      currentTranslateX.value = translateX.value
      distance.value = 0
      clearTimer()
    }

    function onTouchMove (e) {
      const currentX = e.touches[0].clientX
      distance.value = props.distanceIndex ? (currentX - startX.value) / props.distanceIndex : currentX - startX.value
      translateX.value = currentTranslateX.value + distance.value
    }

    function onTouchEnd () {
      if (distance.value < 0 && Math.abs(distance.value) > clientWidth.value / 5) {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        props.loop && props.auto ? onLoopSlideLeft() : onSlideLeft()
      } else if (distance.value > 0 && Math.abs(distance.value) > clientWidth.value / 5) {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        props.loop && props.auto ? onLoopSlideRight() : onSlideRight()
      } else {
        translateX.value = currentTranslateX.value
      }
      dragging.value = false
      autoSwipe.value = true
      if (props.auto) autoSlide()
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
          console.log(slideIndex.value, maxIndex.value, 'dsdadddasdss')
          slideIndex.value++
          if (slideIndex.value > maxIndex.value && props.loop) {
            slideIndex.value = minIndex.value
            // resetSlide()
            wrapper.value.addEventListener('transitionend', resetSlide, false)
          }
          autoSlide()
        }
      }, props.speed < 1 ? 1000 : props.speed * 1000)
    }

    function resetSlide () {
      wrapper.value.removeEventListener('transitionend', resetSlide, false)
      slideIndex.value = minIndex.value
      autoSwipe.value = false
      transitionRef.value = 'none'
      translateX.value = -slideIndex.value * clientWidth.value
      setTimeout(() => {
        autoSwipe.value = true
        transitionRef.value = 'transform .2s ease-out'
      }, 0)
    }

    function clearTimer () {
      // if (timer.value) clearTimeout(timer.value)
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      timer.value && timer.value()
      timer.value = null
    }

    function onResize () {
      // if (wrapper.value) clientWidth.value = wrapper.value.clientWidth
      clientWidth.value = swipeRef.value ? swipeRef.value.clientWidth : 0
    }

    onMounted(() => {
      // nextTick(() => {
      clientWidth.value = swipeRef.value ? swipeRef.value.clientWidth : 0
      if (props.auto) autoSlide()

      if (wrapper.value) {
        wrapper.value.addEventListener('touchstart', onTouchStart)
        wrapper.value.addEventListener('touchmove', onTouchMove)
        wrapper.value.addEventListener('touchend', onTouchEnd)
      }
      window.addEventListener('resize', onResize)
      // })
    })

    onBeforeUnmount(() => {
      if (wrapper.value) {
        wrapper.value.removeEventListener('touchstart', onTouchStart)
        wrapper.value.removeEventListener('touchmove', onTouchMove)
        wrapper.value.removeEventListener('touchend', onTouchEnd)
      }
      window.removeEventListener('resize', onResize)
      clearTimer()
    })

    return {
      wrapper,
      translateX,
      slideIndex,
      classes,
      wrapperClasses,
      multipleClass,
      singleClass,
      itemClasses,
      dotsClasses,
      arrayList,
      isMultiple,
      dotLength,
      wrapperStyle,
      choose,
      swipeRef
    }
  }
})
</script>
