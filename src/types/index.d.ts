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

export { default as Cell } from '../components/cell'
export type { CellProps } from '../components/cell/types'

export { default as CellSwipe } from '../components/cellSwipe'
export type { CellSwipeProps } from '../components/cellSwipe/types'

export { default as DpHeader } from '../components/header'
export type { HeaderProps } from '../components/header/types'

export { default as Spinner } from '../components/spinner'
export type { SpinnerProps } from '../components/spinner/types'

export { default as Swipe } from '../components/swipe'
export type { SwipeProps } from '../components/swipe/types'

export { default as DpButton } from '../components/button'
export type { ButtonProps } from '../components/button/types'

export { default as Picker } from '../components/picker'
export type { PickerProps } from '../components/picker/types'

export { default as SwitchBar } from '../components/switchbar'
export type { SwitchBarProps } from '../components/switchbar/types'

export { default as Tab } from '../components/tab'
export type { TabProps } from '../components/tab/types'

export { default as TextBar } from '../components/Text'
export type { TextBarProps } from '../components/Text/types'

export { default as Number } from '../components/number'
export type { NumberProps } from '../components/number/types'

export { default as ToTop } from '../components/toTop'
export type { ToTopProps } from '../components/toTop/types'

export { default as Upload } from '../components/upload'
export type { UploadProps } from '../components/upload/types'

export { default as SlideBar } from '../components/slideBar'
export type { SlideBarProps } from '../components/slideBar/types'

// // Modal
// export { default as Modal } from '../components/modal/modal'
// // 实例调用类型定义
// export type { ModalInstance } from '../components/modal/types'
// // Modal 组件的 props 类型定义
// export type { ModalProps } from '../components/modal/types'

/* ----------------------------------
 * 2️⃣ 全局组件声明（给 <template> 用）
 * ---------------------------------- */
import type { App } from 'vue'
import type { BadgeProps } from '../components/badge/types'
import type { PopupProps } from '../components/popup/types'
import type { ActionSheetProps } from '../components/actionSheet/types'
import type { CardProps } from '../components/card/types'
import type { RaterProps } from '../components/rater/types'
import type { CellProps } from '../components/cell/types'
import type { CellSwipeProps } from '../components/cellSwipe/types'
import type { HeaderProps } from '../components/header/types'
import type { SpinnerProps } from '../components/spinner/types'
import type { SwipeProps } from '../components/swipe/types'
import type { ButtonProps } from '../components/button/types'
import type { PickerProps } from '../components/picker/types'
import type { SwitchBarProps } from '../components/switchbar/types'
import type { TabProps } from '../components/tab/types'
import type { TextBarProps } from '../components/Text/types'
import type { NumberProps } from '../components/Number/types'
import type { ToTopProps } from '../components/toTop/types'
import type { UploadProps } from '../components/upload/types'
import type { SlideBarProps } from '../components/slideBar/types'
import type { ModalInstance } from '../components/modal/types'
import type { MessageInstance } from '../components/message/types'
declare module 'vue' {
  interface ComponentCustomProperties {
    $Modal: ModalInstance
    $Message: MessageInstance
  }
  export interface GlobalComponents {
    // Badge: typeof import('../components/badge')['default'] & {
    //   install(app: App): void
    //   // __props: BadgeProps
    // },
    Badge: typeof import('../components/badge')['default'],
    Popup: typeof import('../components/popup')['default'],
    ActionSheet: typeof import('../components/actionSheet')['default'],
    Card: typeof import('../components/card')['default'],
    Rater: typeof import('../components/rater')['default'],
    Cell: typeof import('../components/cell')['default'],
    CellSwipe: typeof import('../components/cellSwipe')['default'],
    DpHeader: typeof import('../components/header')['default'],
    Spinner: typeof import('../components/spinner')['default'],
    Swipe: typeof import('../components/swipe')['default'],
    DpButton: typeof import('../components/button')['default'],
    Picker: typeof import('../components/picker')['default'],
    SwitchBar: typeof import('../components/switchbar')['default'],
    Tab: typeof import('../components/tab')['default'],
    TextBar: typeof import('../components/Text')['default'],
    Number: typeof import('../components/number')['default'],
    ToTop: typeof import('../components/toTop')['default'],
    Upload: typeof import('../components/upload')['default'],
    SlideBar: typeof import('../components/slideBar')['default'],
  }
}

/* ----------------------------------
 * 3️⃣ 必须存在，保证这是 module
 * ---------------------------------- */
export {}