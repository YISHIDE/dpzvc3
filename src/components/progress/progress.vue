<template>
  <div
    :class="classes"
    :style="styles"
  >
    <slot name="left" />

    <div :class="outerClass">
      <div
        :class="runawayClass"
        :style="runawayStyle"
      />
      <div
        :class="progressClass"
        :style="progressStyle"
      />
    </div>

    <slot name="right" />
  </div>
</template>

<script>
import { defineComponent, ref, computed, watch } from 'vue'

const prefixCls = 'dpzvc3-progress'

export default defineComponent({
  name: 'DpzVcProgress',

  props: {
    styles: {
      type: Object,
      default: () => ({})
    },
    modelValue: {
      type: [Number, String],
      default: 0
    },
    barHeight: {
      type: [String, Number],
      default: 3
    }
  },

  setup (props) {
    /** 当前进度宽度 */
    const width = ref(Number(props.modelValue) || 0)

    /** 同步外部 value */
    watch(
      () => props.modelValue,
      val => {
        const num = Number(val) || 0
        width.value = num >= 100 ? 100 : num
      },
      { immediate: true }
    )

    /** classes */
    const classes = computed(() => [prefixCls])
    const outerClass = computed(() => [`${prefixCls}-outer`])
    const runawayClass = computed(() => [`${prefixCls}-runaway`])
    const progressClass = computed(() => [`${prefixCls}-progress`])

    /** styles */
    const runawayStyle = computed(() => ({
      height: `${props.barHeight}px`
    }))

    const progressStyle = computed(() => ({
      height: `${props.barHeight}px`,
      width: `${width.value}%`
    }))

    return {
      classes,
      outerClass,
      runawayClass,
      progressClass,
      runawayStyle,
      progressStyle
    }
  }
})
</script>
