import React, { useMemo } from 'react';
import type { SpinnerProps, SpinnerType } from './types';
import '@dpzvc3/styles/dist/components/spinner.css';

const SPINNERS: SpinnerType[] = [
  'blade',
  'snake',
  'double-bounce',
  'triple-bounce',
  'fading-circle',
];

function parseSpinner(type: SpinnerType | number | undefined): SpinnerType {
  let value: string | number = type ?? SPINNERS[0];

  if (typeof value === 'number' || /^\d+$/.test(String(value))) {
    const index = Number(value);
    if (index >= SPINNERS.length || index < 0) {
      console.warn(`'${value}' spinner not found, use the default spinner.`);
      return SPINNERS[0];
    }
    return SPINNERS[index];
  }

  if (!SPINNERS.includes(value as SpinnerType)) {
    console.warn(`'${value}' spinner not found, use the default spinner.`);
    return SPINNERS[0];
  }

  return value as SpinnerType;
}

const Spinner: React.FC<SpinnerProps> = ({
  type = 'snake',
  size = 30,
  color = '#39f',
}) => {
  const key = useMemo(() => parseSpinner(type), [type]);
  const numericSize = typeof size === 'number' ? size : parseInt(size, 10);

  const commonStyle: React.CSSProperties = {
    width: numericSize,
    height: numericSize,
  };

  switch (key) {
    case 'blade': {
      const blades = Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          className={`blade blade-${i}`}
          style={color ? { backgroundColor: color } : undefined}
        />
      ));
      return (
        <div className="dpzvc3-spinner-blade" style={commonStyle}>
          {blades}
        </div>
      );
    }
    case 'snake': {
      const borderSize = Math.ceil(numericSize / 8);
      const style: React.CSSProperties = {
        ...commonStyle,
        borderWidth: borderSize,
        borderTopColor: color,
        borderLeftColor: color,
        borderBottomColor: color,
      };
      return <div className="dpzvc3-spinner-snake" style={style} />;
    }
    case 'double-bounce': {
      const dots = Array.from({ length: 2 }).map((_, i) => (
        <div
          key={i}
          className={`bounce bounce-${i + 1}`}
          style={color ? { backgroundColor: color } : undefined}
        />
      ));
      return (
        <div className="dpzvc3-spinner-double-bounce" style={commonStyle}>
          {dots}
        </div>
      );
    }
    case 'triple-bounce': {
      const dots = Array.from({ length: 3 }).map((_, i) => (
        <div
          key={i}
          className={`bounce bounce-${i + 1}`}
          style={color ? { backgroundColor: color } : undefined}
        />
      ));
      return (
        <div className="dpzvc3-spinner-triple-bounce" style={commonStyle}>
          {dots}
        </div>
      );
    }
    case 'fading-circle': {
      const blocks = Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          className={`block block-${i + 1}`}
          style={{ transform: `rotate(${30 * i}deg)` }}
        >
          <div
            className={`circle circle-${i + 1}`}
            style={{
              backgroundColor: color,
              animationDelay: `${(1.2 / 12) * i - 1.2}s`,
            }}
          />
        </div>
      ));
      return (
        <div className="dpzvc3-spinner-fading-circle" style={commonStyle}>
          {blocks}
        </div>
      );
    }
    default:
      return null;
  }
};

export type { SpinnerProps } from './types';
export default Spinner;
