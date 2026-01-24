import type { App } from 'vue'
import UniCell from '../components/uni-cell/uni-cell.vue' 
import UniButton from '../components/uni-button/uni-button.vue' 
export default {
  install(app: App) {
    // 示例：全局方法
    app.config.globalProperties.$toast = (title: string) => {
      uni.showToast({ title })
    }

    // 示例：全局指令
    app.directive('debounce', {
      mounted(el, binding) {
        let timer: any
        el.addEventListener('click', () => {
          if (timer) return
          timer = setTimeout(() => {
            binding.value?.()
            timer = null
          }, 300)
        })
      }
    })
    // #ifdef APP || H5
    app.component('uni-cell', UniCell)
    app.component('uni-button', UniButton)
    // #endif
  }
}