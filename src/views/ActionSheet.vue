<template>
  <div class="ActionSheet">
    <DpButton
      width="50%"
      @click="visible = true"
    />
    <ActionSheet
      v-model="visible"
      :items="actionSheet"
    />
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'
// import VButton from '@/components/button'
import ActionSheet from '@/components/actionSheet'
import type { ActionSheetProps } from '@/components/actionSheet/actionSheet'

export default defineComponent({
  name: 'ViewActionSheet',
  components: { ActionSheet },
  setup () {
    // 响应式状态
    const visible = ref(false)
    const actionSheet = ref<ActionSheetProps['items']>([
      { text: '提交', onClick: (e) => { console.log(e, '点击了提交') } },
      { text: '保存', onClick: (e) => { console.log(e, '点击了保存') } },
      { text: '确定' }
    ])

    return {
      visible,
      actionSheet
    }
  }
})
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
