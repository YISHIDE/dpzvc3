export type ActionItem = {
  text: string
  onClick?: (item: ActionItem, index: number) => void
}

export interface ActionSheetProps {
  modelValue?: boolean
  items?: ActionItem[]
  cancleText?: string
}

// export interface ActionSheetEmits { 
//   'update:modelValue': (value: string) => true
// }
// 事件
export const inputEmits = {
  'update:modelValue': (value: ActionSheetProps['modelValue']) => true,
} as const

export type ActionSheetEmits = typeof inputEmits


// 类名
type ActionSheetClassName = 'dpzvc3-actionSheet' | 'dpzvc3-actionSheet-wrapper' | 'dpzvc3-actionSheet-wrapper-action' | 'dpzvc3-actionSheet-cancle'
export type ActionSheetClassNameArray = ActionSheetClassName[]