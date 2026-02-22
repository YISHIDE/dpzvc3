<template>
  <div class="Tab">
    <Tab :items="items" :index="index" :border="hasBorder" :styles="styles" />
  </div>
</template>

<script lang="ts" setup>
import type { TabProps } from '@dpzvc3/vue/es/tab';
const items = ref<TabProps['items']>([
  {
    path: '/guide',
    name: '首页',
    iconCur: '<span class="iconfont icon-shangcheng"></span>',
    icon: '<span class="iconfont icon-shangcheng"></span>',
  },
  {
    path: '/guide',
    name: '首页',
    iconCur: '<span class="iconfont icon-shangcheng"></span>',
    icon: '<span class="iconfont icon-shangcheng"></span>',
  },
]);

const index = ref<TabProps['index']>(0);
const hasBorder = ref<TabProps['border']>(true);
const styles = ref<TabProps['styles']>({
  bottom: 0,
});
</script>

<style scoped>
.Tab {
  height: 100%;
}
</style>
