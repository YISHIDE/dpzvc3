// src/components/upload/types.ts
export interface UploadProps {
  /** 是否支持多选 */
  multiple?: boolean
  /** input accept */
  accept?: string
  /** 外层样式 */
  styles?: Record<string, any>
}