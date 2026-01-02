// src/components/action-sheet/action-sheet.tsx
import { defineComponent, ref, computed, watch, PropType } from 'vue'
import Popup from '../popup'
// import type { PopupProps } from '../popup/types'
import type { ActionSheetProps  } from './types'
export type { ActionSheetProps  } 


export type ActionItem = {
  text: string
  onClick?: (item: ActionItem, index: number) => void
}

// export type ActionSheetProps = {
//   modelValue?: boolean
//   items?: ActionItem[]
//   cancleText?: string
// }

const prefixCls = 'dpzvc3-actionSheet'

export default defineComponent({
  name: 'ActionSheet',
  props: {
    modelValue: { type: Boolean, default: false },
    items: { type: Array as PropType<ActionItem[]>, default: () => [] },
    cancleText: { type: String, default: '取消' }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const visible = ref(props.modelValue)
    const actions = ref(props.items)

    // 同步 props.modelValue
    watch(() => props.modelValue, val => { visible.value = val })
    // 同步 actions
    watch(() => props.items, val => { actions.value = val })

    const classes = computed(() => [prefixCls])
    const wrapperClasses = computed(() => [`${prefixCls}-wrapper`])
    const wrapperActionClass = computed(() => [`${prefixCls}-wrapper-action`])
    const cancleClass = computed(() => [`${prefixCls}-cancle`])

    const emitAction = (item: ActionItem, index: number) => {
      item.onClick?.(item, index)
      emit('update:modelValue', false)
    }

    const cancleClick = () => {
      emit('update:modelValue', false)
    }

    return () => (
      <div>
        <Popup
          v-model={visible.value}
          position="bottom"
          styles={{ background: 'transparent' }}
        >
          <div class={classes.value}>
            <ul class={wrapperClasses.value}>
              {actions.value.map((item, index) => (
                <li
                  key={index}
                  class={wrapperActionClass.value}
                  onClick={() => emitAction(item, index)}
                >
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
            {props.cancleText && (
              <a
                href="javascript:;"
                class={cancleClass.value}
                onClick={cancleClick}
              >
                {props.cancleText}
              </a>
            )}
          </div>
        </Popup>
      </div>
    )
  }
})