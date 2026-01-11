// src/components/Prompt/Prompt.tsx
import {
  defineComponent,
  ref,
  watch
} from 'vue'
import type { PropType } from 'vue'
import type { PromptProps } from './types'

import Modal from '../modal/modal'
import TextBar from '../Text/textBar'
import DpButton from '../button/button'

export default defineComponent({
  name: 'Dpzvc3Prompt',

  props: {
    value: { type: Boolean, default: false },
    text: { type: String, default: '' },
    closable: { type: Boolean, default: true },
    maskClosable: { type: Boolean, default: true },
    title: String,
    width: { type: String, default: '220px' },
    okText: { type: String, default: '确定' },
    cancleText: { type: String, default: '取消' },
    loading: { type: Boolean, default: false },
    styles: Object as PropType<Record<string, any>>,
    spec: { type: String, default: '提示' },
    validator: {
      type: [RegExp, Function] as PropType<PromptProps['validator'] | null>,
      default: null
    },
    msg: String,
    placeholderText: String,
    onOk: {
      type: Function as PropType<(val: string) => void>,
      default: () => {}
    },
    onCancle: {
      type: Function as PropType<() => void>,
      default: () => {}
    }
  },

  emits: ['update:value', 'on-ok', 'on-cancle'],

  setup (props, { emit }) {
    /** 内部状态 */
    const visible = ref(props.value)
    const texts = ref(props.text)
    const message = ref(props.msg || '')
    const placeholder = ref(props.placeholderText)
    const buttonLoading = ref(false)

    /** 同步外部 */
    watch(() => props.value, val => {
      visible.value = val
    })

    watch(() => props.text, val => {
      texts.value = val
    })

    watch(() => props.loading, val => {
      buttonLoading.value = val
    })

    /** 确定 */
    const ok = () => {
      let valid: boolean | string = true

      if (props.validator) {
        if (props.validator instanceof RegExp) {
          valid = props.validator.test(texts.value)
        } else if (typeof props.validator === 'function') {
          valid = props.validator(texts.value)
        }
      }

      if (valid !== true) {
        message.value = typeof valid === 'string' ? valid : ''
        return
      }

      emit('update:value', false)
      props.onOk?.(texts.value)
      emit('on-ok', texts.value)
    }

    /** 取消 */
    const cancle = () => {
      emit('update:value', false)
      props.onCancle?.()
      emit('on-cancle')
    }

    return () => (
      <Modal
        v-model={visible.value}
        width={props.width}
        title={props.title}
        style={props.styles}
        maskClosable={props.maskClosable}
      >
        {{
          header: () => (
            <div
              class="dpzvc3-modal-header-inner ellipse-fir"
              innerHTML={props.title}
            />
          ),

          body: () => (
            <div class="dpzvc3-prompt-body-inner">
              <div class="dpzvc3-prompt-content">
                <span class="dpzvc3-prompt-spec">
                  {props.spec}
                </span>

                <TextBar
                  v-model={texts.value}
                  type="text"
                  placeholder={placeholder.value}
                />

                {message.value && (
                  <div
                    class="dpzvc3-prompt-error"
                    innerHTML={message.value}
                  />
                )}
              </div>
            </div>
          ),

          footer: () => (
            <>
              <DpButton
                styles={{ background: '#ffffff', color: 'red' }}
                onClick={ok}
              >
                {{
                  'button-inner': () => props.okText
                }}
              </DpButton>

              <DpButton
                styles={{ background: '#ffffff', color: '#ccc' }}
                onClick={cancle}
              >
                {{
                  'button-inner': () => props.cancleText
                }}
              </DpButton>
            </>
          )
        }}
      </Modal>
    )
  }
})
