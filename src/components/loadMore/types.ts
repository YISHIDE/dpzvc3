// src/components/Loadmore/types.ts
export interface LoadmoreProps {
  height?: number | string

  /** 下拉刷新 */
  refresh?: () => void
  upLoadingText?: string
  upDistance?: number
  upPullText?: string
  upDropText?: string
  maxDistance?: number
  speed?: number

  /** 上拉加载 */
  loadMore?: () => void
  downEndText?: string
  downDropText?: string
  downLoadingText?: string
  downDistance?: number
  hasMore?: boolean

  /** 其他 */
  styles?: Record<string, any>
  auto?: boolean
  autoFill?: boolean
}