<template>
  <div class="ToTop">
    <ToTop :bottom="bottom" :right="50" :duration="500" />
  </div>
</template>

<script lang="ts" setup>
import type { ToTopProps } from '@dpzvc3/vue/es/to-top';
const bottom = ref<ToTopProps['bottom']>(100);
</script>

<style lang="less" scoped>
.ToTop {
  height: 200%;
}
</style>
