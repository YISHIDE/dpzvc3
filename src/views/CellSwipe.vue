<template>
  <div class="CellSwipe">
    <CellSwipe
      :right="right"
      title="向左滑"
      has-mask
    />
    <CellSwipe
      :left="left"
      title="向右滑"
      has-mask
    />
    <template v-if="show">
      <CellSwipe
        :left="left"
        :right="right"
        title="删除测试"
        has-mask
      />
    </template>
  </div>
</template>

<script setup>
import { reactive, ref, getCurrentInstance } from 'vue'
import CellSwipe from '../components/cell-swipe'

const show = ref(true)
const { proxy } = getCurrentInstance() // 用于访问全局 Modal

const left = reactive([
  {
    content: '确定',
    style: { backgroundColor: '#eee', color: '#fff' },
    handleClick: () => {
      proxy.$Modal.info({ body: '点击了确定' })
    }
  },
  {
    content: '删除',
    style: { backgroundColor: 'red', color: '#fff' },
    handleClick: () => {
      proxy.$Modal.info({ body: '点击了删除' })
    }
  }
])

const right = reactive([
  {
    content: '确定',
    style: { backgroundColor: '#eee', color: '#fff' },
    handleClick: () => {
      proxy.$Modal.info({ body: '点击了确定' })
    }
  },
  {
    content: '删除',
    style: { backgroundColor: 'red', color: '#fff' },
    handleClick: () => {
      proxy.$Modal.info({ body: '点击了删除' })
    }
  }
])
</script>

<style scoped>
/* 可自行添加样式 */
</style>
