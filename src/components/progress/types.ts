// src/components/Progress/types.ts
import type { CSSProperties } from 'vue'
export interface ProgressProps {
  /** 自定义样式 */
  styles?: CSSProperties
  /** 当前进度 */
  modelValue?: number | string
  /** 进度条高度 */
  barHeight?: number | string
}