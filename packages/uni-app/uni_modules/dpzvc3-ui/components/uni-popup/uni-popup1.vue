<template>
  <view :class="classes">
    <!-- 遮罩层 -->
    <Transition name="dpzvc3-ani-fade">
      <view
        v-if="mask && visible"
        :class="`${prefixCls}-mask`"
        @click="close"
        @touchmove.stop.prevent
      />
    </Transition>

    <!-- 弹窗内容 -->
    <Transition :name="`dpzvc3-ani-${position}`">
      <view
        v-if="visible"
        :class="popupClasses"
        :style="contentStyle"
      >
        <slot />
      </view>
    </Transition>
  </view>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import type { CSSProperties, PropType } from 'vue'
import type { PopupProps, PopupEmits, PopupClassNameArray } from './types'
// import { inputEmits } from './types'

defineOptions({
  name: 'Dpzvc3Popup'
})

const prefixCls = 'dpzvc3-popup'

/* props */
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  position: {
    type: String as PropType<PopupProps['position']>,
    default: 'bottom'
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
    type: [Number, String] as PropType<number | string>,
    default: '100%'
  },
  height: {
    type: [Number, String] as PropType<number | string>,
    default: undefined
  },
  styles: {
    type: Object as PropType<PopupProps['styles']>,
    default: () => ({})
  }
})

/* emits */
const emit = defineEmits<PopupEmits>()

/* state */
const visible = ref<PopupProps['modelValue']>(props.modelValue)
const mask = ref<PopupProps['showMask']>(props.showMask)

/* watch */
watch(
  () => props.modelValue,
  val => {
    console.log('props.modelValue 改变了：', val);
    visible.value = val
  }
)

watch(visible, val => {
  emit('update:modelValue', val)
})

watch(
  () => props.showMask,
  val => {
    mask.value = val
  }
)

/* computed */
const classes = computed<PopupClassNameArray>(() => [prefixCls])

const popupClasses = computed<PopupClassNameArray>(() => [
  `${prefixCls}-${props.position}`,
  `${prefixCls}-content`
])

const contentStyle = computed<CSSProperties>(() => {
  const heightValue =
    props.height != null
      ? props.height
      : props.position === 'top'
        ? 'auto'
        : '100%'
  return {
    ...props.styles,
    width: props.width,
    height: heightValue
  }
})

/* methods */
function close() {
  if (props.maskClosable && mask.value) {
    visible.value = false
  }
}
</script>


<style scoped>
/* 样式你可以直接复用原来的 */
@import "@dpzvc3/styles/dist/base/reset.css";
@import "@dpzvc3/styles/dist/utils/nowrap.css";
@import "@dpzvc3/styles/dist/utils/1px.css";
@import "@dpzvc3/styles/dist/utils/animation.css";
@import "@dpzvc3/styles/dist/components/popup.css";
</style>