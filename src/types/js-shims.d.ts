// 声明所有 JS 模块，让 TS 知道它们的类型
declare module '*.js' {
  const content: any
  export default content
}
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<any, any, any>
  export default component
}

// 单独声明一些特殊 JS 类
declare module '../../utils/util' {
  export function randomStr(length?: number): string
  export function scrollTop(el: HTMLElement | Window, to?: number, duration?: number): void
  export const JPEG: any
}

declare module '../../lib/lib' {
  const rafTimeout: any
  export default rafTimeout
}

declare module '../../lib/MegaPixImage' {
  const MegaPixImage: any
  export default MegaPixImage
}

// 针对 JPEGEncoder 类的情况
declare module '../../utils/JPEGEncoder' {
  class JPEGEncoder {
    encode(data: any): any
  }
  const JPEG: JPEGEncoder
  export default JPEG
}