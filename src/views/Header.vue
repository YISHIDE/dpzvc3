<template>
  <div class="Header">
    <!-- 默认 Header -->
    <div class="item">
      <DpHeader
        title="Header"
        :fixed="fixed"
      />
    </div>

    <!-- Header 右侧自定义 -->
    <div class="item">
      <DpHeader
        title="Header"
        :fixed="fixed"
      >
        <template #right>
          <span @click="share">分享</span>
        </template>
      </DpHeader>
    </div>

    <!-- Header 左右自定义 -->
    <div class="item">
      <DpHeader
        title="Header"
        :fixed="fixed"
      >
        <template #left>
          <span>返回</span>
        </template>
        <template #right>
          <span @click="share">分享</span>
        </template>
      </DpHeader>
    </div>
  </div>
</template>

<script>
import { ref, getCurrentInstance } from 'vue'

export default {
  name: 'ViewHeader',
  setup () {
    const { proxy } = getCurrentInstance()
    const fixed = ref(false)

    const share = () => {
      // 假设 $Modal 已经在全局挂载
      if (proxy) {
        proxy.$Modal.confirm({
          showHead: false,
          body: '点击了分享'
        })
      }
    }

    return { fixed, share }
  }
}
</script>

<style scoped>
.item {
  position: relative;
  margin-bottom: 20px;
  height: 50px;
}
</style>
