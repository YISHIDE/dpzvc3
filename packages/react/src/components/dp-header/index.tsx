import React, { useState, useEffect, useMemo } from 'react';
import type { dp_headerProps } from './types';
import '@dpzvc3/styles/dist/components/dp-header.css';

const prefixCls = 'dpzvc3-header';

const Header: React.FC<dp_headerProps> = ({
  modelValue = true,
  fixed = true,
  title = '',
  wechat = false,
  children,
  onUpdateModelValue,
}) => {
  const [visible, setVisible] = useState<boolean>(modelValue);
  const [isWechat, setWechat] = useState<boolean>(wechat);

  const classes = useMemo(
    () =>
      [prefixCls, fixed ? `${prefixCls}-fixed` : ''].filter(Boolean).join(' '),
    [fixed]
  );

  const isWeixin = useMemo(
    () => /micromessenger/i.test(window.navigator.userAgent),
    []
  );
  const isPcWeixin = useMemo(
    () => /windowswechat/i.test(window.navigator.userAgent),
    []
  );

  useEffect(() => {
    setVisible(modelValue);
  }, [modelValue]);
  useEffect(() => {
    setWechat(wechat);
  }, [wechat]);

  useEffect(() => {
    if ((isWeixin || isPcWeixin) && !isWechat) {
      setVisible(false);
      onUpdateModelValue && onUpdateModelValue(false);
    }
  }, [isWeixin, isPcWeixin, isWechat, onUpdateModelValue]);

  const back = () => {
    window.history.back();
  };

  if (!visible) return null;

  return (
    <div className={classes}>
      <header>
        <div className="left" onClick={back} style={{ cursor: 'pointer' }}>
          {/* custom left */}
          {children && (children as any).left ? (
            (children as any).left
          ) : (
            <>
              <span className="arrow" />
              <span className="text">返回</span>
            </>
          )}
        </div>
        <div className="title dpzvc3-nowrap">{title}</div>
        <div className="right">
          {children && (children as any).right ? (
            (children as any).right
          ) : (
            <div />
          )}
        </div>
      </header>
      {fixed && <div className="header-place" />}
    </div>
  );
};

export type { dp_headerProps } from './types';
export default Header;
