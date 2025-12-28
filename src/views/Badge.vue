<template>
  <div class="Badge">
    <Badge number="10">
      <div class="item" />
    </Badge>

    <Badge
      number="100"
      :max="99"
      :dot="false"
    >
      <div class="item" />
    </Badge>

    <Badge
      number="100"
      :max="99"
      :dot="true"
    >
      <div class="item" />
    </Badge>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
// import Badge from '@/components/badge/badge.vue' // 修改为你实际路径

export default defineComponent({
  name: 'ViewBadge',
  setup () {
    // 这个组件不需要响应式数据，所以 setup 可以为空
    return {}
  }
})
</script>

<style lang="less" scoped>
.Badge {
  width: 100%;
  margin-top: 100px;
  display: flex;
  justify-content: space-around;

  .item {
    width: 45px;
    height: 45px;
    background-color: red;
  }
}
</style>
