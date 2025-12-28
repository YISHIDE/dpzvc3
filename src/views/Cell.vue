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

<script>

export default {
  name: 'ViewCell'

}
</script>

<style  lang="less" scoped>
    .Cell {
        width: 100%;
        position: relative;
    }
</style>
