<template>
  <div class="Button">
    <DpButton type="primary">
      Primary
    </DpButton>
    <DpButton
      type="success"
      :loading="loading"
      @click="onClick"
    >
      Success
    </DpButton>
    <DpButton
      type="warning"
      :loading="loading"
      @click="onClick"
    >
      Warning
    </DpButton>
    <DpButton type="danger">
      Danger
    </DpButton>
    <DpButton type="normal">
      Normal
    </DpButton>
    <DpButton
      type="normal"
      disabled
    >
      Disabled
    </DpButton>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue'
// import DpButton from '../components/button'
import type { ButtonProps, ButtonEmits } from '../components/button/types'
export default {
  name: 'ViewButton',
  components: {
    // DpButton
  },
  setup () {
    const loading = ref<ButtonProps['loading']>(false)

    const onClick: ButtonEmits['click'] = (e) => {
      // console.trace('onClick triggered')
      loading.value = !loading.value
      // alert(loading.value)
    }

    return {
      loading,
      onClick
    }
  }
}
</script>

<style lang="less" scoped>
.Button {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
}
</style>
