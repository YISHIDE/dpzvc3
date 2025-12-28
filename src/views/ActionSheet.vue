<template>
  <div class="ActionSheet">
    <VButton
      width="50%"
      @click="visible = true"
    />
    <ActionSheet
      v-model="visible"
      :items="actionSheet"
    />
  </div>
</template>

<script>
import { ref } from 'vue'
// import VButton from '@/components/button'
// import ActionSheet from '@/components/action-sheet'

export default {
  name: 'ViewActionSheet',
  // components: { VButton, ActionSheet },
  setup () {
    // 响应式状态
    const visible = ref(false)
    const actionSheet = ref([
      { text: '提交' },
      { text: '确定' }
    ])

    return {
      visible,
      actionSheet
    }
  }
}
</script>

<style lang="less" scoped>
.ActionSheet {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
</style>
