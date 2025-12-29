<template>
  <Cell
    ref="cell"
    :title="title"
    :value="value"
    :label="label"
    :link="link"
    :has-mask="hasMask"
    @click="swipe()"
    @touchstart="onTouchStart"
    @touchmove="onTouchMove"
    @touchend="onTouchEnd"
  >
    <template #left>
      <div
        ref="leftRef"
        class="dpzvc3-cell-swipe-group"
      >
        <span
          v-for="(item, key) in left"
          :key="key"
          class="dpzvc3-cell-swipe-btn"
          :style="item.style"
          @click.stop="() => { item.handleClick && item.handleClick(); swipe() }"
          v-html="item.content"
        />
      </div>
    </template>

    <template #right>
      <div
        ref="rightRef"
        class="dpzvc3-cell-swipe-group"
      >
        <span
          v-for="(item, key) in right"
          :key="key"
          class="dpzvc3-cell-swipe-btn"
          :style="item.style"
          @click.stop="() => { item.handleClick && item.handleClick(); swipe() }"
          v-html="item.content"
        />
      </div>
    </template>
  </Cell>
</template>

<script>
import { ref, reactive, onMounted, watch, nextTick, defineComponent } from 'vue'
import Cell from '../cell'
// import Clickoutside from '../../directives/clickoutside'

export default defineComponent({
  name: 'CellSwipe',
  components: { Cell },
  // directives: { Clickoutside },
  props: {
    title: String,
    value: {},
    label: String,
    link: String,
    left: Array,
    right: Array,
    hasMask: Boolean
  },
  setup (props) {
    const cell = ref(null)
    const leftRef = ref(null)
    const rightRef = ref(null)

    const state = reactive({
      isDrag: false,
      translate: 0,
      $wrapper: null,
      $left: null,
      $right: null,
      leftWidth: 0,
      rightWidth: 0,
      startX: 0,
      currentX: 0,
      direction: '',
      distance: 0
    })

    const translate3d = (translate) => `translate3d(${translate}px,0,0)`

    const swipe = (translate = 0) => {
      state.translate = translate
      if (state.$wrapper) state.$wrapper.style.transform = translate3d(translate)
      if (state.$left) state.$left.style.transform = translate3d(-state.leftWidth + translate)
      if (state.$right) state.$right.style.transform = translate3d(state.rightWidth + translate)
    }

    const onTouchStart = (e) => {
      console.log('滑动开始')
      state.startX = e.touches[0].clientX
    }

    const onTouchMove = (e) => {
      console.log('滑动移动')
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
      console.log('滑动结束')
      if (Math.abs(state.translate) > state.leftWidth / 2 && state.direction === 'right') {
        swipe(state.leftWidth)
      } else if (Math.abs(state.translate) > state.rightWidth / 2 && state.direction === 'left') {
        swipe(-state.rightWidth)
      } else {
        swipe(0)
      }
    }

    watch(() => props.left, () => {
      nextTick(() => {
        state.leftWidth = leftRef.value?.offsetWidth || 0
        swipe()
      })
    })

    watch(() => props.right, () => {
      nextTick(() => {
        state.rightWidth = rightRef.value?.offsetWidth || 0
        swipe()
      })
    })

    onMounted(() => {
      nextTick(() => {
        // if (!leftRef.value || !rightRef.value || !cell.value) return
        state.$wrapper = cell.value.$el.querySelector('.dpzvc3-cell-main')
        state.$left = leftRef.value.parentNode
        state.$right = rightRef.value.parentNode

        state.leftWidth = state.$left.offsetWidth
        state.rightWidth = state.$right.offsetWidth

        state.$left.style.transform = translate3d(-state.leftWidth)
        state.$right.style.transform = translate3d(state.rightWidth + 1)
        state.$wrapper.style.transform = translate3d(0)
      })
    })

    return {
      cell,
      leftRef,
      rightRef,
      state,
      swipe,
      onTouchStart,
      onTouchMove,
      onTouchEnd
    }
  }
})
</script>
