<template>
  <div
    ref="containerRef"
    :class="containerClasses"
    :style="{ height: height }"
    @scroll="onScroll"
  >
    <!-- 上拉刷新 -->
    <div
      v-if="refresh"
      :class="topClasses"
      :style="{ height: translateY + 'px' }"
    >
      <div :class="statusClass">
        <slot name="top">
          <span class="spinner">
            <Spinner
              v-if="upStatus === 'loading'"
              size="15"
              type="snake"
            />
          </span>
          <span class="dpzvc3-loadmore-text">{{ upText }}</span>
        </slot>
      </div>
    </div>

    <!-- 内容 -->
    <div :class="contentClasses">
      <slot />
    </div>

    <!-- 下拉加载更多 -->
    <div
      v-if="loadMore"
      :class="bottomClasses"
    >
      <div :class="statusClass">
        <slot name="bottom">
          <span class="spinner">
            <Spinner
              v-if="downStatus === 'loading'"
              size="15"
              type="snake"
            />
          </span>
          <span class="dpzvc3-loadmore-text">{{ downText }}</span>
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import Spinner from '../spinner'

const prefixCls = 'dpzvc3-loadmore'

export default defineComponent({
  name: 'Dpzvc3Loadmore',
  components: { Spinner },
  props: {
    height: { type: [Number, String], default: '100%' },
    refresh: Function,
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
    loadMore: Function,
    hasMore: { type: Boolean, default: true },
    styles: { type: Object, default: () => ({}) },
    auto: { type: Boolean, default: true },
    autoFill: { type: Boolean, default: true }
  },
  setup (props, { emit }) {
    const containerRef = ref(null)

    // 状态
    const translateY = ref(0)
    const startTranslateY = ref(0)
    const currentY = ref(0)
    const startY = ref(0)
    const upStatus = ref('')
    const downStatus = ref('')
    const direction = ref('')
    const upText = ref('')
    const downText = ref('')
    const down = ref(false)
    const drag = ref(false)
    const more = ref(props.hasMore)

    // classes
    const containerClasses = computed(() => [prefixCls])
    const topClasses = computed(() => [prefixCls + '-top', { [`${prefixCls}-drag`]: !drag.value }])
    const bottomClasses = computed(() => [prefixCls + '-bottom'])
    const contentClasses = computed(() => [prefixCls + '-content'])
    const statusClass = computed(() => [prefixCls + '-status'])

    // watch 状态
    watch(upStatus, val => {
      switch (val) {
      case 'pull': upText.value = props.upPullText; break
      case 'drop': upText.value = props.upDropText; break
      case 'loading': upText.value = props.upLoadingText; break
      }
      emit('on-change-up-status', val)
    })

    watch(downStatus, val => {
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

    // 方法
    const isBottom = () => {
      const el = containerRef.value
      return el.scrollHeight <= el.offsetHeight
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
          props.loadMore && props.loadMore()
        }
      }, 1000)
    }

    const onScroll = e => {
      e.preventDefault()
      if (downStatus.value === 'loading') return
      const el = containerRef.value
      const scrollTop = el.scrollTop
      if (props.loadMore) {
        const absY = el.scrollHeight - (el.offsetHeight + scrollTop)
        if (absY > props.downDistance && downStatus.value === 'drop') downStatus.value = ''
        else if (absY <= props.downDistance && absY > props.downDistance && more.value) downStatus.value = 'drop'
        else if (absY <= props.downDistance) {
          downStatus.value = 'loading'
          if (more.value) props.loadMore()
          else setTimeout(onLoadOff, 1000)
        }
      }
    }

    const onTouchStart = e => {
      if (upStatus.value === 'loading') return
      startY.value = e.touches[0].clientY
      startTranslateY.value = translateY.value
      down.value = false
    }

    const onTouchMove = e => {
      const el = containerRef.value
      if (!el) return
      const pos = el.getBoundingClientRect()
      if (upStatus.value === 'loading' || (startY.value < pos.top && startY.value > pos.bottom)) return
      currentY.value = e.touches[0].clientY
      const distance = (currentY.value - startY.value) / props.speed
      const scrollTop = el.scrollTop
      direction.value = distance > 0 ? 'down' : 'up'

      if (currentY.value >= startY.value && props.refresh && scrollTop === 0 && direction.value === 'down') {
        e.preventDefault()
        e.stopPropagation()
        translateY.value = props.maxDistance > 0 ? Math.min(distance - scrollTop, props.maxDistance) : distance - scrollTop
        if (translateY.value < 0) translateY.value = 0
        upStatus.value = translateY.value >= props.upDistance ? 'drop' : 'pull'
        drag.value = true
        down.value = down.value || isBottom()
      }
    }

    const onTouchEnd = e => {
      if (upStatus.value === 'loading') return
      const el = containerRef.value
      if (direction.value === 'down' && el.scrollTop <= 0 && translateY.value >= 0) {
        if (upStatus.value === 'drop') {
          translateY.value = 40
          upStatus.value = 'loading'
          props.refresh && props.refresh()
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
        drag.value = false
        direction.value = 'down'
        upStatus.value = 'loading'
        props.refresh()
      }

      const el = containerRef.value
      if (el) {
        el.addEventListener('touchstart', onTouchStart, false)
        el.addEventListener('touchmove', onTouchMove, false)
        el.addEventListener('touchend', onTouchEnd, false)
      }
    })

    onBeforeUnmount(() => {
      const el = containerRef.value
      if (el) {
        el.removeEventListener('touchstart', onTouchStart, false)
        el.removeEventListener('touchmove', onTouchMove, false)
        el.removeEventListener('touchend', onTouchEnd, false)
      }
    })

    return {
      containerRef,
      translateY,
      upStatus,
      downStatus,
      upText,
      downText,
      down,
      drag,
      more,
      containerClasses,
      topClasses,
      bottomClasses,
      contentClasses,
      statusClass,
      onScroll,
      onLoadOff
    }
  }
})
</script>
