/**
 * Created by admin on 2025/12/10.
 * Rewritten for Vue 3 (no createApp)
 */

import {createPromptInstance } from './confirm'
import type { MergePromptOptions, PromptInstance, DefaultPromptProps } from './types'
let promptInstance: DefaultPromptProps

function getPromptInstance () {
  if (!promptInstance) {
    promptInstance = createPromptInstance({
      closable: true,
      maskClosable: false,
      // footerHide: false
    })
  }
  return promptInstance
}

/**
 * confirm 核心方法
 */
function confirm (options: MergePromptOptions = {}) {
  const instance: DefaultPromptProps = getPromptInstance()!

  // 组件销毁回调
  options.onRemove = () => {
    promptInstance = null
  }

  instance.show(options)
}

/**
 * info 弹窗
 */
const Prompt: PromptInstance = {
  info: (props: MergePromptOptions = {}) => { 
    props.showCancle = true
    return confirm(props)
  },
  remove: () => {
    if (!promptInstance) return false
    const instance = getPromptInstance()!
    instance.remove()
  } 
}

export default Prompt
