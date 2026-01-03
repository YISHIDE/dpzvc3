// src/components/header/header.tsx
import {
  defineComponent,
  ref,
  computed,
  onMounted,
  watch,
  PropType
} from 'vue'

import type { HeaderProps } from './types'
export type { HeaderProps }

const prefixCls = 'dpzvc3-header'

export default defineComponent({
  name: 'Dpzvc3Header',

  props: {
    modelValue: {
      type: Boolean as PropType<boolean>,
      default: true
    },
    fixed: {
      type: Boolean as PropType<boolean>,
      default: true
    },
    title: {
      type: String as PropType<string>,
      default: ''
    },
    wechat: {
      type: Boolean as PropType<boolean>,
      default: false
    }
  },

  emits: ['update:modelValue'],

  setup(props, { emit, slots }) {
    const visible = ref<boolean>(props.modelValue)
    const isWechat = ref<boolean>(props.wechat)

    /** class 计算 */
    const classes = computed(() => [
      prefixCls,
      props.fixed && `${prefixCls}-fixed`
    ])

    /** UA 判断 */
    const isWeixin = computed(() =>
      /micromessenger/i.test(window.navigator.userAgent)
    )

    const isPcWeixin = computed(() =>
      /windowswechat/i.test(window.navigator.userAgent)
    )

    /** v-model 同步 */
    watch(
      () => props.modelValue,
      val => {
        visible.value = val
      }
    )

    watch(
      () => props.wechat,
      val => {
        isWechat.value = val
      }
    )

    /** mounted 逻辑 */
    onMounted(() => {
      if ((isWeixin.value || isPcWeixin.value) && !isWechat.value) {
        emit('update:modelValue', false)
      }
    })

    /** 返回 */
    const back = () => {
      window.history.back()
    }

    /** JSX render */
    return () =>
      visible.value ? (
        <div class={classes.value}>
          <header>
            {/* left */}
            <div class="left" onClick={back}>
              {slots.left ? (
                slots.left()
              ) : (
                <>
                  <span class="arrow" />
                  <span class="text">返回</span>
                </>
              )}
            </div>

            {/* title */}
            <div class="title dpzvc3-nowrap">
              {props.title}
            </div>

            {/* right */}
            <div class="right">
              {slots.right ? slots.right() : <div />}
            </div>
          </header>

          {/* 占位 */}
          {props.fixed && <div class="header-place" />}
        </div>
      ) : null
  }
})