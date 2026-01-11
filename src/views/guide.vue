<template>
  <div class="guide">
    <Cell
      v-for="(v, index) in componentList"
      :key="index"
      :title="v.title"
      :label="v.label"
      :link="v.link"
      has-mask
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
export default defineComponent({
  name: "ViewGuide",
  setup() {
    const router = useRouter();
    const componentList = ref([
      {
        title: "ActionSheet",
        label: "dpzvc3-ui库操作列表",
        link: "/ActionSheet",
      },
      {
        title: "Badge",
        label: "dpzvc3-ui消息气泡",
        link: "/Badge",
      },
      {
        title: "Button",
        label: "dpzvc3-ui按钮",
        link: "/Button",
      },
      {
        title: "Card",
        label: "dpzvc3-ui卡片",
        link: "/Card",
      },
      {
        title: "Cell",
        label: "dpzvc3-ui单元格",
        link: "/Cell",
      },
      {
        title: "CellSwipe",
        label: "dpzvc3-ui滑动单元格",
        link: "/CellSwipe",
      },
      {
        title: "CheckBox",
        label: "dpzvc3-ui多选",
        link: "/CheckBox",
      },
      {
        title: "Header",
        label: "dpzvc3-ui导航栏",
        link: "/Header",
      },
      {
        title: "Indicator",
        label: "dpzvc3-ui加载框",
        link: "/Indicator",
      },
      {
        title: "LoadMore",
        label: "dpzvc3-ui上拉加载/下拉刷新",
        link: "/LoadMore",
      },
      {
        title: "Message",
        label: "dpzvc3-ui消息弹出框",
        link: "/Message",
      },
      {
        title: "Modal",
        label: "dpzvc3-ui弹窗",
        link: "/Modal",
      },
      {
        title: "Picker",
        label: "dpzvc3-ui选择器",
        link: "/Picker",
      },
      {
        title: "Popup",
        label: "dpzvc3-ui拉起列表",
        link: "/Popup",
      },
      {
        title: "Progress",
        label: "dpzvc3-ui进度条",
        link: "/Progress",
      },
      {
        title: "Prompt",
        label: "dpzvc3-ui交互式弹窗",
        link: "/Prompt",
      },
      {
        title: "RadioBox",
        label: "dpzvc3-ui单选按钮",
        link: "/RadioBox",
      },
      {
        title: "Rater",
        label: "dpzvc3-ui评分",
        link: "/Rater",
      },
      {
        title: "SlideBar",
        label: "dpzvc3-ui选项卡",
        link: "/SlideBar",
      },
      {
        title: "Spinner",
        label: "dpzvc3-ui加载动画",
        link: "/Spinner",
      },
      {
        title: "Swipe",
        label: "dpzvc3-ui轮播",
        link: "/Swipe",
      },
      {
        title: "SwitchBar",
        label: "dpzvc3-ui开关",
        link: "/SwitchBar",
      },
      {
        title: "Tab",
        label: "dpzvc3-ui菜单栏",
        link: "/Tab",
      },
      {
        title: "Text",
        label: "dpzvc3-ui输入框",
        link: "/Text",
      },
      {
        title: "ToTop",
        label: "dpzvc3-ui回到顶部",
        link: "/ToTop",
      },
      {
        title: "Upload",
        label: "dpzvc3-ui图片上传",
        link: "/Upload",
      },
    ]);
    const jump = (path: string) => {
      router.push(path);
    };
    return {
      componentList,
      jump,
    };
  },
  // methods: {
  //   jump () {
  //     this.$router.push('/Button')
  //   }
  // }
});
</script>

<style lang="less" scoped>
.guide {
  width: 100%;
  position: relative;
}
</style>
