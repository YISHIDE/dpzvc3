import React, { useMemo, useState, useEffect } from 'react';
import type { badgeProps } from './types';
import '@dpzvc3/styles/dist/components/badge.css';

const prefixCls = 'dpzvc3-badge';

const Badge: React.FC<badgeProps> = ({
  type = 'danger',
  size = 'normal',
  dot = false,
  max = 99,
  number,
  children,
}) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (dot) {
      setVisible(true);
    } else if (
      number === null ||
      number === undefined ||
      isNaN(Number(number))
    ) {
      setVisible(false);
    } else {
      setVisible(true);
    }
  }, [number, dot]);

  const supClasses = useMemo(() => {
    const arr: string[] = [`${prefixCls}-${type}`];
    if (!dot) arr.push(`${prefixCls}-size-${size}`);
    if (dot) arr.push(`${prefixCls}-dot`);
    return arr.join(' ');
  }, [type, size, dot]);

  const displayCount = useMemo(() => {
    if (dot) return '';
    const num = Number(number);
    return num <= Number(max) ? String(num) : `${max}+`;
  }, [number, max, dot]);

  return (
    <span className={prefixCls}>
      {children}
      {visible && <sup className={supClasses}>{displayCount}</sup>}
    </span>
  );
};

export type { badgeProps } from './types';
export default Badge;
