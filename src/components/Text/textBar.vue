<template>
  <div
    :class="classes"
    :style="styles"
  >
    <!-- 普通输入框 -->
    <label
      v-if="type !== 'textarea'"
      :class="inputClasses"
      :style="inputStyles"
    >
      <input
        :type="type"
        :autofocus="autofocus"
        :value="currentVal"
        :placeholder="placeholder"
        :readonly="readonly"
        :maxlength="maxlength"
        :autocomplete="autocomplete"
        :name="name"
        :disabled="disable"
        @input="changeInput"
        @blur="blurInput"
        @focus="focusInput"
        @keyup.enter="enterInput"
        @change="onChangeInput"
      >
    </label>

    <!-- 多行文本框 -->
    <label
      v-else
      :class="textareaClasses"
    >
      <textarea
        :type="type"
        :autofocus="autofocus"
        :value="currentVal"
        :placeholder="placeholder"
        :readonly="readonly"
        :maxlength="maxlength"
        :name="name"
        :rows="rows"
        :disabled="disable"
        @input="changeInput"
        @blur="blurInput"
        @focus="focusInput"
        @keyup.enter="enterInput"
        @change="onChangeInput"
      />
    </label>
  </div>
</template>

<script>
import { defineComponent, ref, computed, watch } from 'vue'
import Input from '../../mixin/input'

const prefixCls = 'dpzvc3-textBar'

export default defineComponent({
  name: 'TextBar',
  mixins: [Input],
  props: {
    rows: Number,
    autofocus: { type: Boolean, default: true },
    type: { type: String, default: 'text' },
    modelValue: { type: [String, Number], default: '' },
    placeholder: { type: [String, Number], default: '请输入' },
    inputStyles: Object,
    maxlength: Number,
    name: String,
    readonly: { type: Boolean, default: false }
  },
  emits: ['update:modelValue', 'input', 'on-input', 'on-enter'],
  setup (props, { emit }) {
    const currentVal = ref(props.modelValue)

    // 类名
    const classes = computed(() => [prefixCls])
    const inputClasses = computed(() => [`${prefixCls}-input`])
    const textareaClasses = computed(() => [`${prefixCls}-textarea`])

    // 监听 props.value 改变
    watch(
      () => props.modelValue,
      (val) => {
        currentVal.value = val
      }
    )

    // 监听内部值变化
    watch(currentVal, (val) => {
      emit('input', val)
      emit('on-input', val)
      emit('update:modelValue', val)
    })

    // 输入事件
    function changeInput (e) {
      currentVal.value = e.target.value
      emit('input', currentVal.value)
      emit('on-input', e)
      emit('update:modelValue', currentVal.value)
    }

    // 回车事件
    function enterInput (e) {
      emit('on-enter', e)
    }

    return {
      currentVal,
      classes,
      inputClasses,
      textareaClasses,
      changeInput,
      enterInput
    }
  }
})
</script>
