import React from 'react';
import type { slide_barProps } from './types';
import '@dpzvc3/styles/dist/components/slide-bar.css';

const prefixCls = 'dpzvc3-slide-bar';

const slide_bar: React.FC<slide_barProps> = (props) => {
  // TODO: port logic from vue version (packages/vue/src/components/slide-bar)
  return <div className={prefixCls}>{props.children}</div>;
};

export type { slide_barProps } from './types';
export default slide_bar;
