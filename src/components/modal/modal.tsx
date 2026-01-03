// src/components/modal/modal.tsx
import {
  defineComponent,
  ref,
  computed,
  watch,
  Transition,
  PropType
} from 'vue'
import VButton from '../button'
import type { ModalProps } from './types'

export type { ModalProps }

const prefixCls = 'dpzvc3-modal'

export default defineComponent({
  name: 'Dpzvc3Modal',

  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
    maskClosable: {
      type: Boolean,
      default: true
    },
    title: String,
    width: {
      type: String,
      default: '70%'
    },
    okText: {
      type: String,
      default: '确定'
    },
    cancleText: {
      type: String,
      default: '取消'
    },
    loading: {
      type: Boolean,
      default: false
    },
    styles: {
      type: Object as PropType<Record<string, any>>,
      default: () => ({})
    },
    showHead: {
      type: Boolean,
      default: true
    },
    footerHide: {
      type: Boolean,
      default: false
    },
    body: String
  },

  emits: [
    'update:modelValue',
    'on-ok',
    'on-cancle'
  ],

  setup(props: ModalProps, { emit, slots }) {
    const visible = ref(!!props.modelValue)
    const isHead = ref(!!props.showHead)
    const buttonLoading = ref(false)

    const getWrapperStyle = computed(() => ({
      width: props.width,
      ...(props.styles || {})
    }))

    /* watch props */
    watch(
      () => props.modelValue,
      val => (visible.value = !!val)
    )

    watch(
      () => props.showHead,
      val => (isHead.value = !!val)
    )

    /* methods */
    const close = () => {
      emit('update:modelValue', false)
      emit('on-cancle')
    }

    const mask = () => {
      if (props.maskClosable && !buttonLoading.value) {
        close()
      }
    }

    const ok = () => {
      if (props.loading) {
        buttonLoading.value = true
      } else {
        emit('update:modelValue', false)
      }
      emit('on-ok')
    }

    return () => (
      <>
        {/* mask */}
            <Transition name="dpzvc3-ani-fade"
                v-slots={{
                default: () =>visible.value && (
                <div
                class="dpzvc3-modal-mask"
                onClick={mask}
                onTouchstart={(e:any) => e.preventDefault()}
                onTouchmove={(e:any) => e.preventDefault()}
                onTouchend={(e:any) => e.preventDefault()}
                />)
                }}
            />
        {/* </Transition> */}
{/* <Transition
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
        /> */}
            

            {/* modal */}
            <Transition name="dpzvc3-ani-scale"
                v-slots={{
                default: () =>visible.value && (
                <div
                class={prefixCls}
                style={getWrapperStyle.value}
                >
                  {/* header */}
                  {isHead.value && (
                    <div class={`${prefixCls}-header`}>
                      {slots.header ? (
                        slots.header()
                      ) : (
                        <div class={`${prefixCls}-header-inner ellipse-fir`}>
                          {props.title}
                        </div>
                      )}
                    </div>
                  )}

                  {/* body */}
                  <div class={`${prefixCls}-body`}>
                    {slots.body ? slots.body() : props.body}
                  </div>

                  {/* footer */}
                  {!props.footerHide && (
                    <div class={`${prefixCls}-footer`}>
                      {slots.footer ? (
                        slots.footer()
                      ) : (
                        <>
                          {props.cancleText && (
                            <VButton type="primary" onClick={close}>
                              {props.cancleText}
                            </VButton>
                          )}
                          <VButton
                            type="normal"
                            loading={buttonLoading.value}
                            onClick={ok}
                          >
                            {props.okText}
                          </VButton>
                        </>
                      )}
                    </div>
                  )}
                </div>
                )
                }}
            
            />
      </>
    )
  }
})

//  {/* <Transition name="dpzvc3-ani-scale"> */}
//           {visible.value && (
//             <div
//               class={prefixCls}
//               style={getWrapperStyle.value}
//             >
//               {/* header */}
//               {isHead.value && (
//                 <div class={`${prefixCls}-header`}>
//                   {slots.header ? (
//                     slots.header()
//                   ) : (
//                     <div class={`${prefixCls}-header-inner ellipse-fir`}>
//                       {props.title}
//                     </div>
//                   )}
//                 </div>
//               )}

//               {/* body */}
//               <div class={`${prefixCls}-body`}>
//                 {slots.body ? slots.body() : props.body}
//               </div>

//               {/* footer */}
//               {!props.footerHide && (
//                 <div class={`${prefixCls}-footer`}>
//                   {slots.footer ? (
//                     slots.footer()
//                   ) : (
//                     <>
//                       {props.cancleText && (
//                         <VButton type="primary" onClick={close}>
//                           {props.cancleText}
//                         </VButton>
//                       )}
//                       <VButton
//                         type="normal"
//                         loading={buttonLoading.value}
//                         onClick={ok}
//                       >
//                         {props.okText}
//                       </VButton>
//                     </>
//                   )}
//                 </div>
//               )}
//             </div>
//           )}
//         {/* </Transition> */}