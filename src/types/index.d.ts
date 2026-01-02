// src/types/index.d.ts

/* ----------------------------------
 * 1️⃣ 导出组件 & props（给 TS 模块 import 用）
 * ---------------------------------- */

export { default as Badge } from '../components/badge'
export type { BadgeProps } from '../components/badge/types'
export { default as Popup } from '../components/popup'
export type { PopupProps } from '../components/popup/types'
export { default as ActionSheet } from '../components/actionSheet'
export type { ActionSheetProps } from '../components/actionSheet/types'

export { default as Card } from '../components/card'
export type { CardProps } from '../components/card/types'

export { default as Rater } from '../components/rater'
export type { RaterProps } from '../components/rater/types'
/* ----------------------------------
 * 2️⃣ 全局组件声明（给 <template> 用）
 * ---------------------------------- */

import type { BadgeProps } from '../components/badge/types'
import type { PopupProps } from '../components/popup/types'
import type { ActionSheetProps } from '../components/actionSheet/types'
import type { CardProps } from '../components/card/types'
import type { RaterProps } from '../components/rater/types'
declare module 'vue' {
  export interface GlobalComponents {
    Badge: typeof import('../components/badge')['default'] & {
      __props: BadgeProps
    },
    Popup: typeof import('../components/popup')['default'] & {
      __props: PopupProps
    },
    ActionSheet: typeof import('../components/actionSheet')['default'] & {
      __props: ActionSheetProps
    },
    Card: typeof import('../components/card')['default'] & {
      __props: CardProps
    },
    Rater: typeof import('../components/rater/rater')['default'] & {
      __props: RaterProps
    },
  }
}

/* ----------------------------------
 * 3️⃣ 必须存在，保证这是 module
 * ---------------------------------- */
export {}