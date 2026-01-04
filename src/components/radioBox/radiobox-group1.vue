<template>
  <div :class="classes">
    <slot />
  </div>
</template>

<script>
import { defineComponent, computed, watch, provide, ref } from 'vue'

const prefixCls = 'dpzvc3-radioBoxGroup'

export default defineComponent({
  name: 'RadioBoxGroup',
  props: {
    modelValue: {
      type: [String, Boolean, Number],
      default: ''
    },
    vertical: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue', 'on-change', 'on-form-change'],
  setup (props, { emit }) {
    const currentValue = ref(props.modelValue)

    // 提供给子组件
    provide('radioBoxGroup', {
      currentValue,
      change: (val) => {
        currentValue.value = val
        emit('update:modelValue', val)
        emit('on-change', val)
        emit('on-form-change', val)
      }
    })

    // 监听外部 v-model 改变
    watch(
      () => props.modelValue,
      (val) => {
        currentValue.value = val
      }
    )

    const classes = computed(() => [
      prefixCls,
      { [`${prefixCls}-vertical`]: props.vertical }
    ])

    return {
      classes,
      currentValue
    }
  }
})
</script>

<style scoped>
.dpzvc3-radioBoxGroup-vertical {
  display: flex;
  justify-content: center;
  flex-direction: column;
}
</style>
