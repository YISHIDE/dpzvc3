import React, { useEffect, useRef, useState } from 'react';
import type { PopupProps } from './types';
import { CSSTransition } from 'react-transition-group';
import '@dpzvc3/styles/dist/components/popup.css'
import '@dpzvc3/styles/dist/utils/animation.css'

const prefixCls = 'dpzvc3-popup';

const Popup: React.FC<PopupProps> = (props) => {
  const {
    modelValue = false,
    position = 'bottom',
    showMask = true,
    maskClosable = true,
    width = '100%',
    height,
    styles = {},
    children,
    onUpdateModelValue,
  } = props;

  const [visible, setVisible] = useState<boolean>(!!modelValue);
  const [mask, setMask] = useState<boolean>(!!showMask);

  const maskRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => setVisible(!!modelValue), [modelValue]);
  useEffect(() => setMask(!!showMask), [showMask]);

  // notify parent (simulate update:modelValue)
  useEffect(() => {
    if (typeof onUpdateModelValue === 'function') onUpdateModelValue(visible);
  }, [visible, onUpdateModelValue]);

  const close = () => {
    if (maskClosable && mask) setVisible(false);
  };

  const contentStyle: React.CSSProperties = {
    ...styles,
    width,
    height: height ?? (position === 'top' ? 'auto' : '100%'),
  };

  return (
    <div className={prefixCls}>
      <CSSTransition
        nodeRef={maskRef}
        in={mask && visible}
        timeout={300}
        classNames="dpzvc3-ani-fade"
        mountOnEnter
        unmountOnExit
      >
        <div
          ref={maskRef}
          className={`${prefixCls}-mask`}
          onClick={close}
          onTouchMove={(e) => e.preventDefault()}
        />
      </CSSTransition>

      <CSSTransition
        nodeRef={contentRef}
        in={visible}
        timeout={300}
        classNames={`dpzvc3-ani-${position}`}
        mountOnEnter
        unmountOnExit
      >
        <div
          ref={contentRef}
          className={`${prefixCls}-${position} ${prefixCls}-content`}
          style={contentStyle}
        >
          {children}
        </div>
      </CSSTransition>
    </div>
  );
};

export type { PopupProps } from './types';
export default Popup;
