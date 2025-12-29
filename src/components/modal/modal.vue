<template>
  <div>
    <!-- 遮罩层 -->
    <transition name="dpzvc3-ani-fade">
      <div
        v-if="visible"
        class="dpzvc3-modal-mask"
        @click="mask"
        @touchstart.prevent
        @touchmove.prevent
        @touchend.prevent
      />
    </transition>

    <!-- 弹窗内容 -->
    <transition name="dpzvc3-ani-scale">
      <div
        v-if="visible"
        class="dpzvc3-modal"
        :style="getWrapperStyle"
      >
        <!-- 头部 -->
        <div
          v-if="isHead"
          class="dpzvc3-modal-header"
        >
          <slot name="header">
            <div class="dpzvc3-modal-header-inner ellipse-fir">
              {{ title }}
            </div>
          </slot>
        </div>

        <!-- 内容 -->
        <div class="dpzvc3-modal-body">
          <slot name="body">
            {{ body }}
          </slot>
        </div>

        <!-- 底部 -->
        <div
          v-if="!footerHide"
          class="dpzvc3-modal-footer"
        >
          <slot name="footer">
            <VButton
              v-if="cancleText"
              type="primary"
              @click="close"
            >
              {{ cancleText }}
            </VButton>
            <VButton
              type="normal"
              :loading="buttonLoading"
              @click="ok"
            >
              {{ okText }}
            </VButton>
          </slot>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { ref, computed, watch, defineComponent } from 'vue'
import VButton from '../button'

export default defineComponent({
  name: 'Dpzvc3Modal',
  components: { VButton },
  props: {
    modelValue: { type: Boolean, default: false },
    maskClosable: { type: Boolean, default: true },
    title: String,
    width: { type: String, default: '70%' },
    okText: { type: String, default: '确定' },
    cancleText: { type: String, default: '取消' },
    loading: { type: Boolean, default: false },
    styles: Object,
    showHead: { type: Boolean, default: true },
    footerHide: { type: Boolean, default: false },
    body: String
  },
  setup (props, { emit }) {
    const visible = ref(props.modelValue)
    const isHead = ref(props.showHead)
    const buttonLoading = ref(false)

    const getWrapperStyle = computed(() => {
      return Object.assign(
        { width: props.width },
        props.styles || {}
      )
    })

    // watch props changes
    watch(() => props.modelValue, (val) => { visible.value = val })
    watch(() => props.showHead, (val) => { isHead.value = val })

    // methods
    const close = () => {
      // visible.value = false
      emit('update:modelValue', false)
      emit('on-cancle')
    }

    const mask = () => {
      if (props.maskClosable && !buttonLoading.value) {
        close()
      }
    }

    const ok = () => {
      if (props.loading) {
        buttonLoading.value = true
      } else {
        // visible.value = false
        emit('update:modelValue', false)
      }
      emit('on-ok')
    }

    return {
      visible,
      isHead,
      buttonLoading,
      getWrapperStyle,
      close,
      mask,
      ok
    }
  }
})
</script>
