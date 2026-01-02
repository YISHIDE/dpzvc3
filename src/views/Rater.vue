<template>
  <div class="Rater">
    <p>可点击评分</p>
    <Rater
      v-model="rate"
      max="a"
    />
    <span>{{ rate }}</span>

    <p>不可点击评分</p>
    <Rater
      v-model="disabledRate"
      :disabled="true"
    />
    <span>{{ disabledRate }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import Rater from '../components/rater/rater'
export default defineComponent({
  name: 'ViewRater',
  components: { Rater },
  setup () {
    const rate = ref(0)
    const disabledRate = ref(4.5)

    return {
      rate,
      disabledRate
    }
  }
})
</script>

<style lang="less" scoped>
.Rater {
  width: 100%;
  padding-top: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  p {
    text-indent: 10px;
    font-weight: bold;
    font-size: 14px;
    margin: 10px 0;
  }
}
</style>
