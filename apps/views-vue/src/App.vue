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
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  data() {
    return {
      direction: "dpzvc3-ani-fade",
    };
  },
  watch: {
    $route(to, from) {
      const toDepth = to.path.split("/").length;
      const fromDepth = from.path.split("/").length;

      if (toDepth === fromDepth) {
        this.direction = "dpzvc3-ani-fade";
      } else if (toDepth > fromDepth) {
        this.direction = "dpzvc3-ani-left";
      } else {
        this.direction = "dpzvc3-ani-right";
      }
    },
  },
  mounted() {},
  beforeUnmount() {},
  methods: {},
});
</script>
<style lang="less">
// @import '../styles/common.css';

// @import '../../src/styles/index';
//  @import '../styles/index.less';
//  @import "@dpzvc3/vue/dist/styles/dpzvc3.css";
// @import "@dpzvc3/styles";  总的引入
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
