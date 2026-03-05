import React from 'react';
import type { cardProps } from './types';
import '@dpzvc3/styles/dist/components/card.css';

const prefixCls = 'dpzvc3-card';

const Card: React.FC<cardProps> = (props) => {
  const { width = '100%', header, footer, children } = props;

  const classes = [prefixCls].join(' ');
  const headerCls = `${prefixCls}-header dpzvc3-1px-bottom`;
  const contentCls = `${prefixCls}-content`;
  const footerCls = `${prefixCls}-footer dpzvc3-1px-top`;

  return (
    <div className={classes} style={{ width }}>
      <div className={headerCls}>{header}</div>
      <div className={contentCls}>{children}</div>
      <div className={footerCls}>{footer}</div>
    </div>
  );
};

export type { cardProps } from './types';
export default Card;
