// src/components/textBar/textBar.tsx
import { defineComponent, ref, computed, watch, PropType } from 'vue'
import type { TextBarProps } from './types'

export type { TextBarProps }

const prefixCls = 'dpzvc3-textBar'

export default defineComponent({
  name: 'TextBar',
  props: {
    modelValue: { type: [String, Number] as PropType<string | number>, default: '' },
    type: { type: String, default: 'text' },
    placeholder: { type: [String, Number] as PropType<string | number>, default: '请输入' },
    rows: Number,
    autofocus: { type: Boolean, default: true },
    inputStyles: { type: Object as PropType<Record<string, any>>, default: () => ({}) },
    maxlength: Number,
    name: String,
    readonly: { type: Boolean, default: false },
    disable: { type: Boolean, default: false }
  },
  emits: ['update:modelValue', 'input', 'on-input', 'on-enter', 'on-change'],
  setup(props, { emit }) {
    const currentVal = ref(props.modelValue)

    watch(() => props.modelValue, val => {
      currentVal.value = val
    })

    watch(currentVal, val => {
      emit('input', val)
      emit('on-input', val)
      emit('update:modelValue', val)
    })

    const classes = computed(() => [prefixCls])
    const inputClasses = computed(() => [`${prefixCls}-input`])
    const textareaClasses = computed(() => [`${prefixCls}-textarea`])

    // 输入事件
    const changeInput = (e: Event) => {
      const target = e.target as HTMLInputElement | HTMLTextAreaElement
      currentVal.value = target.value
      emit('input', currentVal.value)
      emit('on-input', e)
      emit('update:modelValue', currentVal.value)
      emit('on-change', e)
    }

    // 回车事件
    const enterInput = (e: KeyboardEvent) => {
      emit('on-enter', e)
    }

    return () => {
      if (props.type !== 'textarea') {
        return (
          <div class={classes.value} style={props.inputStyles}>
            <label class={inputClasses.value} style={props.inputStyles}>
              <input
                type={props.type}
                autofocus={props.autofocus}
                value={currentVal.value}
                placeholder={String(props.placeholder)}
                readonly={props.readonly}
                maxlength={props.maxlength}
                name={props.name}
                disabled={props.disable}
                onInput={changeInput}
                onBlur={changeInput}
                onFocus={changeInput}
                onKeyup={(e:any) => e.key === 'Enter' && enterInput(e)}
                onChange={changeInput}
              />
            </label>
          </div>
        )
      } else {
        return (
          <div class={classes.value} style={props.inputStyles}>
            <label class={textareaClasses.value}>
              <textarea
                autofocus={props.autofocus}
                value={currentVal.value}
                placeholder={String(props.placeholder)}
                readonly={props.readonly}
                maxlength={props.maxlength}
                name={props.name}
                rows={props.rows}
                disabled={props.disable}
                onInput={changeInput}
                onBlur={changeInput}
                onFocus={changeInput}
                onKeyup={(e: any) => e.key === 'Enter' && enterInput(e)}
                onChange={changeInput}
              />
            </label>
          </div>
        )
      }
    }
  }
})