import type { CSSProperties } from "vue";
export interface PopupProps {
  modelValue?: boolean;
  position?: "top" | "bottom" | "right" | "left";
  showMask?: boolean;
  maskClosable?: boolean;
  width?: number | string;
  height?: number | string;
  styles?: CSSProperties;
}
/* emits 运行时定义 */
export const inputEmits = {
  'update:modelValue': (value: boolean) => true
}

/* emits 类型定义（不要用 typeof） */
export type PopupEmits = {
  (e: 'update:modelValue', value: boolean): void
}
// 类名
type PopupClassNamePosition = "top" | "bottom" | "right" | "left";
type PopupClassName =
  | "dpzvc3-popup"
  | "dpzvc3-popup-mask"
  | "dpzvc3-popup-content"
  | `dpzvc3-popup-${PopupClassNamePosition}`;
export type PopupClassNameArray = PopupClassName[];
