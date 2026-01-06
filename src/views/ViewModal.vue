<template>
  <div class="Modal">
    <VButton
      width="50%"
      @click="showInfo"
    >
      info
    </VButton>
    <VButton
      width="50%"
      @click="showConfirm"
    >
      confirm
    </VButton>
  </div>
</template>

<script lang="ts">
import { getCurrentInstance, defineComponent } from 'vue'
import VButton from '../components/button'

export default defineComponent({
  name: 'ViewModal',
  components: { VButton },
  setup () {
    // 获取实例，用来访问全局属性 $Modal / $Message
    const { proxy } = getCurrentInstance()!

    const showInfo = () => {
      proxy!.$Modal.info({
        body: '这是内容',
        onOk: function () {
          proxy!.$Message.show({ text: '点击了确定' })
          // console.log('点击了确定')
        },
        onCancle: function () {
          proxy!.$Message.show({ text: '点击了取消' })
          // console.log('点击了取消')
        }
      })
    }

    const showConfirm = () => {
      proxy!.$Modal.confirm({
        body: '这是内容',
        onOk: function () {
          proxy!.$Message.show({ text: '点击了确定' })
          // console.log('点击了确定')
        }
      })
    }

    return {
      showInfo,
      showConfirm
    }
  }
})
</script>

<style lang="less" scoped>
.Modal {
  height: 100%;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  align-items: center;
}
</style>
