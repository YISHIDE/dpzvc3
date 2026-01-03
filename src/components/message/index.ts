/**
 * message/index.js - Vue 3 版本
 */

import { createMessageInstance } from './confirm'
import { randomStr } from '../../utils/util'
import type { MergeMessageOptions,MessageInstance,MgInstance } from './types'
let defaultDuration = 1
let top = '0'

let MGInstance:MgInstance = null
let seed = 1
const time = Date.now()

function getName () {
  return `dpzvc3-message-group_${time}_${seed++}_${randomStr()}`
}

function getNewInstance () {
  if (!MGInstance) {
    MGInstance = createMessageInstance({
      styles: {
        top,
        right: '0'
      }
    })
  }

  return MGInstance
}

function message (props:MergeMessageOptions) {
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

const Message: MessageInstance= {

  show(options:MergeMessageOptions) {
    // alert(1)
    return message(options)
  },

  success (options:MergeMessageOptions) {
    return message({
      ...options,
      type: 'success'
    })
  },

  error (options:MergeMessageOptions) {
    return message({
      ...options,
      type: 'error'
    })
  },

  loading (options:MergeMessageOptions) {
    return message({
      ...options,
      type: 'loading',
      duration: 0,
      showLeft: true
    })
  },

  // config (options:MergeMessageOptions) {
  //   if (options?.top !== undefined) {
  //     top = options.top
  //   }

  //   if (options.duration !== undefined) {
  //     defaultDuration = options.duration
  //   }
  // },

  destroy () {
    if (!MGInstance) return
    MGInstance.destroy()
    MGInstance = null
  }
}
export default Message
