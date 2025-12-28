<template>
  <div class="swipe">
    <Swipe
      :multiple="false"
      :list="files"
    >
      <template #default="props">
        <div>
          <img
            :src="props.item.image"
            :alt="props.item.name"
          >
        </div>
      </template>
    </Swipe>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'ViewSwipe',
  setup () {
    const files = ref([
      {
        id: 521,
        ad_id: 10,
        name: '玩转大数据分析！Spark2.X+Python 精华实战课程',
        image: 'https://o74ly5e8r.qnssl.com/9MhSVW1gJD.png',
        link: 'https://edu.hellobi.com/course/222'
      },
      {
        id: 506,
        ad_id: 10,
        name: '数据分析报告制作秘籍升级版',
        image: 'https://o74ly5e8r.qnssl.com/EAbxDnBMcX.png',
        link: 'https://edu.hellobi.com/course/132'
      },
      {
        id: 504,
        ad_id: 10,
        name: '独一无二的数据仓库建模指引系列教程升级版（连载中）',
        image: 'https://o74ly5e8r.qnssl.com/dmJqsjtLNS.png',
        link: 'https://edu.hellobi.com/course/102'
      }
    ])

    return { files }
  }
})
</script>

<style lang="less" scoped>
.swipe {
  padding-top: 100px;
  width: 100%;
}
</style>
