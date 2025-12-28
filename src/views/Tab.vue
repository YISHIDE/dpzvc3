<template>
  <div class="Tab">
    <Tab
      :items="items"
      :index="index"
      :border="hasBorder"
      :styles="styles"
    />
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'ViewTab',
  setup () {
    const items = ref([
      {
        path: '/guide',
        name: '首页',
        iconCur: '<span class="iconfont icon-shangcheng"></span>',
        icon: '<span class="iconfont icon-shangcheng"></span>'
      },
      {
        path: '/guide',
        name: '首页',
        iconCur: '<span class="iconfont icon-shangcheng"></span>',
        icon: '<span class="iconfont icon-shangcheng"></span>'
      }
    ])

    const index = ref(0)
    const hasBorder = ref(true)
    const styles = ref({
      bottom: 0
    })

    return {
      items,
      index,
      hasBorder,
      styles
    }
  }
})
</script>

<style scoped>
.Tab {
  height: 100%;
}
</style>
