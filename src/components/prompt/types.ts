// src/components/Prompt/types.ts
import type { CSSProperties } from 'vue'
type PromptValidator =
  | RegExp
  | ((val: string) => boolean | string)

export interface PromptProps {
  value?: boolean
  text?: string
  closable?: boolean
  maskClosable?: boolean
  title?: string
  width?: string
  okText?: string
  cancleText?: string
  loading?: boolean
  styles?: CSSProperties
  spec?: string
  validator?: PromptValidator | null
  msg?: string
  placeholderText?: string
  onOk?: (val: string) => void
  onCancle?: () => void
}

export type MergePromptOptions<T = PromptProps> = {
    [K in keyof T]: T[K]
} & {
    onRemove?: () => void
  showCancle?: boolean,
    message?: string
}


// Prompt实例
export type PromptInstance = {
  remove: () => void,
  info: (props: MergePromptOptions) => any
}
//开启
export type DefaultPromptProps = {
    show: (options: MergePromptOptions) => any,
    remove: () => void,
    // component: ComponentPublicInstance
} | null