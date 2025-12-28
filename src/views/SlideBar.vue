<template>
  <div class="SlideBar">
    <Slide-bar
      :list="items"
      :flex="false"
      :index="index"
      :can-drag="false"
      height="100%"
      scroll-height="50px"
      :is-fixed-header="true"
    >
      <!-- 具名插槽语法 Vue3 -->
      <template #slot-item-0>
        <div style="height:100%; flex: 1; background:red; overflow: scroll;">
          <div style="height: 40px; width: 100%; background-color: blue;" />
          <div style="height: 40px; width: 100%; background-color: blue;" />
          <div style="height: 40px; width: 100%; background-color: blue;" />
          <div style="height: 40px; width: 100%; background-color: blue;" />
          <div style="height: 40px; width: 100%; background-color: blue;" />
        </div>
      </template>

      <template #slot-item-1>
        <div style="height:200px; flex:1; background:yellow;" />
      </template>

      <template #slot-item-2>
        <div style="height:200px; flex:1; background:black;" />
      </template>
    </Slide-bar>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'ViewSlideBar',
  setup () {
    const items = ref([
      { name: '选项一' },
      { name: '选项二' },
      { name: '选项三' }
    ])
    const index = ref(1)
    return { items, index }
  }
})
</script>

<style lang="less" scoped>
.SlideBar {
  width: 100%;
}
</style>
