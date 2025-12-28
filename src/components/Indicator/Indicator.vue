<template>
  <transition name="dpzvc3-ani-fade">
    <div
      v-show="visible"
      :class="classes"
      @touchmove.prevent
    >
      <div :class="containerClasses">
        <div :class="wrapperClasses">
          <Spinner
            :size="size"
            :type="type"
            :color="color"
          />
          <span :style="{ color }">{{ text }}</span>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { defineComponent, ref, watch, computed } from 'vue'
import Spinner from '../spinner'

const prefixCls = 'dpzvc3-Indicator'

export default defineComponent({
  name: 'Dpzvc3Indicator',
  components: { Spinner },
  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: '#ffffff'
    },
    type: {
      type: String,
      default: 'snake'
    },
    size: {
      type: [Number, String],
      default: 45
    },
    text: {
      type: String,
      default: '加载中...'
    }
  },
  emits: ['update:modelValue'],
  setup (props, { emit }) {
    const visible = ref(props.modelValue)

    // watch modelValue 更新 visible
    watch(
      () => props.modelValue,
      val => {
        visible.value = val
      }
    )

    // watch visible 更新 v-model
    watch(visible, val => {
      emit('update:modelValue', val)
    })

    const classes = computed(() => [prefixCls])
    const containerClasses = computed(() => [`${prefixCls}-container`])
    const wrapperClasses = computed(() => [`${prefixCls}-wrapper`])

    return {
      visible,
      classes,
      containerClasses,
      wrapperClasses
    }
  }
})
</script>
