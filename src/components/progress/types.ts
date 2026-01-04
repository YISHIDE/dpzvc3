// src/components/Progress/types.ts
export interface ProgressProps {
  /** 自定义样式 */
  styles?: Record<string, any>
  /** 当前进度 */
  modelValue?: number | string
  /** 进度条高度 */
  barHeight?: number | string
}