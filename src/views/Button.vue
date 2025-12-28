<template>
  <div class="Button">
    <VButton type="primary">
      Primary
    </VButton>
    <VButton
      type="success"
      :loading="loading"
      @click="onClick"
    >
      Success
    </VButton>
    <VButton
      type="warning"
      :loading="loading"
      @click="onClick"
    >
      Warning
    </VButton>
    <VButton type="danger">
      Danger
    </VButton>
    <VButton type="normal">
      Normal
    </VButton>
    <VButton
      type="normal"
      disabled
    >
      Disabled
    </VButton>
  </div>
</template>

<script>
import { ref } from 'vue'
import VButton from '../components/button'

export default {
  name: 'ViewButton',
  components: {
    VButton
  },
  setup () {
    const loading = ref(false)

    const onClick = () => {
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
