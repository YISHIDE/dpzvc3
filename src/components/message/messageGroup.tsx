import { defineComponent, ref, provide, PropType } from 'vue'
import Message from './message'
import type { MessageProps } from './types' // 引入类型

export default defineComponent({
  name: 'MessageGroup',
  props: {
    styles: {
      type: Object as PropType<Record<string, any>>,
      default: () => ({})
    }
  },
  setup (props, { expose }) {
    const messages = ref<MessageProps[]>([])

    const add = (msgProps: Partial<MessageProps> = {}) => {
      const message: MessageProps = {
        name: '',
        text: '',
        duration: 1.5,
        showLeft: false,
        rightHide: true,
        type: 'normal',
        position: 'top',
        onClose: () => {},
        ...msgProps
      }
      // alert(1)
      messages.value.push(message)
    }

    const remove = (name: string) => {
      messages.value = messages.value.filter(item => item.name !== name)
    }

    const closeAll = () => {
      messages.value = []
    }
    provide('removeMessage', remove)
    expose({ add, closeAll, remove })
    return () => (
      <div class="dpzvc3-message-group" style={props.styles}>
        {messages.value.map(message => (
          <Message
            key={message.name}
            name={message.name}
            text={message.text}
            duration={message.duration}
            show-left={message.showLeft}
            right-hide={message.rightHide}
            type={message.type}
            position={message.position}
            on-close={message.onClose}
          />
        ))}
      </div>
    )
  }
})
