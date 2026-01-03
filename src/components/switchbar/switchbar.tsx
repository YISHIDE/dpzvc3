// src/components/switchbar/switchbar.tsx
import { defineComponent, ref, computed, watch, onMounted, PropType } from 'vue'
import { randomStr } from '../../utils/util'
import type { SwitchBarProps } from './types'

export type { SwitchBarProps }

const prefixCls = 'dpzvc3-switch'

export default defineComponent({
  name: 'SwitchBar',
  props: {
    id: { type: String, default: null },
    modelValue: { type: Boolean, default: false },
    size: { type: String as PropType<'small' | 'large'>, default: 'small' }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const name = ref(props.id || '')
    const currentValue = ref(props.modelValue)

    // 外部 v-model
    watch(() => props.modelValue, val => {
      currentValue.value = val
    })

    // 内部变化通知父组件
    watch(currentValue, val => {
      emit('update:modelValue', val)
    })

    // 自动生成 id
    onMounted(() => {
      if (!props.id) {
        name.value = Date.now() + '_' + randomStr()
      }
    })

    const classes = computed(() => [prefixCls])
    const inputCheckClasses = computed(() => [`${prefixCls}-checkbox`, 'hidden'])
    const sizeClasses = computed(() => [
      `${prefixCls}-ui`,
      { small: props.size === 'small' }
    ])

    return () => (
      <div class={classes.value}>
        <input
          id={name.value}
          type="checkbox"
          class={inputCheckClasses.value}
          v-model={currentValue.value}
        />
        <label for={name.value} class={sizeClasses.value} />
      </div>
    )
  }
})