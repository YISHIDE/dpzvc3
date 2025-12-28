<template>
  <div class="CheckBox">
    <p>checkbox 组合</p>
    <div class="item">
      <CheckBoxGroup v-model="data">
        <CheckBox label="中国" />
        <CheckBox label="美国" />
        <CheckBox label="日本" />
      </CheckBoxGroup>
    </div>

    <div class="item">
      value: {{ data }}
    </div>

    <p>单个 checkbox</p>
    <div class="item">
      <CheckBox
        v-model="checked"
        label="苹果"
        @onChange="change"
      />
    </div>

    <div class="item">
      checked: {{ checked }}
    </div>

    <p>禁用的 checkbox</p>
    <div class="item">
      <CheckBox
        label="玩具"
        disable
      />
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'ViewCheckBox',

  setup () {
    const data = ref(['中国'])
    const checked = ref(false)
    const change = (e) => {
      console.log(e, 'e')
    }
    return {
      data,
      change,
      checked
    }
  }
})
</script>

<style lang="less" scoped>
.CheckBox {
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
