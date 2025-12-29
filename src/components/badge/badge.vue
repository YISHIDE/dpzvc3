<template>
  <span :class="classes">
    <slot />
    <sup
      v-show="visible"
      :class="supClasses"
    >{{ displayCount }}</sup>
  </span>
</template>

<script>
import { computed, ref, watch, defineComponent } from 'vue'

const prefixCls = 'dpzvc3-badge'

export default defineComponent({
  name: 'Dpzvc3Badge',
  props: {
    type: {
      type: String,
      default: 'danger',
      validator: (val) => ['normal', 'danger', 'warning', 'success'].includes(val)
    },
    size: {
      type: String,
      default: 'normal',
      validator: (val) => ['small', 'normal', 'large'].includes(val)
    },
    dot: {
      type: Boolean,
      default: false
    },
    max: {
      type: [Number, String],
      default: 99
    },
    number: [Number, String]
  },
  setup (props) {
    const visible = ref(true)

    // 监听 number 来控制 visible
    watch(
      () => props.number,
      (val) => {
        if (props.dot) {
          visible.value = true
        } else if (val == null || isNaN(Number(val))) {
          visible.value = false
        } else {
          visible.value = true
        }
      },
      { immediate: true }
    )

    const classes = computed(() => [prefixCls])
    const supClasses = computed(() => [
      `${prefixCls}-${props.type}`,
      {
        [`${prefixCls}-size-${props.size}`]: !props.dot,
        [`${prefixCls}-dot`]: props.dot
      }
    ])

    const displayCount = computed(() => {
      if (props.dot) return ''
      const num = Number(props.number)
      return num <= Number(props.max) ? String(num) : String(props.max) + '+'
    })

    return {
      classes,
      supClasses,
      visible,
      displayCount
    }
  }
})
</script>
