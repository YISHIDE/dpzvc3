<template>
  <view class="uni-button" @tap="handleClick">{{ text }}</view>
</template>

<script lang="ts" setup>
defineOptions({
  name: 'UniButton'
});
import { defineProps, defineEmits } from 'vue'

const props = defineProps<{ text: string }>()
const emit = defineEmits<{ (e: 'click'): void }>()

const handleClick = () => {
  emit('click')
  // 小程序端 uni API
  // #ifdef MP-WEIXIN
  uni.showToast({ title: '点击了按钮2222222' })
  // #endif

  // H5 端 console
  // #ifdef H5
  console.log('H5 点击按钮')
  // #endif
}
</script>

<style scoped>
.uni-button {
  padding: 10rpx 20rpx;
  background-color: #007aff;
  color: #fff;
  text-align: center;
  border-radius: 8rpx;
}
</style>