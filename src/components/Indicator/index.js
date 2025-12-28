/**
 * Indicator - Vue 3 版本
 */
import { createVNode, render } from 'vue'
import Indicator from './Indicator.vue'

let instance = null
let container = null

function createInstance (props = {}) {
  container = document.createElement('div')
  document.body.appendChild(container)

  const defaultProps = {
    size: 45,
    type: 'snake',
    color: '#ffffff',
    text: '加载中...',
    visible: false,
    ...props
  }
  const vnode = createVNode(Indicator, {
    ...defaultProps,
    onRemove: destroyInstance
  })
  render(vnode, container)
  instance = vnode.component
  return instance
}

function destroyInstance () {
  if (!instance || !container) return
  render(null, container)
  if (container.parentNode) {
    container.parentNode.removeChild(container)
  }
  instance = null
  container = null
}

function open (options = {}) {
  if (!instance) {
    createInstance(options)
  }

  // 更新 props
  if (instance) {
    Object.keys(options).forEach(key => {
      instance.props[key] = options[key]
    })
    instance.props.modelValue = true
  }
}

function close () {
  if (!instance) return
  instance.props.modelValue = false
  destroyInstance()
}

/* ================== 对外 API ================== */

Indicator.open = open
Indicator.remove = close

Indicator.snake = function (props = {}) {
  props.type = 'snake'
  open(props)
}

Indicator.blade = function (props = {}) {
  props.type = 'blade'
  open(props)
}

Indicator.circle = function (props = {}) {
  props.type = 'fading-circle'
  open(props)
}

Indicator.bounce = function (props = {}) {
  props.type = 'double-bounce'
  open(props)
}

export default Indicator
