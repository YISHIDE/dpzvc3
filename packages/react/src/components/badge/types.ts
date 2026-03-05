export type BadgeType = 'normal' | 'danger' | 'warning' | 'success';
export type BadgeSize = 'small' | 'normal' | 'large';

export interface badgeProps {
  type?: BadgeType;
  size?: BadgeSize;
  dot?: boolean;
  max?: number | string;
  number?: number | string;
  children?: React.ReactNode;
}
