<template>
  <view class="content">
    <image class="logo" src="/static/logo.png" />
      <!-- <UniButton text="点我" @click="onClick" /> -->
    <view class="text-area">
      <text class="title">{{ title }}</text>
    </view>
  </view>
</template>

<script setup lang="ts">
// import { UniButton } from '@dpzvc3/uni-app';
import { ref } from 'vue'
const title = ref('Hello122221')
const onClick = () => {
 uni.showToast({ title: '按钮被点击了' })
}
</script>

<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin-top: 200rpx;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50rpx;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>
