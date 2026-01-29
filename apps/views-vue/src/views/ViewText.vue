<template>
  <div class="Text">
    <!-- Number 示例 -->
    <div class="item">
      <p class="title">Number</p>
      <Number v-model="number" :min="min" :max="max" :step="step" />
      <span class="value">value: {{ number }}</span>
    </div>

    <!-- TextBar 普通输入框 -->
    <div class="item">
      <p class="title">TextBar</p>
      <TextBar v-model="text" type="text" />
      <span class="value">value: {{ text }}</span>
    </div>

    <!-- TextBar 多行输入框 -->
    <div class="item">
      <p class="title">TextBar</p>
      <TextBar v-model="texts" type="textarea" :maxlength="9" />
      <span class="value">value: {{ texts }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { TextBarProps } from "@dpzvc3/vue";
import type { NumberProps } from "@dpzvc3/vue";

const number = ref<NumberProps["modelValue"]>(0);
const min = ref<NumberProps["min"]>(0);
const max = ref<NumberProps["max"]>(10);
const step = ref<NumberProps["step"]>(2);
// const focus = ref<NumberProps['focus']>(true)
const text = ref<TextBarProps["modelValue"]>("请输入");
const texts = ref<TextBarProps["modelValue"]>("正在输入....");
</script>

<style lang="less" scoped>
.Text {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  .item {
    width: 50%;

    .title {
      margin-bottom: 10px;
      font-weight: bold;
    }

    .value {
      margin-top: 10px;
    }
  }
}
</style>
