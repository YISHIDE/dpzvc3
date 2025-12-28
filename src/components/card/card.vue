<template>
  <div
    :class="classes"
    :style="{ width: cardWidth }"
  >
    <div :class="headerClass">
      <slot name="header" />
    </div>
    <div :class="contentClass">
      <slot>
        <div class="main" />
      </slot>
    </div>
    <div :class="footerClass">
      <slot name="footer" />
    </div>
  </div>
</template>

<script>
import { defineComponent, computed } from 'vue'

const prefixCls = 'dpzvc3-card'

export default defineComponent({
  name: 'Dpzvc3Card',
  props: {
    width: {
      type: String,
      default: '100%'
    }
  },
  setup (props) {
    const classes = computed(() => [prefixCls])
    const headerClass = computed(() => [`${prefixCls}-header`, 'dpzvc3-1px-bottom'])
    const contentClass = computed(() => [`${prefixCls}-content`])
    const footerClass = computed(() => [`${prefixCls}-footer`, 'dpzvc3-1px-top'])
    const cardWidth = computed(() => props.width)
    return {
      classes,
      headerClass,
      contentClass,
      footerClass,
      cardWidth
      // 不返回 width，模板直接用 props.width
    }
  }
})
</script>
