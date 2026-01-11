<template>
  <div class="CellSwipe">
    <CellSwipe :right="right" title="向左滑" has-mask />
    <CellSwipe :left="left" title="向右滑" has-mask />
    <template v-if="show">
      <CellSwipe :left="left" :right="right" title="删除测试" has-mask />
    </template>
  </div>
</template>
<!-- // .setup语法糖需要引入props类型  <script setup lang="ts">
// import type { RaterProps } from 'dpzvc3-ui'

// type Rate = RaterProps['modelValue']

// const rate = ref<Rate>(3)
// </script> -->
<script lang="ts">
import { defineComponent, reactive, ref, getCurrentInstance } from "vue";
// import CellSwipe from '../components/cellSwipe'

export default defineComponent({
  name: "ViewCellSwipe",
  setup() {
    const show = ref(true);
    const { proxy } = getCurrentInstance()!; // 用于访问全局 Modal

    const left = reactive([
      {
        content: "确定",
        style: { backgroundColor: "#eee", color: "#fff" },
        handleClick: () => {
          (proxy! as any).$Modal.info({ body: "点击了确定" });
        },
      },
      {
        content: "删除",
        style: { backgroundColor: "red", color: "#fff" },
        handleClick: () => {
          (proxy! as any).$Modal.info({ body: "点击了删除" });
        },
      },
    ]);

    const right = reactive([
      {
        content: "确定",
        style: { backgroundColor: "#eee", color: "#fff" },
        handleClick: () => {
          (proxy! as any).$Modal.info({ body: "点击了确定" });
        },
      },
      {
        content: "删除",
        style: { backgroundColor: "red", color: "#fff" },
        handleClick: () => {
          (proxy! as any).$Modal.info({ body: "点击了删除" });
        },
      },
    ]);
    return {
      left,
      right,
      show,
    };
  },
});
</script>
