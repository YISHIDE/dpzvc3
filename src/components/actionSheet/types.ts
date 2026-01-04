type ActionItem = {
  text: string
  onClick?: (item: ActionItem, index: number) => void
}

export type ActionSheetProps = {
  modelValue?: boolean
  items?: ActionItem[]
  cancleText?: string
}