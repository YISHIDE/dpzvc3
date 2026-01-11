<template>
  <div class="Message">
    <DpButton width="50%" @click="showMessageTop"> Top </DpButton>
    <DpButton width="50%" @click="showMessage"> Center </DpButton>
    <DpButton width="50%" @click="showMessageBottom"> Bottom </DpButton>
  </div>
</template>

<script lang="ts">
import { getCurrentInstance, defineComponent } from "vue";

export default defineComponent({
  name: "ViewMessage",
  setup() {
    // 获取全局实例
    const { proxy } = getCurrentInstance()!;
    const showMessage = () => {
      proxy!.$Message.show({ text: "显示消息" });
    };

    const showMessageTop = () => {
      proxy!.$Message.show({ text: "显示消息", position: "top" });
    };

    const showMessageBottom = () => {
      proxy!.$Message.show({ text: "显示消息", position: "bottom" });
    };

    return {
      showMessage,
      showMessageTop,
      showMessageBottom,
    };
  },
});
</script>

<style scoped>
.Message {
  height: 100%;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  align-items: center;
}
</style>
