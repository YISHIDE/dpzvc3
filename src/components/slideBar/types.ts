// src/components/slideBar/types.ts
export interface SlideBarItem {
  name: string
  [key: string]: any
}

export interface SlideBarProps {
  scrollHeight?: string | number
  height?: string | number
  styles?: Record<string, any>
  childWidth?: number
  scrollColor?: string
  textAlign?: string
  flex?: boolean
  type?: 'normal' | 'vertical'
  list?: SlideBarItem[]
  index?: number
  distanceIndex?: number
  canDrag?: boolean
}