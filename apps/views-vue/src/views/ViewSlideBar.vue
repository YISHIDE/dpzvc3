<template>
  <div class="SlideBar">
    <Slide-bar
      :list="items"
      :flex="false"
      :index="index"
      height="100%"
      scroll-height="50px"
      :is-fixed-header="true"
      @on-change="changeIndex"
    >
      <!-- 具名插槽语法 Vue3 -->
      <template #slot-item-0>
        <div style="height: 100%; flex: 1; background: red; overflow: scroll">
          <div style="height: 40px; width: 100%; background-color: blue" />
          <div style="height: 40px; width: 100%; background-color: blue" />
          <div style="height: 40px; width: 100%; background-color: blue" />
          <div style="height: 40px; width: 100%; background-color: blue" />
          <div style="height: 40px; width: 100%; background-color: blue" />
        </div>
      </template>

      <template #slot-item-1>
        <div style="height: 200px; flex: 1; background: yellow" />
      </template>

      <template #slot-item-2>
        <div style="height: 200px; flex: 1; background: black" />
      </template>
    </Slide-bar>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import type { SlideBarProps } from "@/components/slideBar/types";
// import SlideBar from '@/components/slideBar'
export default defineComponent({
  name: "ViewSlideBar",
  components: {
    // SlideBar
  },
  setup() {
    const items = ref<SlideBarProps["list"]>([
      { name: "选项一" },
      { name: "选项二" },
      { name: "选项三" },
    ]);
    const index = ref<SlideBarProps["index"]>(1);
    const changeIndex = (index: number) => {
      console.log(index);
    };
    return { items, index, changeIndex };
  },
});
</script>

<style lang="less" scoped>
.SlideBar {
  width: 100%;
}
</style>
