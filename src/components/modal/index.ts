/**
 * index.js - Vue 3 版本
 */
import { createModalInstance } from './confirm'
import type { MergeOptions, DefaultProps, ModalInstance } from './types'
let modalInstance:DefaultProps

function getModalInstance () {
  if (!modalInstance) {
    modalInstance = createModalInstance({
      showHead: true,
      // closable: true,
      maskClosable: false,
      footerHide: false
    })
  }
  return modalInstance
}

function confirm (options: MergeOptions) {
  const instance = getModalInstance()

  options.onRemove = () => {
    modalInstance = null
  }

  instance!.show(options)
  return instance
}
const Modal: ModalInstance = {
  info: (props: MergeOptions) => {
    props.showCancle = true
    props.showHead = false
    return confirm(props)
  },
  confirm: (props: MergeOptions) => {
    props.showCancle = false
    props.showHead = false
    return confirm(props)
  },
  remove: () => {
    if (!modalInstance) return false
    const instance = getModalInstance()
    instance!.remove()
  }
}
// info 模态框，显示取消按钮
// Modal.info = function (props: MergeOptions) {
//   props.showCancle = true
//   props.showHead = false
//   return confirm(props)
// }

// confirm 模态框，不显示取消按钮
// Modal.confirm  = function (props: MergeOptions) {
//   props.showCancle = false
//   props.showHead = false
//   return confirm(props)
// }

// 移除当前 modal
// Modal.remove = function () {
//   if (!modalInstance) return false
//   const instance = getModalInstance()
//   instance!.remove()
// }

export default Modal
