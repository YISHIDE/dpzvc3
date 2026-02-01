<!-- <script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <HelloWorld msg="Vite + Vue" />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style> -->
<template>
  <transition :name="direction">
    <router-view class="page" />
  </transition>
</template>

<script lang="ts" setup>
// import { ref, watch } from "vue";
// import { useRoute } from "vue-router";

// 当前动画方向
const direction = ref("dpzvc3-ani-fade");

// 获取路由实例
const route = useRoute();

// 监听路由变化
watch(
  () => route.fullPath, // 监听路由全路径变化
  (toPath, fromPath) => {
    const toDepth = toPath.split("/").length;
    const fromDepth = fromPath.split("/").length;
    // console.log("toDepth:", toDepth, "fromDepth:", fromDepth);
    if (toDepth === fromDepth) {
      direction.value = "dpzvc3-ani-fade";
    } else if (toDepth > fromDepth) {
      direction.value = "dpzvc3-ani-left";
    } else {
      direction.value = "dpzvc3-ani-right";
    }
  }
);
</script>
<style lang="less" scoped>
// @import '../styles/common.css';

// @import '../../src/styles/index';
//  @import '../styles/index.less';
//  @import "@dpzvc3/vue/dist/styles/dpzvc3.css";
// @import "@dpzvc3/styles";  // 总的引入
// @import "@dpzvc3/styles/dist/components/cell.css"; 按需引入

.page {
  position: relative;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

html,
body {
  height: 100%;
}

#app {
  height: 100%;
}
</style>
