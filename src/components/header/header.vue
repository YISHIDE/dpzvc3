<template>
  <div
    v-if="visible"
    :class="classes"
  >
    <header>
      <div
        class="left"
        @click="back"
      >
        <slot name="left">
          <span class="arrow" />
          <span class="text">返回</span>
        </slot>
      </div>

      <div class="title dpzvc3-nowrap">
        {{ title }}
      </div>

      <div class="right">
        <slot name="right">
          <div />
        </slot>
      </div>
    </header>

    <div
      v-if="fixed"
      class="header-place"
    />
  </div>
</template>

<script>
import { defineComponent, ref, computed, onMounted, watch } from 'vue'
// import { useRouter } from 'vue-router'

const prefixCls = 'dpzvc3-header'

export default defineComponent({
  name: 'Dpzvc3Header',

  props: {
    modelValue: {
      type: Boolean,
      default: true
    },
    fixed: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: ''
    },
    wechat: {
      type: Boolean,
      default: false
    }
  },

  emits: ['update:modelValue'],

  setup (props, { emit }) {
    // const router = useRouter()

    const visible = ref(props.modelValue)
    const isWechat = ref(props.wechat)

    /** classes */
    const classes = computed(() => [
      prefixCls,
      {
        [`${prefixCls}-fixed`]: props.fixed
      }
    ])

    /** UA 判断 */
    const isWeixin = computed(() =>
      /micromessenger/i.test(window.navigator.userAgent)
    )

    const isPcWeixin = computed(() =>
      /windowswechat/i.test(window.navigator.userAgent)
    )

    /** 同步 v-model */
    watch(
      () => props.modelValue,
      val => {
        visible.value = val
      }
    )

    // watch(visible, val => {
    //   emit('update:modelValue', val)
    // })

    watch(
      () => props.wechat,
      val => {
        isWechat.value = val
      }
    )

    /** mounted 逻辑 */
    onMounted(() => {
      if ((isWeixin.value || isPcWeixin.value) && !isWechat.value) {
        // visible.value = false
        emit('update:modelValue', false)
      }
    })

    /** 返回 */
    const back = () => {
      // if (router) {
      //   router.back()
      // } else {
      window.history.back()
      // }
    }

    return {
      visible,
      classes,
      back
    }
  }
})
</script>
