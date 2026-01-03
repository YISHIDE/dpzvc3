// src/components/swipe/types.ts
export interface SwipeItem {
  image?: string
  spec?: string
  link?: string
  onClick?: (item: SwipeItem, index: number) => void
  [key: string]: any
}

export interface SwipeProps {
  auto?: boolean
  list?: SwipeItem[]
  startIndex?: number
  height?: number | string
  dots?: 'top' | 'bottom'
  multiple?: boolean
  distanceIndex?: number
  loop?: boolean
  speed?: number
  perpage?: number
}