<template>
  <div class="Indicator">
    <div class="item">
      <VButton @click="blade">
        blade
      </VButton>
    </div>
    <div class="item">
      <VButton @click="snake">
        snake
      </VButton>
    </div>
    <div class="item">
      <VButton @click="circle">
        circle
      </VButton>
    </div>
    <div class="item">
      <VButton @click="bounce">
        bounce
      </VButton>
    </div>
  </div>
</template>

<script>
import { defineComponent, getCurrentInstance } from 'vue'

export default defineComponent({
  name: 'ViewIndicator',
  setup () {
    const { proxy } = getCurrentInstance()
    const removeAfterDelay = (duration = 3000) => {
      setTimeout(() => {
        proxy.$Indicator.remove()
      }, duration)
    }

    const blade = () => {
      proxy.$Indicator.blade()
      removeAfterDelay()
    }

    const snake = () => {
      proxy.$Indicator.snake()
      removeAfterDelay()
    }

    const circle = () => {
      proxy.$Indicator.circle()
      removeAfterDelay()
    }

    const bounce = () => {
      proxy.$Indicator.bounce()
      removeAfterDelay()
    }

    return {
      blade,
      snake,
      circle,
      bounce
    }
  }
})
</script>

<style lang="less" scoped>
.Indicator {
  height: 100%;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  align-items: center;

  .item {
    margin: 0 auto;
    width: 50%;
  }
}
</style>
