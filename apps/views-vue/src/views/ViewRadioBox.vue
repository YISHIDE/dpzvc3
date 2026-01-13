<template>
  <div class="RadioBox">
    <p>Radio组合</p>
    <div class="item">
      <RadioBoxGroup v-model="radio">
        <RadioBox label="中国" />
        <RadioBox label="美国" />
        <RadioBox label="日本" />
      </RadioBoxGroup>
    </div>
    <div class="item">value: {{ radio }}</div>

    <p>单个Radio</p>
    <RadioBox v-model="checked" label="苹果" />
    <div class="item">checked: {{ checked }}</div>

    <p>禁用的Radio</p>
    <div class="item">
      <RadioBox label="玩具" :disable="true" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import type {
  RadioBoxProps,
  RadioGroupProps,
} from "../components/radioBox/types";
// import { RadioBox, RadioBoxGroup } from '../components/radioBox'
export default defineComponent({
  name: "ViewRadioBox",
  // components: { RadioBox, RadioBoxGroup },
  setup() {
    const checked = ref<RadioBoxProps["modelValue"]>(false);
    const radio = ref<RadioGroupProps["modelValue"]>("");

    return {
      checked,
      radio,
    };
  },
});
</script>

<style lang="less" scoped>
.RadioBox {
  padding-top: 100px;

  p {
    width: 100%;
    font-weight: bold;
    font-size: 16px;
    margin: 20px 0;
  }

  .item {
    width: 100%;
    display: flex;
    justify-content: center;
  }
}
</style>
