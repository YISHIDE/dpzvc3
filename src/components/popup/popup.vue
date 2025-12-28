<template>
  <div :class="classes">
    <transition name="dpzvc3-ani-fade">
      <div
        v-if="mask && visible"
        class="dpzvc3-popup-mask"
        @click="close"
        @touchmove.prevent
      />
    </transition>
    <transition :name="'dpzvc3-ani-' + position">
      <div
        v-if="visible"
        :class="popupClasses"
        :style="contentStyle"
      >
        <slot />
      </div>
    </transition>
  </div>
</template>

<script>
import { ref, computed, watch } from 'vue'

const prefixCls = 'dpzvc3-popup'

export default {
  name: 'Dpzvc3Popup',
  props: {
    modelValue: { // Vue 3 v-model 默认绑定
      type: Boolean,
      default: false
    },
    position: {
      type: String,
      default: 'bottom',
      validator: (val) => ['top', 'bottom', 'center'].includes(val)
    },
    showMask: {
      type: Boolean,
      default: true
    },
    maskClosable: {
      type: Boolean,
      default: true
    },
    width: {
      type: [Number, String],
      default: '100%'
    },
    height: {
      type: [Number, String]
    },
    styles: {
      type: Object,
      default: () => ({})
    }
  },
  setup (props, { emit }) {
    const visible = ref(props.modelValue)
    const mask = ref(props.showMask)

    // 同步 props -> 状态
    watch(() => props.modelValue, (val) => { visible.value = val })
    watch(visible, (val) => { emit('update:modelValue', val) })

    watch(() => props.showMask, (val) => { mask.value = val })

    const classes = computed(() => [prefixCls])
    const popupClasses = computed(() => [`${prefixCls}-${props.position}`, `${prefixCls}-content`])
    const contentStyle = computed(() => {
      const heightValue = props.height != null ? props.height : (props.position === 'top' ? 'auto' : '100%')
      return { ...props.styles, width: props.width, height: heightValue }
    })

    const close = () => {
      if (props.maskClosable && mask.value) visible.value = false
    }

    return {
      visible,
      mask,
      classes,
      popupClasses,
      contentStyle,
      close
    }
  }
}
</script>
