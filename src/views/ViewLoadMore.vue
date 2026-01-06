<template>
  <div class="LoadMore">
    <DpLoadMore
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
    </DpLoadMore>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import DpLoadMore from '../components/loadMore'
import type { LoadmoreProps, LoadmoreEmits } from '../components/loadMore/types'
export default defineComponent({
  name: 'ViewLoadMore',
  components: { DpLoadMore },
  setup () {
    const moreRef = ref(null)
    const hasMore = ref<LoadmoreProps['hasMore']>(true)
    const loadmore = ref(Array(16).fill('LoadMore'))

    const topMethod = () => {
      hasMore.value = true

      setTimeout(() => {
        // console.log(moreRef.value, '----moreRef----')
        if (moreRef.value && (moreRef.value as any).onLoadOff) {
          (moreRef.value as any).onLoadOff()
        }
      }, 2000)
    }

    const bottomMethod = () => {
      setTimeout(() => {
        if (moreRef.value && (moreRef.value as any).onLoadOff) {
          (moreRef.value as any).onLoadOff()
        }
        loadmore.value.push(...['LoadMore', 'LoadMore'])
      }, 2000)
    }

    const getStatus: LoadmoreEmits['on-change-up-status'] = (val) => {
      console.log(val, '----val----')
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
