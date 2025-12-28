<template>
  <div
    :class="classes"
    :style="containerStyle"
  >
    <!-- 减按钮 -->
    <div
      :class="reduceClasses"
      :style="getChangeStyle"
      @click="change('reduce', downDisabled)"
    >
      <slot name="reduce">
        -
      </slot>
    </div>

    <!-- 输入框 -->
    <div :class="wrapperClasses">
      <input
        type="number"
        :style="inputStyle"
        :min="min"
        :max="max"
        :step="step"
        :value="currentValue"
        :autocomplete="autocomplete"
        @input="changeInput"
        @focus="focusInput"
        @blur="blurInput"
        @change="onChangeInput"
        @keyup.38="change('reduce', downDisabled)"
        @keyup.40="change('add', upDisabled)"
      >
    </div>

    <!-- 加按钮 -->
    <div
      :class="addtionClasses"
      :style="getChangeStyle"
      @click="change('add', upDisabled)"
    >
      <slot name="add">
        +
      </slot>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, computed, watch, onMounted } from 'vue'
import Input from '../../mixin/input'

const prefixCls = 'dpzvc3-number'

export default defineComponent({
  name: 'Dpzvc3Number',
  mixins: [Input],
  props: {
    min: { type: [Number, String], default: -Infinity },
    max: { type: [Number, String], default: Infinity },
    modelValue: [Number, String],
    step: { type: Number, default: 1 },
    width: { type: Number, default: 60 },
    height: { type: Number, default: 35 },
    numberStyle: { type: Object, default: () => ({}) },
    containerStyle: { type: Object, default: () => ({}) }
  },
  emits: ['update:modelValue', 'input', 'on-input'],
  setup (props, { emit }) {
    const currentValue = ref(props.modelValue)
    const upDisabled = ref(false)
    const downDisabled = ref(false)

    // 计算类名
    const classes = computed(() => [prefixCls])
    const reduceClasses = computed(() => [
      `${prefixCls}-changevalue`,
      'left',
      { disabled: downDisabled.value }
    ])
    const addtionClasses = computed(() => [
      `${prefixCls}-changevalue`,
      'right',
      { disabled: upDisabled.value }
    ])
    const wrapperClasses = computed(() => [`${prefixCls}-wrapper`])
    const getChangeStyle = computed(() => ({
      width: `${props.height}px`,
      height: `${props.height}px`,
      lineHeight: `${props.height}px`
    }))
    const inputStyle = computed(() => ({
      ...props.numberStyle,
      width: `${props.width}px`,
      height: `${props.height}px`
    }))

    // 改变值时计算按钮状态
    function changeVal (val) {
      const numberVal = Number(val)
      if (!isNaN(numberVal) || numberVal === 0) {
        upDisabled.value = numberVal + props.step > props.max
        downDisabled.value = numberVal - props.step < props.min
      } else {
        upDisabled.value = true
        downDisabled.value = true
      }
    }

    function setValue (val) {
      currentValue.value = val
      emit('input', val)
      emit('update:modelValue', val)
    }

    // 输入框事件
    function changeInput (e) {
      let val = e.target.value.trim()
      val = Number(val)
      if (val < props.min) val = props.min
      if (val > props.max) val = props.max
      setValue(val)
      e.target.value = currentValue.value
      emit('on-input', e)
      emit('update:modelValue', val)
    }

    // 点击加减按钮
    function change (type, disabled) {
      if (disabled) return
      let val = Number(currentValue.value)
      if (isNaN(val)) return
      if (type === 'reduce') val -= props.step
      else if (type === 'add') val += props.step
      if (val < props.min) val = props.min
      if (val > props.max) val = props.max
      setValue(val)
    }

    watch(() => props.modelValue, (val) => {
      currentValue.value = val
    })

    watch(currentValue, (val) => {
      changeVal(val)
    })

    onMounted(() => {
      changeVal(currentValue.value)
    })

    return {
      currentValue,
      upDisabled,
      downDisabled,
      classes,
      reduceClasses,
      addtionClasses,
      wrapperClasses,
      getChangeStyle,
      inputStyle,
      changeInput,
      change
    }
  }
})
</script>
