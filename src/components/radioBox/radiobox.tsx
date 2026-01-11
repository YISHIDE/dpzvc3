// src/components/RadioBox/RadioBox.tsx
import {
  defineComponent,
  inject,
  computed,
  ref,
  onMounted
} from 'vue'
import type { PropType } from 'vue'
import type {
  RadioBoxProps,
  RadioGroupProvide
} from './types'
export type { RadioBoxProps }
const prefixCls = 'dpzvc3-radiobox'
const radioGroupKey = 'radioBoxGroup'

export default defineComponent({
  name: 'RadioBox',

  props: {
    label: {
      type: [String, Number] as PropType<RadioBoxProps['label']>,
      required: true
    },
    modelValue: {
      type: Boolean,
      default: false
    },
    disable: {
      type: Boolean,
      default: false
    }
  },

  emits: ['update:modelValue', 'on-change'],

  setup (props, { emit, slots }) {
    const slotEl = ref<HTMLElement | null>(null)
    const show = ref(true)

    /** 注入 RadioGroup（可选） */
    const group = inject<RadioGroupProvide | null>(
      radioGroupKey,
      null
    )

    /** 是否选中 */
    const isChecked = computed<boolean>(() => {
      if (group) {
        return group.currentValue.value === props.label
      }
      return !!props.modelValue
    })

    /** classes */
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

    /** change */
    const handleChange = (e: Event) => {
      if (props.disable) return

      const checked = (e.target as HTMLInputElement).checked

      if (group) {
        group.change(props.label)
      } else {
        emit('update:modelValue', checked)
        emit('on-change', checked)
      }
    }

    /** 判断 slot 是否为空 */
    onMounted(() => {
      if (!group) {
        if (slotEl.value && !slotEl.value.innerHTML) {
          show.value = false
        }
      }
    })

    return () => (
      <label class={classes.value}>
        <span class={wrapperClasses.value}>
          <span class={innerClasses.value}>
            <input
              type="radio"
              disabled={props.disable}
              checked={isChecked.value}
              class={inputClass.value}
              onChange={handleChange}
            />
          </span>
        </span>

        {show.value && (
          slots.default
            ? slots.default()
            : <span ref={slotEl}>{props.label}</span>
        )}
      </label>
    )
  }
})
