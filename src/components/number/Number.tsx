import { defineComponent, ref, computed, watch, onMounted, PropType } from 'vue'

const prefixCls = 'dpzvc3-number'

import { NumberProps, NumberEmits } from './types' // 引入类型
export type { NumberProps } from './types' // 导出类型
export default defineComponent({
  name: 'Dpzvc3Number',
   props: {
    modelValue: [Number, String],
    min: { type: [Number, String], default: -Infinity },
    max: { type: [Number, String], default: Infinity },
    step: { type: Number, default: 1 },
    width: { type: Number, default: 60 },
    height: { type: Number, default: 35 },
    numberStyle: { type: Object, default: () => ({}) },
    containerStyle: { type: Object, default: () => ({}) }
  }, // 强制使用类型as unknown as Record<keyof NumberProps, any>
  emits: ['update:modelValue', 'input', 'on-input'] as NumberEmits[],
  setup(props, { emit, slots }) {
    const currentValue = ref(props.modelValue)
    const upDisabled = ref(false)
    const downDisabled = ref(false)

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
    const changeVal = (val: number | string) => {
      const numberVal = Number(val)
      if (!isNaN(numberVal) || numberVal === 0) {
        upDisabled.value = numberVal + props.step > Number(props.max)
        downDisabled.value = numberVal - props.step < Number(props.min)
      } else {
        upDisabled.value = true
        downDisabled.value = true
      }
    }

    const setValue = (val: number) => {
      currentValue.value = val
      emit('input', val)
      emit('update:modelValue', val)
    }

    const changeInput = (e: Event) => {
      const target = e.target as HTMLInputElement
      let val = Number(target.value.trim())
      if (val < Number(props.min)) val = Number(props.min)
      if (val > Number(props.max)) val = Number(props.max)
      setValue(val)
      target.value = String(currentValue.value)
      emit('on-input', e)
      emit('update:modelValue', val)
    }

    const change = (type: 'add' | 'reduce', disabled: boolean) => {
      if (disabled) return
      let val = Number(currentValue.value)
      if (isNaN(val)) return
      if (type === 'reduce') val -= props.step
      else val += props.step
      if (val < Number(props.min)) val = Number(props.min)
      if (val > Number(props.max)) val = Number(props.max)
      setValue(val)
    }

    watch(() => props.modelValue, val => {
      currentValue.value = val
    })

    watch(currentValue, val => {
      changeVal(val!)
    })

    onMounted(() => {
      changeVal(currentValue.value!)
    })

    return () => (
      <div class={classes.value} style={props.containerStyle}>
        {/* 减按钮 */}
        <div
          class={reduceClasses.value}
          style={getChangeStyle.value}
          onClick={() => change('reduce', downDisabled.value)}
        >
          {slots.reduce ? slots.reduce() : '-'}
        </div>

        {/* 输入框 */}
        <div class={wrapperClasses.value}>
          <input
            type="number"
            style={inputStyle.value}
            min={props.min}
            max={props.max}
            step={props.step}
            value={currentValue.value}
            autocomplete="off"
            onInput={changeInput}
            onFocus={changeInput}
            onBlur={changeInput}
            onChange={changeInput}
            onKeyup={(e: KeyboardEvent) => {
              if (e.key === 'ArrowUp') change('add', upDisabled.value)
              if (e.key === 'ArrowDown') change('reduce', downDisabled.value)
            }}
          />
        </div>

        {/* 加按钮 */}
        <div
          class={addtionClasses.value}
          style={getChangeStyle.value}
          onClick={() => change('add', upDisabled.value)}
        >
          {slots.add ? slots.add() : '+'}
        </div>
      </div>
    )
  }
})