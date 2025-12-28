/**
 * confirm.js - Vue 3 版本
 * 负责创建 MessageGroup 实例
 */

import { createVNode, render } from 'vue'
import MessageGroup from './messageGroup.vue'

MessageGroup.newInstance = function (props = {}) {
  const container = document.createElement('div')
  document.body.appendChild(container)

  let vnode = null
  let instance = null // 组件实例 proxy

  const mount = () => {
    vnode = createVNode(MessageGroup, {
      ...props
      // 这里使用 ref 拿到组件实例 proxy
    })
    render(vnode, container)
    instance = vnode.component.proxy
  }

  mount()

  return {
    add (options) {
      if (instance && instance.add) {
        instance.add(options)
      }
    },
    remove (name) {
      if (instance && instance.remove) {
        instance.remove(name)
      }
    },
    closeAll () {
      if (instance && instance.closeAll) {
        instance.closeAll()
      }
    },
    component: instance,
    destroy () {
      if (instance && instance.closeAll) {
        instance.closeAll()
      }

      setTimeout(() => {
        render(null, container)
        if (container.parentNode) {
          container.parentNode.removeChild(container)
        }
        instance = null
      }, 500)
    }
  }
}

export default MessageGroup
