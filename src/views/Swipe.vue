<template>
  <div class="swipe">
    <Swipe
      :multiple="false"
      :list="files"
    >
      <template #default="props">
        <img
          :src="props.item.image"
          :alt="props.item.name"
        >
      </template>
    </Swipe>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
// import Swipe from '../components/swipe'
import type { SwipeProps } from '../components/swipe'
export default defineComponent({
  name: 'ViewSwipe',
  // components: { Swipe },
  setup () {
    const files = ref<SwipeProps['list']>([
      {
        id: 521,
        ad_id: 10,
        name: '玩转大数据分析！Spark2.X+Python 精华实战课程',
        image: 'https://www.189.cn/upfiles/189v2/jt/images/2024/0/ce687527-56e0-4c0f-89f7-2688a45441ea.jpg',
        link: 'https://edu.hellobi.com/course/222'
      },
      {
        id: 506,
        ad_id: 10,
        name: '数据分析报告制作秘籍升级版',
        image: 'https://www.189.cn/upfiles/189v2/jt/images/2020/9/5436bb73-fdd8-414e-9e15-32fae4996e37.jpg',
        link: 'https://edu.hellobi.com/course/132'
      },
      {
        id: 504,
        ad_id: 10,
        name: '独一无二的数据仓库建模指引系列教程升级版（连载中）',
        image: 'https://www.189.cn/upfiles/189v2/jt/images/2019/9/0223427c-7e00-4521-91f7-56dce455766b.jpg',
        link: 'https://edu.hellobi.com/course/102'
      }
    ])

    return { files }
  }
})
</script>

<style lang="less" scoped>
.swipe {
  // padding-top: 100px;
  width: 100%;
}
</style>
