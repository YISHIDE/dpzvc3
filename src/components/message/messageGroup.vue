<template>
  <div
    class="dpzvc3-message-group"
    :style="styles"
  >
    <Message
      v-for="message in messages"
      :key="message.name"
      :name="message.name"
      :text="message.text"
      :duration="message.duration"
      :show-left="message.showLeft"
      :right-hide="message.rightHide"
      :type="message.type"
      :position="message.position"
      :on-close="message.onClose"
    />
  </div>
</template>

<script>
import { defineComponent, ref, provide } from 'vue'
import Message from './message.vue'

export default defineComponent({
  name: 'MessageGroup',
  components: {
    Message
  },
  props: {
    styles: {
      type: Object,
      default: () => ({})
    }
  },

  setup () {
    const messages = ref([])

    /** 添加 message */
    const add = (props = {}) => {
      const message = Object.assign(
        {
          name: '',
          text: '',
          duration: 1.5,
          showLeft: false,
          rightHide: true,
          type: 'normal',
          position: 'top',
          onClose: () => {}
        },
        props
      )

      messages.value.push(message)
    }

    /** 移除 message（供 message.vue 注入使用） */
    const remove = (name) => {
      messages.value = messages.value.filter(
        item => item.name !== name
      )
    }

    /** 关闭所有 */
    const closeAll = () => {
      messages.value = []
    }

    /** 🔑 向子组件注入 remove 方法 */
    provide('removeMessage', remove)

    return {
      messages,
      add,
      remove,
      closeAll
    }
  }
})
</script>
