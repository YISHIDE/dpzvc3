import type React from 'react';

export type ButtonType =
  | 'success'
  | 'loading'
  | 'normal'
  | 'primary'
  | 'warning'
  | 'danger'
  | 'text';

export type BorderSide = 'all' | 'top' | 'bottom' | 'left' | 'right' | 'none';

export interface ButtonProps {
  type?: ButtonType;
  styles?: React.CSSProperties;
  circle?: boolean;
  disabled?: boolean;
  inline?: boolean;
  width?: string | number;
  height?: string | number;
  loading?: boolean;
  radius?: boolean;
  border?: BorderSide;
  left?: React.ReactNode;
  right?: React.ReactNode;
  children?: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}
