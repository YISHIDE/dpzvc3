// src/components/checkbox/Checkbox.tsx
import {
  defineComponent,
  ref,
  computed,
  inject,
  watch,
  onMounted,
  PropType
} from 'vue'
import type { CheckBoxProps, CheckBoxGroupInject, CheckBoxLabel } from './types'
export type { CheckBoxProps }

const prefixCls = 'dpzvc3-checkbox'

export default defineComponent({
  name: 'DpzVcCheckBox',

  props: {
    disable: { type: Boolean, default: false },
    modelValue: { type: Boolean, default: false },
    label: { type: [String, Number, Boolean] as PropType<CheckBoxLabel> }
  },

  emits: ['update:modelValue', 'on-change'],

  setup(props, { emit, slots }) {
    /** 注入 checkboxGroup（由 CheckBoxGroup provide） */
    const checkboxGroup = inject<CheckBoxGroupInject | null>('CheckBoxGroup', null)
    const isGroup = ref(!!checkboxGroup)

    const currentValue = ref<boolean>(props.modelValue)
    const show = ref(true)
    const slotRef = ref<HTMLElement | null>(null)

    /** classes */
    const classes = computed(() => [prefixCls])
    const wrapperClasses = computed(() => [
      `${prefixCls}-wrapper`,
      {
        [`${prefixCls}-checked`]: currentValue.value,
        [`${prefixCls}-disable`]: props.disable
      }
    ])
    const innerClasses = computed(() => [`${prefixCls}-inner`])

    /** watch 外部 modelValue 同步 */
    watch(
      () => props.modelValue,
      val => {
        currentValue.value = val
      }
    )

    /** change 处理 */
    const change = (e: Event) => {
      if (props.disable) return

      const target = e.target as HTMLInputElement
      const checked = target.checked
      currentValue.value = checked

      if (isGroup.value && checkboxGroup) {
        const value = [...checkboxGroup.currentValue.value]
        const index = value.indexOf(props.label as any)
        if (checked && index === -1) value.push(props.label as any)
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
        const index = value.indexOf(props.label as any)
        if (index !== -1) currentValue.value = true
      }
      if (slotRef.value && !slotRef.value.innerHTML) {
        show.value = false
      }
    })

    return () => (
      <label class={classes.value}>
        <span class={wrapperClasses.value}>
          <span class={innerClasses.value} />
          <input
            type="checkbox"
            class={`${prefixCls}-input noselect`}
            disabled={props.disable}
            checked={currentValue.value}
            onChange={change}
          />
        </span>

        {show.value && (
          <span ref={slotRef}>
            {slots.default?.() ?? props.label}
          </span>
        )}
      </label>
    )
  }
})