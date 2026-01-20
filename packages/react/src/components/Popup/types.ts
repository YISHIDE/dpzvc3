import type React from 'react';

export interface PopupProps {
  modelValue?: boolean;
  position?: 'top' | 'bottom' | 'right' | 'left';
  showMask?: boolean;
  maskClosable?: boolean;
  width?: number | string;
  height?: number | string;
  styles?: React.CSSProperties;
  children?: React.ReactNode;
  // React 端把 Vue 的 "update:modelValue" 映射为此回调
  onUpdateModelValue?: (value: boolean) => void;
}