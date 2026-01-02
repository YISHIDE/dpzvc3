<template>
  <div class="Popup">
    <VButton
      width="50%"
      @click="() => showPop('top')"
    >
      Top
    </VButton>
    <VButton
      width="50%"
      @click="() => showPop('right')"
    >
      Right
    </VButton>
    <VButton
      width="50%"
      @click="() => showPop('bottom')"
    >
      Bottom
    </VButton>
    <VButton
      width="50%"
      @click="() => showPop('left')"
    >
      Left
    </VButton>

    <Popup
      v-model="show"
      :position="side"
      :width="width"
      :height="height"
      :show-mask="true"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, nextTick } from 'vue'
// import type { Side } from './dist/types/components/popup/types'
type Side = 'top' | 'right' | 'bottom' | 'left'

export default defineComponent({
  name: 'ViewPopup',
  setup () {
    const side = ref<Side>('top')
    const show = ref(false)
    const width = ref('100%')
    const height = ref<string | number>('100%')
    const sideList: Side[] = ['top', 'right', 'bottom', 'left']

    const showPop = (s: Side) => {
      show.value = false
      nextTick(() => {
        if (!sideList.includes(s)) s = 'top'

        switch (s) {
        case 'top':
          width.value = '100%'
          height.value = 0
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

        setTimeout(() => {
          show.value = true
        }, 350)
      })
    }

    return {
      side,
      show,
      width,
      height,
      showPop
    }
  }
})
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
