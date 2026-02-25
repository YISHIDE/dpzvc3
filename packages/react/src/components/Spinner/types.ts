export type SpinnerType =
  | 'blade'
  | 'snake'
  | 'double-bounce'
  | 'triple-bounce'
  | 'fading-circle';

export interface SpinnerProps {
  type?: SpinnerType | number;
  size?: number | string;
  color?: string;
}
