<template>
  <span :class="classes">
    <slot />
    <sup
      v-show="visible"
      :class="supClasses"
    >{{ displayCount }}</sup>
  </span>
</template>

<script lang="ts">
import { computed, ref, watch, defineComponent, PropType } from 'vue'

const prefixCls = 'dpzvc3-badge'
type BadgeType = 'normal' | 'danger' | 'warning' | 'success'
type BadgeSize = 'small' | 'normal' | 'large'

export default defineComponent({
  name: 'Dpzvc3Badge',
  props: {
    type: {
      type: String as PropType<BadgeType>,
      default: 'danger',
      validator: (val: string): boolean => ['normal', 'danger', 'warning', 'success'].includes(val)
    },
    size: {
      type: String as PropType<BadgeSize>,
      default: 'normal',
      validator: (val: string): boolean => ['small', 'normal', 'large'].includes(val)
    },
    dot: {
      type: Boolean,
      default: false
    },
    max: {
      type: [Number, String] as PropType<number | string>,
      default: 99
    },
    number: {
      type: [Number, String] as PropType<number | string>,
      default: undefined
    }
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
