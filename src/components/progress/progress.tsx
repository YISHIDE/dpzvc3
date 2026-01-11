// src/components/Progress/Progress.tsx
import {
  defineComponent,
  ref,
  computed,
  watch
} from 'vue'
import type { PropType, CSSProperties } from 'vue'
import type { ProgressProps } from './types'
export type { ProgressProps }

const prefixCls = 'dpzvc3-progress'

export default defineComponent({
  name: 'DpzVcProgress',

  props: {
    styles: {
      type: Object as PropType<CSSProperties>,
      default: () => ({})
    },
    modelValue: {
      type: [Number, String] as PropType<number | string>,
      default: 0
    },
    barHeight: {
      type: [Number, String] as PropType<number | string>,
      default: 3
    }
  },

  setup (props, { slots }) {
    /** 当前进度 */
    const width = ref<number>(0)

    /** 同步 v-model */
    watch(
      () => props.modelValue,
      (val) => {
        const num = Number(val) || 0
        width.value = num >= 100 ? 100 : num
      },
      { immediate: true }
    )

    /** class */
    const classes = computed(() => [prefixCls])
    const outerClass = computed(() => [`${prefixCls}-outer`])
    const runawayClass = computed(() => [`${prefixCls}-runaway`])
    const progressClass = computed(() => [`${prefixCls}-progress`])

    /** style */
    const runawayStyle = computed<CSSProperties>(() => ({
      height: `${props.barHeight}px`
    }))

    const progressStyle = computed<CSSProperties>(() => ({
      height: `${props.barHeight}px`,
      width: `${width.value}%`
    }))

    return () => (
      <div class={classes.value} style={props.styles}>
        {slots.left?.()}

        <div class={outerClass.value}>
          <div
            class={runawayClass.value}
            style={runawayStyle.value}
          />
          <div
            class={progressClass.value}
            style={progressStyle.value}
          />
        </div>

        {slots.right?.()}
      </div>
    )
  }
})
