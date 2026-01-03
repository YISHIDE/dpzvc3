<template>
  <div class="Cell">
    <Cell
      title="Guide"
      label="导航"
      link="/guide"
      value="跳转到导航页"
    />
    <Cell
      title="Index"
      label="主页"
      link="/guide"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
// import Cell from '../components/cell/'
export default defineComponent({
  name: 'ViewCell'
  // components: { Cell }
})
</script>

<style  lang="less" scoped>
    .Cell {
        width: 100%;
        position: relative;
    }
</style>
