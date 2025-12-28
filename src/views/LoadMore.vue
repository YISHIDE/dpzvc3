<template>
  <div class="LoadMore">
    <LoadMore
      ref="moreRef"
      :refresh="topMethod"
      height="100%"
      :load-more="bottomMethod"
      :has-more="hasMore"
      @on-change-up-status="getStatus"
    >
      <div
        v-for="(item, index) in loadmore"
        :key="index"
        style="width: 100%; height: 50px;"
      >
        {{ item }}
      </div>
    </LoadMore>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'ViewLoadMore',
  setup () {
    const moreRef = ref(null)
    const hasMore = ref(true)
    const loadmore = ref(Array(16).fill('LoadMore'))

    const topMethod = () => {
      hasMore.value = true

      setTimeout(() => {
        if (moreRef.value && moreRef.value.onLoadOff) {
          moreRef.value.onLoadOff()
        }
      }, 2000)
    }

    const bottomMethod = () => {
      setTimeout(() => {
        if (moreRef.value && moreRef.value.onLoadOff) {
          moreRef.value.onLoadOff()
        }
        loadmore.value.push(...['LoadMore', 'LoadMore'])
      }, 2000)
    }

    const getStatus = (val) => {
      console.log(val)
    }

    return {
      moreRef,
      hasMore,
      loadmore,
      topMethod,
      bottomMethod,
      getStatus
    }
  }
})
</script>

<style lang="less" scoped>
.LoadMore {
  width: 100%;
  height: 100%;
  overflow: auto;
}
</style>
