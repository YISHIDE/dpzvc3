/**
 * Created by admin on 2025/12/10.
 * Rewritten for Vue 3 (no createApp)
 */

import Prompt from './confirm'

let promptInstance = null

function getPromptInstance () {
  if (!promptInstance) {
    promptInstance = Prompt.newInstance({
      closable: true,
      maskClosable: false,
      footerHide: false
    })
  }
  return promptInstance
}

/**
 * confirm 核心方法
 */
function confirm (options = {}) {
  const instance = getPromptInstance()

  // 组件销毁回调
  options.onRemove = () => {
    promptInstance = null
  }

  instance.show(options)
}

/**
 * info 弹窗
 */
Prompt.info = function (props = {}) {
  props.showCancle = true
  return confirm(props)
}

/**
 * 手动关闭
 */
Prompt.remove = function () {
  if (!promptInstance) return

  const instance = getPromptInstance()
  instance.remove()
}

export default Prompt
