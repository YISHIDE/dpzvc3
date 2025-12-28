/**
 * Vue 3 prompt confirm
 * 使用 createVNode + render
 */

import { createVNode, render } from 'vue'
import Prompt from './prompt.vue'

// let seed = 0

Prompt.newInstance = (properties = {}) => {
  // const id = `dpzvc3-prompt-${seed++}`
  const instance = null
  // 容器
  const container = document.createElement('div')
  // container.id = id
  document.body.appendChild(container)
  // 组件 props（默认值）
  const props = {
    value: false,
    text: '',
    placeholderText: '请输入',
    width: '70%',
    title: '',
    okText: '确定',
    cancleText: '取消',
    loading: false,
    showCancle: true,
    spec: '',
    message: '',
    validator: null,
    onOk: () => {},
    onCancle: () => {},
    ...properties
  }

  const updateVNode = () => {
    // vnode
    // console.log(props, 'props')
    const vnode = createVNode(Prompt, {
      ...props,
      // 给动态挂载组件绑定 update:value 事件
      'onUpdate:value': (val) => {
        // 当子组件 emit('update:value', false) 时执行
        if (val === false) {
          vnode.component.props.value = false // 关闭内部显示
          destroy() // 销毁 DOM
        }
      },
      onRemove: destroy
    })
    // 挂载
    render(vnode, container)
    // instance = vnode.component
  }
  // 销毁
  const destroy = () => {
    props.value = false
    setTimeout(() => {
      render(null, container)
    }, 300)
  }

  return {
    /**
     * 显示
     */
    show (options = {}) {
      // alert(1)
      Object.keys(options).forEach(key => {
        props[key] = options[key]
      })
      // console.log(instance.props, 'props')
      props.value = true
      updateVNode()
    },

    /**
     * 关闭
     */
    remove () {
      props.value = false

      destroy()
    },

    component: instance
  }
}

export default Prompt
