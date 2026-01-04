/**
 * Vue 3 prompt confirm
 * 使用 createVNode + render
 */

import { createVNode, render } from 'vue'
import Prompt from './prompt'
import type { MergePromptOptions, PromptProps } from './types'
// let seed = 0

function createPromptInstance (properties:MergePromptOptions = {}) {
  // const id = `dpzvc3-prompt-${seed++}`
  // const instance = null
  // 容器
  const container = document.createElement('div')
  // container.id = id
  document.body.appendChild(container)
  // 组件 props（默认值）
  const props: MergePromptOptions = {
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
const mergeProps = <T extends object, K extends keyof T>(
  target: T,
  source: Partial<T>
) =>{
  (Object.keys(source) as K[]).forEach((key) => {
    target[key] = source[key]!
  })
}
  const updateVNode = () => {
    // vnode
    // console.log(props, 'props')
    const vnode = createVNode(Prompt, {
      ...props,
      // 给动态挂载组件绑定 update:value 事件
      'onUpdate:value': (val: boolean) => {
        // 当子组件 emit('update:value', false) 时执行
        if (val === false) {
          vnode.component!.props.value = false // 关闭内部显示
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
    show (options: PromptProps = {}) {
      // alert(1)
      mergeProps(props, options)
      // Object.keys(options).forEach((key) => {
      //   const typeKey = key as keyof PromptProps
      //   const val = options[typeKey];
      //   // if (val) { 
      //       props[typeKey] = val
      //   // }
      // })
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

    // component: instance
  }
}

// export default Prompt
export { createPromptInstance }
