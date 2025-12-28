<template>
  <div :class="classes">
    <input
      :id="name"
      v-model="currentValue"
      type="checkbox"
      :class="inputCheckClasses"
    >
    <label
      :for="name"
      :class="sizeClasses"
    />
  </div>
</template>

<script>
import { defineComponent, ref, computed, watch, onMounted } from 'vue'
import { randomStr } from '../../utils/util'

const prefixCls = 'dpzvc3-switch'

export default defineComponent({
  name: 'SwitchBar',
  props: {
    id: {
      type: String,
      default: null
    },
    modelValue: { // Vue 3 使用 v-model 绑定 modelValue
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'small',
      validator (val) {
        return ['small', 'large'].includes(val)
      }
    }
  },
  emits: ['update:modelValue'],
  setup (props, { emit }) {
    const name = ref(props.id || '')
    const currentValue = ref(props.modelValue)

    // 监听外部 v-model 变化
    watch(() => props.modelValue, val => {
      currentValue.value = val
    })

    // 监听内部 value 变化，通知父组件
    watch(currentValue, val => {
      emit('update:modelValue', val)
    })

    // 组件挂载时，如果没有传 id，自动生成
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

    return {
      name,
      currentValue,
      classes,
      inputCheckClasses,
      sizeClasses
    }
  }
})
</script>
