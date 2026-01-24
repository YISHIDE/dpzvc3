<template>
  <view class="Popup">
    <uni-button width="50%" @click="showPop('top')">Top</uni-button>
    <uni-button width="50%" @click="showPop('right')">Right</uni-button>
    <uni-button width="50%" @click="showPop('bottom')">Bottom</uni-button>
    <uni-button width="50%" @click="showPop('left')">Left</uni-button>

    <uni-popup
      v-model="show"
      :position="side"
      :width="width"
      :height="height"
      :show-mask="true"
    />
  </view>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue'
// import type { PopupProps } from './uni_modules/dpzvc3-ui/components/uni-popup/types.ts'
import type { CSSProperties } from "vue";
interface PopupProps {
  modelValue?: boolean;
  position?: "top" | "bottom" | "right" | "left";
  showMask?: boolean;
  maskClosable?: boolean;
  width?: number | string;
  height?: number | string;
  styles?: CSSProperties;
}
type Side = 'top' | 'right' | 'bottom' | 'left'

defineOptions({
  name: 'ViewPopup'
})

/* state */
const side = ref<PopupProps['position']>('top')
const show = ref<PopupProps['modelValue']>(false)
const width = ref<PopupProps['width']>('100%')
const height = ref<PopupProps['height']>('100%')

const sideList: Side[] = ['top', 'right', 'bottom', 'left']

/* methods */
function showPop(s: Side) {
    // console.log(111);
  show.value = false

  nextTick(() => {
    if (!sideList.includes(s)) s = 'top'

    switch (s) {
      case 'top':
        width.value = '100%'
        height.value = '70%'
        break
      case 'right':
        width.value = '70%'
        height.value = '100%'
        break
      case 'bottom':
        width.value = '100%'
        height.value = '70%'
        break
      case 'left':
        width.value = '70%'
        height.value = '100%'
        break
    }

    side.value = s

    // 等上一次动画结束再显示
    setTimeout(() => {
      show.value = true
    }, 350)
  })
}
</script>

<style scoped>
.Popup {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
</style>