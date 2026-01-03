<template>
  <Modal
    v-model="visible"
    :width="width"
    :title="title"
    :style="styles"
    :mask-closable="maskClosable"
  >
    <template #header>
      <div
        class="dpzvc3-modal-header-inner ellipse-fir"
        v-html="title"
      />
    </template>

    <template #body>
      <div class="dpzvc3-prompt-body-inner">
        <div class="dpzvc3-prompt-content">
          <span class="dpzvc3-prompt-spec">{{ spec }}</span>
          <TextBar
            v-model="texts"
            type="text"
            :placeholder="placeholder"
          />
          <div
            v-if="message"
            class="dpzvc3-prompt-error"
            v-html="message"
          />
        </div>
      </div>
    </template>

    <template #footer>
      <VButton
        :styles="{ background: '#ffffff', color: 'red' }"
        @click="ok"
      >
        <template #button-inner>
          {{ okText }}
        </template>
      </VButton>

      <VButton
        :styles="{ background: '#ffffff', color: '#ccc' }"
        @click="cancle"
      >
        <template #button-inner>
          {{ cancleText }}
        </template>
      </VButton>
    </template>
  </Modal>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import Modal from '../modal/modal'
import TextBar from '../Text/textBar'
import VButton from '../button/button'

export default defineComponent({
  name: 'Dpzvc3Prompt',
  components: { Modal, TextBar, VButton },
  props: {
    value: { type: Boolean, default: false },
    text: { type: String, default: '' },
    closable: { type: Boolean, default: true },
    maskClosable: { type: Boolean, default: true },
    title: String,
    width: { type: String, default: '220px' },
    okText: { type: String, default: '确定' },
    cancleText: { type: String, default: '取消' },
    loading: { type: Boolean, default: false },
    styles: Object,
    spec: { type: String, default: '提示' },
    validator: { type: [RegExp, Function], default: null },
    msg: String,
    placeholderText: String,
    onOk: { type: Function, default: () => {} },
    onCancle: { type: Function, default: () => {} }
  },
  emits: ['update:value', 'on-ok', 'on-cancle'],
  setup (props, { emit }) {
    // 子组件内部状态
    const visible = ref(props.value)
    const texts = ref(props.text)
    const message = ref(props.msg || '')
    const placeholder = ref(props.placeholderText)
    const buttonLoading = ref(false)

    // 同步父组件变化
    watch(() => props.value, val => (visible.value = val))

    watch(() => (props as any).val, val => (texts.value = val))
    watch(() => props.loading, val => (buttonLoading.value = val))

    // 点击确定
    function ok () {
      let valid = true
      if (props.validator) {
        if (props.validator instanceof RegExp) valid = props.validator.test(texts.value)
        else if (typeof props.validator === 'function') valid = props.validator(texts.value)
      }
      if (valid !== true) {
        message.value = typeof valid === 'string' ? valid : ''
        return
      }

      emit('update:value', false) // 通知父组件关闭弹窗
      props.onOk?.(texts.value)
      emit('on-ok', texts.value)
    }

    // 点击取消
    function cancle () {
      emit('update:value', false)
      props.onCancle?.()
      emit('on-cancle')
    }

    return { visible, texts, message, placeholder, buttonLoading, ok, cancle }
  }
})
</script>
