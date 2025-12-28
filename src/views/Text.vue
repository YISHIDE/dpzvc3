<template>
  <div class="Text">
    <!-- Number 示例 -->
    <div class="item">
      <p class="title">
        Number
      </p>
      <Number
        v-model="number"
        :min="min"
        :max="max"
        :step="step"
        :focus="focus"
      />
      <span class="value">value: {{ number }}</span>
    </div>

    <!-- TextBar 普通输入框 -->
    <div class="item">
      <p class="title">
        TextBar
      </p>
      <TextBar
        v-model="text"
        type="text"
      />
      <span class="value">value: {{ text }}</span>
    </div>

    <!-- TextBar 多行输入框 -->
    <div class="item">
      <p class="title">
        TextBar
      </p>
      <TextBar
        v-model="texts"
        type="textarea"
        :maxlength="9"
      />
      <span class="value">value: {{ texts }}</span>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'ViewText',
  setup () {
    const number = ref(1)
    const min = ref(1)
    const max = ref(10)
    const step = ref(2)
    const focus = ref(true)
    const text = ref('请输入')
    const texts = ref('正在输入....')

    return {
      number,
      min,
      max,
      step,
      focus,
      text,
      texts
    }
  }
})
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
