<template>
  <transition :name="direction">
    <router-view class="page" />
  </transition>
</template>
<script>
export default {
  data () {
    return {
      direction: 'dpzvc3-ani-fade'
    }
  },
  watch: {
    $route (to, from) {
      const toDepth = to.path.split('/').length
      const fromDepth = from.path.split('/').length

      if (toDepth === fromDepth) {
        this.direction = 'dpzvc3-ani-fade'
      } else if (toDepth > fromDepth) {
        this.direction = 'dpzvc3-ani-left'
      } else {
        this.direction = 'dpzvc3-ani-right'
      }
    }
  },
  mounted () {

  },
  beforeUnmount () {

  },
  methods: {

  }
}
</script>
<style lang="less">
    // @import '../styles/common.css';

    // @import '../../src/styles/index';
     @import '../styles/index.less';

    .page{
        position: relative;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    }

    html,body {
        height: 100%;
    }

    #app {
        height: 100%;
    }
</style>
