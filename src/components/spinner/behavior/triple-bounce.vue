<template>
  <div
    class="dpzvc3-spinner-triple-bounce"
    :style="spinnerStyle"
  >
    <div
      v-for="(i,key) in 3"
      :key="key"
      class="bounce"
      :class="'bounce-' + i"
      :style="bounceStyle"
    />
  </div>
</template>

<script type="text/ecmascript-6">
import props from '../props'

export default {
  mixins: [props],
  computed: {
    // eslint-disable-next-line vue/return-in-computed-property
    unitSize () {
      if (this.size) {
        return Math.round(this.size / 6) * 2
      }
    },
    // eslint-disable-next-line vue/return-in-computed-property
    spinnerStyle () {
      if (this.size) {
        return {
          padding: (this.size - this.unitSize) / 2 + 'px 0'
        }
      }
    },
    bounceStyle () {
      const style = {}

      if (this.size) {
        style.width = this.unitSize + 'px'
        style.height = this.unitSize + 'px'
      }

      if (this.color) {
        style.backgroundColor = this.color
      }

      return style
    }
  }
}
</script>
