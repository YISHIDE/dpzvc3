<template>
  <div class="Prompt">
    <DpButton
      width="50%"
      @click="showPrompt"
    >
      弹出Prompt
    </DpButton>
  </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance } from 'vue'

export default defineComponent({
  name: 'ViewPrompt',
  setup () {
    // 获取当前组件实例
    const { proxy } = getCurrentInstance()!

    function showPrompt () {
      (proxy as any).$Prompt.info({
        title: 'Prompt',
        spec: 'ccc',
        text: 'vvvv'
      })
    }

    return {
      showPrompt
    }
  }
})
</script>

<style lang="less" scoped>
.Prompt {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
</style>
