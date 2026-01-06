<template>
  <div class="Progress">
    <DpProgress
      v-model="progress"
      :bar-height="barHeight"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onBeforeUnmount } from 'vue'
// import DpProgress from '../components/progress'
import type { ProgressProps } from '../components/progress'
export default defineComponent({
  name: 'ViewDpProgress',
  // components: { DpProgress },
  setup () {
    const progress = ref<ProgressProps['modelValue']>('0')
    const barHeight = ref(5)
    let timer:any = null

    onMounted(() => {
      timer = setInterval(() => {
        progress.value = Number(progress.value) + 1
        if (progress.value >= 100) {
          clearInterval(timer)
          timer = null
        }
      }, 100)
    })

    onBeforeUnmount(() => {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      timer && clearInterval(timer)
    })

    return {
      progress,
      barHeight
    }
  }
})
</script>

<style lang="less" scoped>
.Progress {
  padding-top: 50px;
}
</style>
