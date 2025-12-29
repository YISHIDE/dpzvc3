<template>
  <div
    :class="classes"
    :style="getStyles"
  >
    <!-- header -->
    <div
      ref="header"
      :class="headerClasses"
    >
      <div
        ref="wrapper"
        :class="wrapperClasses"
        :style="{ width: isFlex ? 'auto' : items.length * getItemWidth + 'px' }"
      >
        <div
          v-for="(item, key) in items"
          :key="key"
          :class="['dpzvc3-slideBar-child', startIndex === key ? 'active' : '', !isFlex ? 'normalChild' : '']"
          :style="{ textAlign, width: getItemWidth + 'px', height: scrollHeight, lineHeight: scrollHeight }"
          @click="changeBar(key)"
        >
          <slot :name="'slide-bar-header-' + key">
            <a class="content ellipse-fir">{{ item.name }}</a>
          </slot>
        </div>
      </div>

      <div
        :class="absoluteClass"
        :style="getScrollStyle"
      />
    </div>

    <!-- content -->
    <div
      :class="containerClass"
      :style="{ height }"
    >
      <div
        ref="content"
        :class="contentClasses"
        :style="getContainerStyle"
      >
        <div
          v-for="(item, index) in items"
          :key="index"
          :class="['dpzvc3-slideBar-content-item', startIndex === index ? 'active' : '']"
          :style="{ width: clientWidth + 'px' }"
        >
          <slot :name="'slot-item-' + index" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, computed, onMounted, onBeforeUnmount } from 'vue'

const prefixCls = 'dpzvc3-slideBar'

export default defineComponent({
  name: 'SlideBar',
  props: {
    scrollHeight: { type: [String, Number], default: '30px' },
    height: { type: [String, Number], default: '100%' },
    styles: { type: Object, default: () => ({}) },
    childWidth: { type: Number, default: 70 },
    scrollColor: { type: String, default: '#036eb8' },
    textAlign: { type: String, default: 'center' },
    flex: { type: Boolean, default: true },
    type: { type: String, default: 'normal' },
    list: { type: Array, default: () => [{ name: '1' }, { name: '2' }, { name: '3' }, { name: '4' }] },
    index: { type: Number, default: 0 },
    distanceIndex: { type: Number, default: 1.5 },
    canDrag: { type: Boolean, default: true }
  },
  emits: ['on-change'],
  setup (props, { emit }) {
    const header = ref(null)
    const content = ref(null)

    const startIndex = ref(props.index)
    const clientWidth = ref(0)
    const dragging = ref(false)
    const distance = ref(0)
    const startTranslateX = ref(0)
    const startX = ref(0)

    const items = ref(props.list)
    const isFlex = ref(props.flex)
    const fixed = ref(false)

    const getItemWidth = computed(() => (isFlex.value ? clientWidth.value / items.value.length : props.childWidth))
    // const translateX = computed(() => -startIndex.value * clientWidth.value)
    const translateX = ref(0)
    const classes = computed(() => [prefixCls])
    const headerClasses = computed(() => [prefixCls + '-header', { fixed: fixed.value }])
    const wrapperClasses = computed(() => [
      prefixCls + '-wrapper',
      isFlex.value ? prefixCls + '-flex' : prefixCls + '-slide',
      { normal: props.type === 'normal' && isFlex.value, vertical: props.type === 'vertical' && isFlex.value }
    ])
    const contentClasses = computed(() => [prefixCls + '-content', { [prefixCls + '-dragging']: dragging.value }])
    const absoluteClass = computed(() => [prefixCls + '-wrapper-absolute'])
    const containerClass = computed(() => [prefixCls + '-container'])
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

    // tab 切换
    function changeBar (index) {
      if (startIndex.value === index) return
      startIndex.value = index
      translateX.value = -startIndex.value * clientWidth.value
      emit('on-change', index)
    }

    // 拖拽事件
    function onTouchStart (e) {
      startTranslateX.value = translateX.value
      distance.value = 0
      startX.value = e.touches[0].clientX
      dragging.value = true
    }
    function onTouchMove (e) {
      const currentX = e.touches[0].clientX
      distance.value = props.distanceIndex ? (currentX - startX.value) / props.distanceIndex : currentX - startX.value
      translateX.value = startTranslateX.value + distance.value
    }
    function onTouchEnd () {
      if (distance.value < 0 && Math.abs(distance.value) > clientWidth.value / 2) {
        slideLeft()
      } else if (distance.value > 0 && Math.abs(distance.value) > clientWidth.value / 2) {
        slideRight()
      } else {
        translateX.value = startTranslateX.value
      }
      dragging.value = false
    }
    function slideLeft () {
      if (startIndex.value >= maxIndex.value) {
        translateX.value = startTranslateX.value
      } else {
        startIndex.value++
        translateX.value = startTranslateX.value - clientWidth.value
      }
      emit('on-change', startIndex.value)
    }
    function slideRight () {
      // if (startIndex.value > 0) startIndex.value--
      if (startIndex.value <= 0) {
        translateX.value = startTranslateX.value
      } else {
        startIndex.value--
        translateX.value = startTranslateX.value + clientWidth.value
      }
      emit('on-change', startIndex.value)
    }

    // 固定 header
    function onScroll () {
      fixed.value = header.value.getBoundingClientRect().top <= 0
    }
    function onResize () {
      clientWidth.value = header.value.clientWidth
    }

    onMounted(() => {
      clientWidth.value = header.value.clientWidth
      translateX.value = -startIndex.value * clientWidth.value
      window.addEventListener('resize', onResize)
      onScroll()
      if (props.canDrag && content.value) {
        // console.log(content.value, 'dadsds')
        content.value.addEventListener('touchstart', onTouchStart)
        content.value.addEventListener('touchmove', onTouchMove)
        content.value.addEventListener('touchend', onTouchEnd)
      }
    })

    onBeforeUnmount(() => {
      window.removeEventListener('resize', onResize)
      if (props.canDrag && content.value) {
        content.value.removeEventListener('touchstart', onTouchStart)
        content.value.removeEventListener('touchmove', onTouchMove)
        content.value.removeEventListener('touchend', onTouchEnd)
      }
    })

    return {
      header,
      content,
      startIndex,
      clientWidth,
      dragging,
      distance,
      items,
      isFlex,
      fixed,
      getItemWidth,
      translateX,
      classes,
      headerClasses,
      wrapperClasses,
      contentClasses,
      absoluteClass,
      containerClass,
      getStyles,
      getContainerStyle,
      getScrollStyle,
      changeBar
    }
  }
})
</script>
