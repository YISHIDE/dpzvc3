const clickoutsideContext = '@@clickoutsideContext'

export default {
  beforeMount (el, binding) {
    // document 事件处理函数
    const documentHandler = (e) => {
      // 如果点击元素本身或其子元素，则不触发
      if (!el.contains(e.target)) {
        // 调用传入的方法
        if (typeof binding.value === 'function') {
          binding.value(e)
        }
      }
    }

    // 保存上下文信息到 el 上，方便解绑
    el[clickoutsideContext] = {
      documentHandler,
      event: binding.arg || 'click'
    }

    document.addEventListener(el[clickoutsideContext].event, documentHandler)
  },

  updated (el, binding) {
    // 可以在更新时替换方法
    // binding.value 已经是最新函数
    el[clickoutsideContext].documentHandler = (e) => {
      if (!el.contains(e.target) && typeof binding.value === 'function') {
        binding.value(e)
      }
    }
  },

  unmounted (el) {
    document.removeEventListener(
      el[clickoutsideContext].event,
      el[clickoutsideContext].documentHandler
    )
    delete el[clickoutsideContext]
  }
}
