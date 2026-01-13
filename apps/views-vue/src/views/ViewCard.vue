<template>
  <div class="CardDemo">
    <!-- 基础卡片 -->
    <Card width="80%">
      <template #header>
        <h3 class="item">卡片头部</h3>
      </template>
      <template #default>
        <p class="item-main">这里是卡片内容</p>
      </template>
      <template #footer>
        <span class="item">
          <button @click="onClick">操作按钮</button>
        </span>
      </template>
    </Card>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
// import Card from '../components/card'

export default {
  name: "ViewCard",
  // components: { Card },
  setup() {
    const count = ref(0);

    const onClick = () => {
      count.value += 1;
      console.log("点击了第一张卡片按钮", count.value);
    };

    const onClick2 = () => {
      count.value += 2;
      console.log("点击了第二张卡片按钮", count.value);
    };

    return {
      count,
      onClick,
      onClick2,
    };
  },
};
</script>

<style lang="less" scoped>
.CardDemo {
  background: #4d4d4d;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  .item {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .item-main {
    width: 100%;
    height: 200px;

    display: flex;
    align-items: center;
    justify-content: center;
  }
  button {
    padding: 4px 12px;
    background-color: #409eff;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
}
</style>
