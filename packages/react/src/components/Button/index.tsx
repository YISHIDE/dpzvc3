import React, { useMemo } from 'react';
import type { ButtonProps } from './types';
import Spinner from '../Spinner';
import '@dpzvc3/styles/dist/components/dp-button.css';

const prefixCls = 'dpzvc3-button';

const Button: React.FC<ButtonProps> = ({
  type = 'normal',
  styles = {},
  circle = false,
  disabled = false,
  inline = false,
  width = '100%',
  height = '40px',
  loading = false,
  radius = true,
  border = 'all',
  left,
  right,
  children,
  onClick,
}) => {
  const wrapperStyle: React.CSSProperties = useMemo(
    () => ({
      display: inline ? 'inline-block' : 'block',
      width,
      height,
    }),
    [inline, width, height]
  );

  const wrapperCls = useMemo(() => {
    const cls = [prefixCls];
    if (circle) cls.push(`${prefixCls}-circle`);
    if (inline) cls.push(`${prefixCls}-inline`);
    return cls.join(' ');
  }, [circle, inline]);

  const btnClass = useMemo(() => {
    const classes: string[] = [`${prefixCls}-btn`, `dpzvc3-1px-${border}`];
    classes.push(`${prefixCls}-${type}`);
    if (disabled) classes.push(`${prefixCls}-disabled`);
    if (radius) classes.push(`${prefixCls}-radius`);
    return classes.join(' ');
  }, [type, border, disabled, radius]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled || loading) return;
    onClick && onClick(e);
  };

  return (
    <div className={wrapperCls} style={wrapperStyle}>
      <button
        className={btnClass}
        style={styles}
        disabled={disabled}
        onClick={handleClick}
      >
        {/* left slot or loading */}
        {left
          ? left
          : loading && (
              <span className="loading">
                <Spinner type="blade" size={15} color="#ffffff" />
              </span>
            )}

        {/* default slot */}
        {children ? children : <span>确定</span>}

        {/* right slot */}
        {right}
      </button>
    </div>
  );
};

export type { ButtonProps } from './types';
export default Button;
