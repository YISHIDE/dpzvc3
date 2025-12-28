<template>
  <div class="Prompt">
    <VButton
      width="50%"
      @click="showPrompt"
    >
      弹出Prompt
    </VButton>
  </div>
</template>

<script>
import { defineComponent, getCurrentInstance } from 'vue'

export default defineComponent({
  name: 'ViewPrompt',
  setup () {
    // 获取当前组件实例
    const { proxy } = getCurrentInstance()

    function showPrompt () {
      proxy.$Prompt.info({
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
