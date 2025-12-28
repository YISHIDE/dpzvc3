<template>
  <div class="SwitchBar">
    <SwitchBar
      v-model="checkLarge"
      size="large"
    />
    <span>large</span>
    <SwitchBar
      v-model="checkSmall"
      size="small"
    />
    <span>small</span>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'ViewSwitchBar',
  setup () {
    const checkLarge = ref(false)
    const checkSmall = ref(false)

    return {
      checkLarge,
      checkSmall
    }
  }
})
</script>

<style lang="less" scoped>
.SwitchBar {
  padding-top: 100px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 100%;

  span {
    font-weight: bold;
    font-size: 14px;
    // align-self: flex-start;
  }
}
</style>
