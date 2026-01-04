// export interface MessageItem {
//   name: string
//   text: string
//   duration?: number
//   showLeft?: boolean
//   rightHide?: boolean
//   type?: 'normal' | 'success' | 'error' | 'warning'
//   position?: 'top' | 'bottom'
//   onClose?: () => void

import type { ComponentPublicInstance } from 'vue'

// }
export interface MessageProps {
  name?: string | number
  text?: string | number
  duration?: number
  showLeft?: boolean
  rightHide?: boolean
  type?: 'success' | 'loading' | 'error' | 'normal' | 'warning' | 'danger'
  position?: 'top' | 'bottom'
  onClose?: () => void
}
// type stylesOptions = "left" | "top"
export type MergeMessageOptions<T = MessageProps> = {
    [K in keyof T]: T[K]
} & {
  loading?: boolean,
  styles?: Record<string, any>
}

// message实例
export type MessageInstance = {
  show: (options:MergeMessageOptions) => any
  success: (options:MergeMessageOptions) => any
  error: (options: MergeMessageOptions) => any
  loading: (options: MergeMessageOptions) => any
  // config: (options: MergeMessageOptions) => void
  destroy: () => void
}

export type MgInstance = {
  add: (options: any) => void
  remove: (name: string | number) => void
  closeAll: () => void
  component: ComponentPublicInstance
  destroy: () => void
} | null