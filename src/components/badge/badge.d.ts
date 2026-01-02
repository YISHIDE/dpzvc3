// src/components/badge/badge.d.ts

import type { App } from 'vue'
import type { BadgeProps } from './types'  // 引入同级 types.ts 中的 BadgeProps

/** Badge 组件实例类型，带 install 方法 */
declare const Badge: {
  /** Vue 组件本身 */
  new (): any
  /** props 类型引用 */
  __props?: BadgeProps
  /** install 方法，用于全量注册 */
  install(app: App): void
}

export default Badge