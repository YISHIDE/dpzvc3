/**
 * index.js - Vue 3 版本
 */
import Modal from './confirm'

let modalInstance = null

function getModalInstance () {
  if (!modalInstance) {
    modalInstance = Modal.newInstance({
      showHead: true,
      closable: true,
      maskClosable: false,
      footerHide: false
    })
  }
  return modalInstance
}

function confirm (options = {}) {
  const instance = getModalInstance()

  options.onRemove = () => {
    modalInstance = null
  }

  instance.show(options)
  return instance
}

// info 模态框，显示取消按钮
Modal.info = function (props = {}) {
  props.showCancle = true
  props.showHead = false
  return confirm(props)
}

// confirm 模态框，不显示取消按钮
Modal.confirm = function (props = {}) {
  props.showCancle = false
  props.showHead = false
  return confirm(props)
}

// 移除当前 modal
Modal.remove = function () {
  if (!modalInstance) return false
  const instance = getModalInstance()
  instance.remove()
}

export default Modal
