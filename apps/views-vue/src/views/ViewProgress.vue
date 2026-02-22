<template>
  <div class="Progress">
    <Progress v-model="progress" :bar-height="barHeight" />
  </div>
</template>

<script lang="ts" setup>
import type { ProgressProps } from '@dpzvc3/vue/es/progress';

const progress = ref<ProgressProps['modelValue']>('0');
const barHeight = ref(5);
let timer: any = null;

onMounted(() => {
  timer = setInterval(() => {
    progress.value = Number(progress.value) + 1;
    if (progress.value >= 100) {
      clearInterval(timer);
      timer = null;
    }
  }, 100);
});

onBeforeUnmount(() => {
  timer && clearInterval(timer);
});
</script>

<style lang="less" scoped>
.Progress {
  padding-top: 50px;
}
</style>
