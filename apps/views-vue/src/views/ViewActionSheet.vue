<template>
  <div class="ActionSheet">
    <DpButton width="50%" @click="visible = true" />
    <ActionSheet v-model="visible" :items="actionSheet" />
  </div>
</template>

<script lang="ts" setup>
import type { ActionSheetProps } from "@dpzvc3/vue";
    // 响应式状态
const visible = ref<ActionSheetProps["modelValue"]>(false);
const actionSheet = ref<ActionSheetProps["items"]>([
{
  text: "提交",
  onClick: (e) => {
    console.log(e, "点击了提交");
  },
  },
  { text: "确定" },
]);
</script>

<style lang="less" scoped>
.ActionSheet {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
</style>
