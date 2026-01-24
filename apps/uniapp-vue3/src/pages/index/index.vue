<template>
  <scroll-view class="guide">
    <uni-cell
      v-for="(v, index) in componentList"
      :key="index"
      :title="v.title"
      :label="v.label"
      :link="v.link"
      has-mask
    />
  </scroll-view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface ComponentItem {
  title: string
  label: string
  link: string
}

const componentList = ref<ComponentItem[]>([
  {
    title: 'ActionSheet',
    label: 'dpzvc3-ui操作列表',
    link: '/pages/action-sheet/index',
  },
  {
    title: 'Badge',
    label: 'dpzvc3-ui消息气泡',
    link: '/pages/badge/index',
  },
  {
    title: 'Button',
    label: 'dpzvc3-ui按钮',
    link: '/pages/button/index',
  },
  {
    title: 'Card',
    label: 'dpzvc3-ui卡片',
    link: '/pages/card/index',
  },
  {
    title: 'Cell',
    label: 'dpzvc3-ui单元格',
    link: '/pages/cell/index',
  },
  {
    title: 'CellSwipe',
    label: 'dpzvc3-ui滑动单元格',
    link: '/pages/cell-swipe/index',
  },
  {
    title: 'CheckBox',
    label: 'dpzvc3-ui多选',
    link: '/pages/check-box/index',
  },
  {
    title: 'Header',
    label: 'dpzvc3-ui导航栏',
    link: '/pages/header/index',
  },
  {
    title: 'Indicator',
    label: 'dpzvc3-ui加载框',
    link: '/pages/indicator/index',
  },
  {
    title: 'LoadMore',
    label: 'dpzvc3-ui上拉加载/下拉刷新',
    link: '/pages/load-more/index',
  },
  {
    title: 'Message',
    label: 'dpzvc3-ui消息弹出框',
    link: '/pages/message/index',
  },
  {
    title: 'Modal',
    label: 'dpzvc3-ui弹窗',
    link: '/pages/modal/index',
  },
  {
    title: 'Picker',
    label: 'dpzvc3-ui选择器',
    link: '/pages/picker/index',
  },
  {
    title: 'Popup',
    label: 'dpzvc3-ui拉起列表',
    link: '/pages-sub/popup/index',
  },
  {
    title: 'Progress',
    label: 'dpzvc3-ui进度条',
    link: '/pages/progress/index',
  },
  {
    title: 'Prompt',
    label: 'dpzvc3-ui交互式弹窗',
    link: '/pages/prompt/index',
  },
  {
    title: 'RadioBox',
    label: 'dpzvc3-ui单选按钮',
    link: '/pages/radio-box/index',
  },
  {
    title: 'Rater',
    label: 'dpzvc3-ui评分',
    link: '/pages/rater/index',
  },
  {
    title: 'SlideBar',
    label: 'dpzvc3-ui选项卡',
    link: '/pages/slide-bar/index',
  },
  {
    title: 'Spinner',
    label: 'dpzvc3-ui加载动画',
    link: '/pages/spinner/index',
  },
  {
    title: 'Swipe',
    label: 'dpzvc3-ui轮播',
    link: '/pages/swipe/index',
  },
  {
    title: 'SwitchBar',
    label: 'dpzvc3-ui开关',
    link: '/pages/switch-bar/index',
  },
  {
    title: 'Tab',
    label: 'dpzvc3-ui菜单栏',
    link: '/pages/tab/index',
  },
  {
    title: 'Text',
    label: 'dpzvc3-ui输入框',
    link: '/pages/text/index',
  },
  {
    title: 'ToTop',
    label: 'dpzvc3-ui回到顶部',
    link: '/pages/to-top/index',
  },
  {
    title: 'Upload',
    label: 'dpzvc3-ui图片上传',
    link: '/pages/upload/index',
  },
])
</script>

<style lang="less">
.guide {
  width: 100%;
  position: relative;
}
</style>