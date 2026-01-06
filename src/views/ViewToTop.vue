<template>
  <div class="ToTop">
    <ToTop
      :bottom="bottom"
      :right="50"
      :duration="500"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
// import ToTop from '@/components/toTop'
import type { ToTopProps } from '@/components/toTop/types'
export default defineComponent({
  name: 'ViewToTop',
  components: {
    // ToTop
  },
  setup () {
    const bottom = ref<ToTopProps['bottom']>(100)
    return { bottom }
  }
})
</script>

<style  lang="less" scoped>
    .ToTop {
        height:200%;
    }
</style>
