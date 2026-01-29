<template>
  <div class="SwitchBar">
    <SwitchBar v-model="checkLarge" size="large" />
    <span>large</span>
    <SwitchBar v-model="checkSmall" size="small" />
    <span>small</span>
  </div>
</template>

<script lang="ts" setup>
  import type { SwitchBarProps } from "@dpzvc3/vue";
  const checkLarge = ref<SwitchBarProps["modelValue"]>(false);
  const checkSmall = ref<SwitchBarProps["modelValue"]>(false);
</script>

<style lang="less" scoped>
.SwitchBar {
  padding-top: 100px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 100%;

  span {
    font-weight: bold;
    font-size: 14px;
    // align-self: flex-start;
  }
}
</style>
