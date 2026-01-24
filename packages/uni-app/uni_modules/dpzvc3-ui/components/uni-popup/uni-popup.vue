<template>
  <view :class="classes">
    <!-- 遮罩层 -->
    <view
      v-if="mask && render"
      :class="`${prefixCls}-mask`"
      :animation="maskAnimation"
      @click="close"
      @touchmove.stop.prevent
    />

    <!-- 弹窗内容 -->
    <view
      v-if="render"
      :class="popupClasses"
      :style="contentStyle"
      :animation="popupAnimation"
    >
      <slot />
    </view>
  </view>
</template>
<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue'
import type { CSSProperties, PropType } from 'vue'
import type { PopupProps, PopupEmits, PopupClassNameArray } from './types'

defineOptions({
  name: 'UniPopup'
})
const { windowWidth, windowHeight } = uni.getSystemInfoSync()
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
const render = ref(false)
const mask = ref(props.showMask)

const maskAnimation = ref<any>(null)
const popupAnimation = ref<any>(null)

let maskAni: UniApp.Animation | null = null
let popupAni: UniApp.Animation | null = null

const DURATION = 300

/* watch props */
watch(
  () => props.showMask,
  val => (mask.value = val)
)

/* init animation */
function initAnimation() {
    if (maskAni && popupAni) { 
        // setPopupLeave(true)
        return
    } 

  maskAni = uni.createAnimation({
    duration: DURATION,
    timingFunction: 'ease'
  })

  popupAni = uni.createAnimation({
    duration: DURATION,
    timingFunction: 'ease',
    // delay: 300
  })

  // 初始状态（防止首次闪）
//   maskAni.opacity(0).step({ duration: 0 })
//   popupAni.opacity(0)

//   setPopupLeave(true)

  maskAnimation.value = maskAni.export()
  popupAnimation.value = popupAni.export()
}

/* popup animation */
function setPopupEnter() {
  if (!popupAni) return

  popupAni.opacity(1)

  switch (props.position) {
    case 'top':
    case 'bottom':
      popupAni.translateY(0)
      break
    case 'left':
    case 'right':
      popupAni.translateX(0)
      break
  }

  popupAni.step()
}

function setPopupLeave(immediate = false) {
  if (!popupAni) return

  popupAni.opacity(0)
//   console.log(props.position, 'props.position')
  switch (props.position) {
    case 'bottom':
      popupAni.translateY(windowHeight)
      popupAni.translateX(0)
      break
    case 'top':
      popupAni.translateY(-windowHeight)
      popupAni.translateX(0)
      break
    case 'left':
      popupAni.translateX(-windowWidth)
      popupAni.translateY(0)
      break
    case 'right':
      popupAni.translateX(windowWidth)
      popupAni.translateY(0)
      break
  }

  popupAni.step({ duration: immediate ? 0 : DURATION })
}

/* mask animation */
function setMaskEnter() {
  maskAni?.opacity(1).step()
}

function setMaskLeave() {
  maskAni?.opacity(0).step()
}

/* modelValue lifecycle */
watch(
  () => props.modelValue,
  async val => {
    initAnimation()

    if (val) {
      // open
      render.value = true
      await nextTick()
      setPopupLeave(true)
      popupAnimation.value = popupAni!.export()

      maskAni?.opacity(0).step({ duration: 0 })
      maskAnimation.value = maskAni!.export()
      
     setTimeout(() => {
        // 防止动画和渲染冲突
         setMaskEnter()
         setPopupEnter()
         maskAnimation.value = maskAni!.export()
         popupAnimation.value = popupAni!.export()
      }, DURATION)
    } else {
      // close
      setMaskLeave()
      setPopupLeave()

      maskAnimation.value = maskAni!.export()
      popupAnimation.value = popupAni!.export()

      setTimeout(() => {
        render.value = false
      }, DURATION)
    }
  },
  { immediate: true }
)

/* computed */
const classes = computed<PopupClassNameArray>(() => [prefixCls])

const popupClasses = computed<PopupClassNameArray>(() => [
  `${prefixCls}-content`,
  `${prefixCls}-${props.position}`
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
    emit('update:modelValue', false)
  }
}
</script>
<style scoped>
@import "@dpzvc3/styles/dist/base/reset.css";
@import "@dpzvc3/styles/dist/utils/nowrap.css";
@import "@dpzvc3/styles/dist/utils/1px.css";
@import "@dpzvc3/styles/dist/components/popup.css";
</style>