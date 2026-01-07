// src/types/index.d.ts

/* ----------------------------------
 * 1️⃣ 按需导出组件 & props（给 TS import 用）
 * ---------------------------------- */
export { default as Badge } from './components/badge'
export type { BadgeProps } from './components/badge/types'

export { default as Popup } from './components/popup'
export type { PopupProps, PopupEmits } from './components/popup/types'

export { default as ActionSheet } from './components/actionSheet'
export type { ActionSheetProps, ActionSheetEmits } from './components/actionSheet/types'

export { default as Card } from './components/card'
export type { CardProps } from './components/card/types'

export { default as Rater } from './components/rater'
export type { RaterProps } from './components/rater/types'

export { default as Cell } from './components/cell'
export type { CellProps, CellEmits } from './components/cell/types'

export { default as CellSwipe } from './components/cellSwipe'
export type { CellSwipeProps } from './components/cellSwipe/types'

export { default as DpHeader } from './components/header'
export type { HeaderProps } from './components/header/types'

export { default as Spinner } from './components/spinner'
export type { SpinnerProps } from './components/spinner/types'

export { default as Swipe } from './components/swipe'
export type { SwipeProps } from './components/swipe/types'

export { default as DpButton } from './components/button'
export type { ButtonProps, ButtonEmits } from './components/button/types'

export { default as Picker } from './components/picker'
export type { PickerProps } from './components/picker/types'

export { default as SwitchBar } from './components/switchbar'
export type { SwitchBarProps } from './components/switchbar/types'

export { default as Tab } from './components/tab'
export type { TabProps } from './components/tab/types'

export { default as TextBar } from './components/Text'
export type { TextBarProps } from './components/Text/types'

export { default as Number } from './components/number'
export type { NumberProps } from './components/number/types'

export { default as ToTop } from './components/toTop'
export type { ToTopProps } from './components/toTop/types'

export { default as Upload } from './components/upload'
export type { UploadProps } from './components/upload/types'

export { default as SlideBar } from './components/slideBar'
export type { SlideBarProps } from './components/slideBar/types'

export { default as DpProgress } from './components/progress'
export type { ProgressProps } from './components/progress/types'

export { default as DpLoadMore } from './components/loadMore'
export type { LoadmoreProps } from './components/loadMore/types'

export { CheckBox, CheckBoxGroup } from './components/checkBox'
export type { CheckBoxProps, CheckBoxGroupProps } from './components/checkBox/types'

export { RadioBox, RadioBoxGroup } from './components/radioBox'
export type { RadioBoxProps, RadioGroupProps } from './components/radioBox/types'

/* ----------------------------------
 * 2️⃣ 全局组件声明（给 <template> 用）
 * ---------------------------------- */
import type { App } from 'vue'
import type { ModalInstance } from './components/modal/types'
import type { MessageInstance } from './components/message/types'
import type { IndicatorInstance } from './components/Indicator/types'
import type { PromptInstance } from './components/prompt/types'

declare module 'vue' {
  interface ComponentCustomProperties {
    $Modal: ModalInstance
    $Message: MessageInstance
    $Indicator: IndicatorInstance
    $Prompt: PromptInstance
  }

  export interface GlobalComponents {
    Badge: typeof import('./components/badge')['default']
    Popup: typeof import('./components/popup')['default']
    ActionSheet: typeof import('./components/actionSheet')['default']
    Card: typeof import('./components/card')['default']
    Rater: typeof import('./components/rater')['default']
    Cell: typeof import('./components/cell')['default']
    CellSwipe: typeof import('./components/cellSwipe')['default']
    DpHeader: typeof import('./components/header')['default']
    Spinner: typeof import('./components/spinner')['default']
    Swipe: typeof import('./components/swipe')['default']
    DpButton: typeof import('./components/button')['default']
    Picker: typeof import('./components/picker')['default']
    SwitchBar: typeof import('./components/switchbar')['default']
    Tab: typeof import('./components/tab')['default']
    TextBar: typeof import('./components/Text')['default']
    Number: typeof import('./components/number')['default']
    ToTop: typeof import('./components/toTop')['default']
    Upload: typeof import('./components/upload')['default']
    SlideBar: typeof import('./components/slideBar')['default']
    DpProgress: typeof import('./components/progress')['default']
    DpLoadMore: typeof import('./components/loadMore')['default']
    CheckBox: typeof import('./components/checkBox')['CheckBox']
    CheckBoxGroup: typeof import('./components/checkBox')['CheckBoxGroup']
    RadioBox: typeof import('./components/radioBox')['RadioBox']
    RadioBoxGroup: typeof import('./components/radioBox')['RadioBoxGroup']
  }
}

/* ----------------------------------
 * 3️⃣ 默认导出整个组件库为 Vue 插件
 * ---------------------------------- */
import type { Plugin } from 'vue'
export const Dpzvc3UI: Plugin
export default Dpzvc3UI

/* ----------------------------------
 * 4️⃣ 保证这是 module
 * ---------------------------------- */
export {}