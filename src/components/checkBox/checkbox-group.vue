<template>
  <div
    :class="[
      'dpzvc3-checkBoxGroup',
      vertical ? 'dpzvc3-checkBoxGroup-vertical' : ''
    ]"
  >
    <slot />
  </div>
</template>

<script>
import { defineComponent, ref, watch, provide } from 'vue'
// import Emitter from '../../mixin/emitter'

export default defineComponent({
  name: 'CheckBoxGroup',
  // mixins: [Emitter],

  props: {
    modelValue: {
      type: Array,
      default: () => []
    },
    single: {
      type: Boolean,
      default: false
    },
    vertical: {
      type: Boolean,
      default: false
    }
  },

  emits: ['update:modelValue', 'on-change'],

  setup (props, { emit }) {
    // alert(props)
    const currentValue = ref([...props.modelValue])

    /** 对外暴露给 checkbox 的方法 */
    const toggleOption = (label) => {
      let newValue = []
      newValue = [...label]
      // currentValue.value = newValue
      emit('update:modelValue', newValue)
      emit('on-change', newValue)
    }

    /** 提供给子 checkbox */
    provide('CheckBoxGroup', {
      currentValue,
      toggleOption
      // single: props.single
    })

    watch(
      () => props.modelValue,
      (val) => {
        currentValue.value = [...val]
      }
    )

    return {}
  }
})
</script>

<style scoped>
.dpzvc3-checkBoxGroup-vertical {
  display: flex;
  flex-direction: column;
}
</style>
