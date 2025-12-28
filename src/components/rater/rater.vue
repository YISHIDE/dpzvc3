<template>
  <div :class="classes">
    <span
      v-for="(item, key) in max"
      :key="key"
      :class="starClass"
      :style="parentStyles(key)"
    >
      {{ star }}
      <span
        :style="childStyles(key)"
        @click="changeValue(key)"
      >{{ star }}</span>
    </span>
  </div>
</template>

<script>
import { defineComponent, ref, watch, computed } from 'vue'

const prefixCls = 'dpzvc3-rater'

export default defineComponent({
  name: 'Dpzvc3Rater',
  props: {
    modelValue: { type: Number, default: -1 }, // 支持 v-model
    distance: { type: Number, default: 10 },
    max: { type: Number, default: 5 },
    size: { type: Number, default: 18 },
    star: { type: String, default: '★' },
    defaultColor: { type: String, default: '#ccc' },
    activeColor: { type: String, default: '#f5a623' },
    disabled: { type: Boolean, default: false }
  },
  emits: ['update:modelValue'],
  setup (props, { emit }) {
    const currentValue = ref(props.modelValue)

    // 监听外部 v-model 变化
    watch(
      () => props.modelValue,
      val => {
        currentValue.value = val
      }
    )

    // 选中星星
    function changeValue (index) {
      if (props.disabled) return
      currentValue.value = index + 1
      emit('update:modelValue', currentValue.value)
    }

    const classes = computed(() => [prefixCls])
    const starClass = computed(() => [`${prefixCls}-star`])

    function parentStyles (index) {
      const obj = { fontSize: `${props.size}px` }
      if (index + 1 < props.max) {
        obj.marginRight = `${props.distance}px`
      } else {
        obj.marginRight = '0px'
      }
      obj.color = props.defaultColor
      return obj
    }

    function childStyles (index) {
      const obj = { fontSize: `${props.size}px` }
      if (index + 1 < props.max) {
        obj.marginRight = `${props.distance}px`
      } else {
        obj.marginRight = '0px'
      }

      const valueArr = String(currentValue.value).split('.')
      if (index + 1 <= Number(valueArr[0])) {
        obj.color = props.activeColor
      }

      if (valueArr.length > 1 && Number(valueArr[1]) >= 5 && index + 1 === Number(valueArr[0]) + 1) {
        obj.width = '50%'
        obj.color = props.activeColor
      }

      return obj
    }

    return {
      currentValue,
      changeValue,
      classes,
      starClass,
      parentStyles,
      childStyles
    }
  }
})
</script>

<style lang="less">
.dpzvc3-rater {
  &-star {
    color: #e9e9e9;
    position: relative;
    display: inline-block;
    > span {
      position: absolute;
      height: 100%;
      content: '★';
      left: 0;
      top: 0;
      color: #e9e9e9;
      overflow: hidden;
    }
  }
}
</style>
