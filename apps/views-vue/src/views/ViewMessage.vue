<template>
  <div class="Message">
    <DpButton width="50%" @click="showMessageTop"> Top </DpButton>
    <DpButton width="50%" @click="showMessage"> Center </DpButton>
    <DpButton width="50%" @click="showMessageBottom"> Bottom </DpButton>
  </div>
</template>

<script lang="ts" setup>
// 获取全局实例
// const { proxy } = getCurrentInstance()!;
const showMessage = () => {
  Message.show({ text: '显示消息' });
  // proxy!.$Message.show({ text: "显示消息" });
};

const showMessageTop = () => {
  Message.show({ text: '显示消息', position: 'top' });
  // proxy!.$Message.show({ text: "显示消息", position: "top" });
};

const showMessageBottom = () => {
  Message.show({ text: '显示消息', position: 'bottom' });
  // proxy!.$Message.show({ text: "显示消息", position: "bottom" });
};
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
