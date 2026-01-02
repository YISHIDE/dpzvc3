// src/types/index.d.ts

/* ----------------------------------
 * 1️⃣ 导出组件 & props（给 TS 模块 import 用）
 * ---------------------------------- */

export { default as Badge } from '../components/badge'
export type { BadgeProps } from '../components/badge/types'

/* ----------------------------------
 * 2️⃣ 全局组件声明（给 <template> 用）
 * ---------------------------------- */

import type { BadgeProps } from '../components/badge/types'

declare module 'vue' {
  export interface GlobalComponents {
    Badge: typeof import('../components/badge')['default'] & {
      __props: BadgeProps
    }
  }
}

/* ----------------------------------
 * 3️⃣ 必须存在，保证这是 module
 * ---------------------------------- */
export {}