<template>
  <div class="Progress">
    <DpProgress
      v-model="progress"
      :bar-height="barHeight"
    />
  </div>
</template>

<script>
import { defineComponent, ref, onMounted, onBeforeUnmount } from 'vue'

export default defineComponent({
  name: 'ViewDpProgress',

  setup () {
    const progress = ref(0)
    const barHeight = ref(5)
    let timer = null

    onMounted(() => {
      timer = setInterval(() => {
        progress.value += 1
        if (progress.value >= 100) {
          clearInterval(timer)
          timer = null
        }
      }, 100)
    })

    onBeforeUnmount(() => {
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
