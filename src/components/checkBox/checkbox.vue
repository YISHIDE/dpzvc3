<template>
  <label :class="classes">
    <span :class="wrapperClasses">
      <span :class="innerClasses" />
      <input
        type="checkbox"
        class="dpzvc3-checkbox-input noselect"
        :disabled="disable"
        :checked="currentValue"
        @change="change"
      >
    </span>
    <slot v-if="show">
      <span ref="slotRef">{{ label }}</span>
    </slot>
  </label>
</template>

<script>
import {
  defineComponent,
  ref,
  computed,
  inject,
  watch,
  onMounted
} from 'vue'

export default defineComponent({
  name: 'CheckBox',

  props: {
    disable: {
      type: Boolean,
      default: false
    },
    modelValue: {
      type: Boolean,
      default: false
    },
    label: {
      type: [String, Number, Boolean]
    }
  },

  emits: ['update:modelValue', 'on-change'],

  setup (props, { emit }) {
    // 注入 checkboxGroup（由 CheckBoxGroup provide）
    const checkboxGroup = inject('CheckBoxGroup')
    // console.log(checkboxGroup, 'checkboxGroup')
    const isGroup = ref(!!checkboxGroup)
    const currentValue = ref(props.modelValue)
    const show = ref(true)
    const slotRef = ref(null)

    const classes = computed(() => ['dpzvc3-checkbox'])

    const wrapperClasses = computed(() => [
      'dpzvc3-checkbox-wrapper',
      {
        'dpzvc3-checkbox-checked': currentValue.value,
        'dpzvc3-checkbox-disable': props.disable
      }
    ])

    const innerClasses = computed(() => ['dpzvc3-checkbox-inner'])

    watch(
      () => props.modelValue,
      val => {
        currentValue.value = val
      }
    )

    const change = (e) => {
      if (props.disable) return
      const checked = e.target.checked
      currentValue.value = checked

      // group 模式
      if (isGroup.value && checkboxGroup) {
        const value = [...checkboxGroup.currentValue.value]
        const index = value.indexOf(props.label)

        if (checked && index === -1) value.push(props.label)
        if (!checked && index > -1) value.splice(index, 1)
        checkboxGroup.toggleOption(value)
      } else {
        emit('update:modelValue', checked)
        emit('on-change', checked)
      }
    }

    onMounted(() => {
      if (isGroup.value && checkboxGroup) {
        const value = [...checkboxGroup.currentValue.value]
        const index = value.indexOf(props.label)
        if (index !== -1) currentValue.value = true
      }
      if (slotRef.value && !slotRef.value.innerHTML) {
        show.value = false
      }
    })

    return {
      slotRef,
      show,
      currentValue,
      classes,
      wrapperClasses,
      innerClasses,
      change
    }
  }
})
</script>
