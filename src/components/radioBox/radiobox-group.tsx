// src/components/radio-group/RadioGroup.tsx
import {
  defineComponent,
  computed,
  watch,
  provide,
  ref,
  PropType
} from 'vue'
import type { RadioGroupProps, RadioGroupProvide } from './types'
export type { RadioGroupProps }

const prefixCls = 'dpzvc3-radioBoxGroup'

export default defineComponent({
  name: 'DpzVcRadioGroup',

  props: {
    modelValue: {
      type: [String, Number, Boolean] as PropType<RadioGroupProps['modelValue']>,
      default: ''
    },
    vertical: {
      type: Boolean,
      default: false
    }
  },

  emits: ['update:modelValue', 'on-change', 'on-form-change'],

  setup(props, { emit, slots }) {
    const currentValue = ref<RadioGroupProps['modelValue']>(props.modelValue) as RadioGroupProvide['currentValue']

    /** 提供给 Radio 子组件 */
    const change = (val: RadioGroupProps['modelValue']) => {
      currentValue.value = val!
      emit('update:modelValue', val)
      emit('on-change', val)
      emit('on-form-change', val)
    }

    provide<RadioGroupProvide>('radioBoxGroup', {
      currentValue,
      change
    })

    /** 监听外部 v-model */
    watch(
      () => props.modelValue,
      val => {
        currentValue.value = val
      }
    )

    const classes = computed(() => [
      prefixCls,
      { [`${prefixCls}-vertical`]: props.vertical }
    ])

    return () => (
      <div class={classes.value}>
        {slots.default?.()}
      </div>
    )
  }
})