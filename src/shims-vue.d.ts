// shims-vue.d.ts
import type { App } from 'vue'
import type { BadgeProps } from '@/components/badge'

declare module '*.vue' {
  import { defineComponent } from 'vue'

  // 默认导出的 Vue 组件类型
  const component: ReturnType<typeof defineComponent> & { install?(app: App): void }
  export default component
}

// 全局组件类型声明，让 TS 和 Volar 能在模板里检查 props
declare module 'vue' {
  export interface GlobalComponents {
    Badge: typeof import('@/components/badge')['default'] & { __props: BadgeProps }
  }
}

// JSX 支持（如果你用 TSX/JSX，这块保留）
declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elem: string]: any
    }
    interface ElementChildrenAttribute {
      children: {}
    }
  }
}