import { defineComponent, ref, computed, watch, PropType, Transition } from 'vue'
import { inputEmits } from './types'
import type { CSSProperties } from 'vue'
import type { PopupProps, PopupEmits, PopupClassNameArray } from './types'
export type { PopupProps, PopupEmits }

const prefixCls = 'dpzvc3-popup'

export default defineComponent({
  name: 'Dpzvc3Popup',
  props: {
    modelValue: { type: Boolean, default: false },
    position: { type: String as PropType<PopupProps['position']>, default: 'bottom' },
    showMask: { type: Boolean, default: true },
    maskClosable: { type: Boolean, default: true },
    width: { type: [Number, String] as PropType<number | string>, default: '100%' },
    height: { type: [Number, String] as PropType<number | string> },
    styles: { type: Object as PropType<PopupProps['styles']>, default: () => ({}) }
  },
  emits: inputEmits,
  setup(props, { emit, slots }) {
    const visible = ref<PopupProps['modelValue']>(props.modelValue)
    const mask = ref<PopupProps['showMask']>(props.showMask)

    watch<PopupProps['modelValue']>(() => props.modelValue, val => { visible.value = val })
    watch<PopupProps['modelValue']>(visible, val => { emit('update:modelValue', val) })
    watch<PopupProps['showMask']>(() => props.showMask, val => { mask.value = val })

    const classes = computed<PopupClassNameArray>(() => [prefixCls])
    const popupClasses = computed<PopupClassNameArray>(() => [`${prefixCls}-${props.position}`, `${prefixCls}-content`])
    const contentStyle = computed<CSSProperties>(() => {
      const heightValue = props.height != null ? props.height : (props.position === 'top' ? 'auto' : '100%')
      return { ...props.styles, width: props.width, height: heightValue }
    })

    const close = () => { if (props.maskClosable && mask.value) visible.value = false }

    return () => (
      <div class={classes.value}>
        {/* 遮罩层 */}
        <Transition
          name="dpzvc3-ani-fade"
          v-slots={{
            default: () =>
              mask.value && visible.value && (
                <div
                  class={`${prefixCls}-mask`}
                  onClick={close}
                  onTouchMove={(e:any) => e.preventDefault()}
                />
              )
          }}
        />

        {/* 弹窗内容 */}
        <Transition
          name={`dpzvc3-ani-${props.position}`}
          v-slots={{
            default: () =>
              visible.value && (
                <div class={popupClasses.value} style={contentStyle.value}>
                  {slots.default?.()}
                </div>
              )
          }}
        />
      </div>
    )
  }
})