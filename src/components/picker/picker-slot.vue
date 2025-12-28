<template>
  <div
    :class="classes"
    :style="getStyles"
  >
    <ul
      :class="draggingClass"
      :style="{ transform: `translate3d(0,${translateY}px,0)` }"
      @touchstart="_onTouchStart"
      @touchmove="_onTouchMove"
      @touchend="_onTouchEnd"
    >
      <!-- 上方占位 -->
      <li :style="{ height: height + 'px' }" />
      <li :style="{ height: height + 'px' }" />

      <!-- 数据列表 -->
      <li
        v-for="(item, index) in list"
        :key="index"
        :class="{
          current: index === current.index,
          level_1_1: index - current.index === 1,
          level_2_1: index - current.index === 2,
          level_3_1: index - current.index >= 3,
          level_1: index - current.index === -1,
          level_2: index - current.index === -2,
          level_3: index - current.index <= -3
        }"
        :style="{ textAlign: align, height: height + 'px' }"
      >
        {{ item.value }}
      </li>

      <!-- 下方占位 -->
      <li :style="{ height: height + 'px' }" />
      <li :style="{ height: height + 'px' }" />
    </ul>
  </div>
</template>

<script>
import { defineComponent, ref, computed, watch, onMounted } from 'vue'

export default defineComponent({
  name: 'PickerSlot',
  props: {
    styles: Object,
    list: {
      type: Array,
      default: () => []
    },
    align: {
      type: String,
      default: 'center'
    },
    target: {
      type: String,
      required: true
    },
    initItem: {
      type: [String, Number],
      default: ''
    }
  },
  setup (props, { emit }) {
    const count = 7
    const height = ref(35)
    const current = ref({})
    const translateY = ref(0)
    const currentTranslateY = ref(0)
    const dragging = ref(false)
    const startX = ref(0)
    const startY = ref(0)
    const delta = ref({ x: 0, y: 0 })

    const classes = computed(() => ['dpzvc3-picker-slot'])
    const draggingClass = computed(() => ({
      'dpzvc3-picker-slot-dragging': dragging.value
    }))

    const wrapperHeight = computed(() => count * height.value)

    const getStyles = ref({})
    const updateStyles = () => {
      const styles = { ...props.styles }
      if (styles.height) {
        height.value = styles.height / count
      }
      getStyles.value = { ...styles, height: wrapperHeight.value + 'px' }
    }
    const getSelectedIndex = () => {
      const maxIndex = props.list.length - 1
      let index = -Math.round(currentTranslateY.value / height.value)
      index = Math.max(index, 0)
      index = Math.min(index, maxIndex)
      return index
    }
    // 初始化样式
    updateStyles()

    watch(
      () => props.styles,
      () => {
        updateStyles()
      },
      { deep: true }
    )

    // list 数据变化
    watch(
      () => props.list,
      (list) => {
        if (list.length) {
          let index = getSelectedIndex()
          if (index > list.length - 1) index = 0
          current.value = { ...current.value, ...list[index] }
          emit('change', props.target, current.value)
        } else {
          translateY.value = 0
        }
      },
      { immediate: true }
    )

    const setSelectedItem = (index) => {
      translateY.value = currentTranslateY.value = -index * height.value
      try {
        if (
          current.value.code === props.list[index].code &&
          current.value.value === props.list[index].value
        ) {
          return
        }
        current.value = {
          code: props.list[index].code,
          value: props.list[index].value,
          target: props.target,
          index
        }
      } catch (e) {
        current.value = { code: '', value: '', target: props.target, index: '' }
      }
      emit('change', props.target, current.value)
    }

    const scrollToItem = (code) => {
      props.list.forEach((item, i) => {
        if (item.code === code) {
          currentTranslateY.value = translateY.value
          setSelectedItem(i)
        }
      })
    }

    const _onTouchStart = (e) => {
      e.preventDefault()
      e.stopPropagation()
      currentTranslateY.value = translateY.value
      startX.value = e.touches[0].pageX
      startY.value = e.touches[0].pageY
      dragging.value = true
    }

    const _onTouchMove = (e) => {
      e.preventDefault()
      e.stopPropagation()
      delta.value.x = e.touches[0].pageX - startX.value
      delta.value.y = e.touches[0].pageY - startY.value
      translateY.value = delta.value.y + currentTranslateY.value
    }

    const _onTouchEnd = (e) => {
      e.preventDefault()
      e.stopPropagation()
      dragging.value = false
      currentTranslateY.value = translateY.value
      const index = getSelectedIndex()
      setSelectedItem(index)
    }
    // initItem 变化
    watch(
      () => props.initItem,
      (value) => {
        if (value === '' || value === null) {
          current.value = { code: '', target: props.target, index: '', value: '' }
          emit('change', props.target, current.value)
        } else {
          scrollToItem(value)
        }
      },
      { immediate: true }
    )

    onMounted(() => {
      if (!props.initItem && props.initItem !== 0) {
        current.value = { code: '', target: props.target, index: '', value: '' }
        emit('change', props.target, current.value)
      } else {
        scrollToItem(props.initItem)
      }
    })
    return {
      classes,
      draggingClass,
      translateY,
      height,
      current,
      _onTouchStart,
      _onTouchMove,
      _onTouchEnd,
      getStyles,
      getSelectedIndex
    }
  }
})
</script>
