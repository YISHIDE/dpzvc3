// src/components/spinner/types.ts
export type SpinnerType =
  | 'blade'
  | 'snake'
  | 'double-bounce'
  | 'triple-bounce'
  | 'fading-circle'

// type Compute<T> = { [K in keyof T]: T[K] extends Object ? Compute<T[K]> : T[K] }; // 将类型展开方便提示
// interface Spinner {
//   size?: number | string
//   type?: SpinnerType | number
//   color?: string
// }
// export type SpinnerProps = Compute<Spinner>
export interface SpinnerProps {
  size?: number | string
  type?: SpinnerType | number
  color?: string
}