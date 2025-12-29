<template>
  <label :class="classes">
    <span :class="wrapperClasses">
      <span :class="innerClasses">
        <input
          type="radio"
          :disabled="disable"
          :checked="isChecked"
          :class="inputClass"
          @change="handleChange"
        >
      </span>
    </span>
    <slot v-if="show"><span ref="slotEl">{{ label }}</span></slot>
  </label>
</template>

<script>
import { defineComponent, inject, computed, ref, onMounted } from 'vue'

const prefixCls = 'dpzvc3-radiobox'

export default defineComponent({
  name: 'RadioBox',
  props: {
    label: { type: [String, Number], required: true },
    modelValue: { type: Boolean, default: false },
    disable: { type: Boolean, default: false }
  },
  emits: ['update:modelValue', 'on-change'],
  setup (props, { emit }) {
    const slotEl = ref(null)
    const show = ref(true)
    const group = inject('radioBoxGroup', null) // 如果有group则为对象，没有则为null

    const isChecked = computed(() => {
      if (group) {
        return group.currentValue.value === props.label
      } else {
        return props.modelValue
      }
    })

    const classes = computed(() => [prefixCls])
    const wrapperClasses = computed(() => [
      `${prefixCls}-wrapper`,
      {
        [`${prefixCls}-checked`]: isChecked.value,
        [`${prefixCls}-disable`]: props.disable
      }
    ])
    const innerClasses = computed(() => [`${prefixCls}-inner`])
    const inputClass = computed(() => [`${prefixCls}-input`])

    function handleChange (e) {
      if (props.disable) return
      const checked = e.target.checked

      if (group) {
        group.change(props.label)
      } else {
        // console.log(checked, 'ddadda')
        emit('update:modelValue', checked)
        emit('on-change', checked)
      }
    }

    onMounted(() => {
      if (!group) {
        // 判断是否有 slot 内容
        if (slotEl.value && !slotEl.value.innerHTML) {
          show.value = false
        }
      }
    })

    return {
      classes,
      wrapperClasses,
      innerClasses,
      inputClass,
      isChecked,
      handleChange,
      show,
      slotEl
    }
  }
})
</script>
