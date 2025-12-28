/**
 * message/index.js - Vue 3 版本
 */

import MessageGroup from './confirm'
import { randomStr } from '../../utils/util'

let defaultDuration = 1
let top = '0'

let MGInstance = null
let seed = 1
const time = Date.now()

function getName () {
  return `dpzvc3-message-group_${time}_${seed++}_${randomStr()}`
}

function getNewInstance () {
  if (!MGInstance) {
    MGInstance = MessageGroup.newInstance({
      styles: {
        top,
        right: '0'
      }
    })
  }

  return MGInstance
}

function message (props = {}) {
  const {
    text = '',
    name = getName(),
    duration = props.duration === 0 ? 0 : (props.duration || defaultDuration),
    showLeft = false,
    rightHide = true,
    loading = false,
    onClose = () => {},
    styles = {},
    type = 'normal',
    position = 'center'
  } = props

  const instance = getNewInstance()
  // console.log(instance.add, 'instance')
  instance.add({
    name,
    text,
    duration,
    showLeft,
    rightHide,
    loading,
    onClose,
    styles,
    type,
    position
  })

  // 返回手动关闭函数（保持旧行为）
  return function remove () {
    instance.remove(name)
  }
}

export default {

  show (options = {}) {
    return message(options)
  },

  success (options = {}) {
    return message({
      ...options,
      type: 'success'
    })
  },

  error (options = {}) {
    return message({
      ...options,
      type: 'error'
    })
  },

  loading (options = {}) {
    return message({
      ...options,
      type: 'loading',
      duration: 0,
      showLeft: true
    })
  },

  config (options = {}) {
    if (options.top !== undefined) {
      top = options.top
    }

    if (options.duration !== undefined) {
      defaultDuration = options.duration
    }
  },

  destroy () {
    if (!MGInstance) return
    MGInstance.destroy()
    MGInstance = null
  }
}
