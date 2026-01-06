<template>
  <div class="Spinner">
    <Spinner
      :type="type"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
// import Spinner from '../components/spinner'
import type { SpinnerProps } from '../components/spinner'
export default defineComponent({
  name: 'ViewSpinner',
  // components: { Spinner },
  setup () {
    const type = ref<SpinnerProps['type']>('double-bounce')
    return {
      type
    }
  }
})
</script>

<style scoped>

</style>
