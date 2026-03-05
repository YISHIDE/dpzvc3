import React from 'react';
import type { text_barProps } from './types';
import '@dpzvc3/styles/dist/components/text-bar.css';

const prefixCls = 'dpzvc3-text-bar';

const text_bar: React.FC<text_barProps> = (props) => {
  // TODO: port logic from vue version (packages/vue/src/components/text-bar)
  return <div className={prefixCls}>{props.children}</div>;
};

export type { text_barProps } from './types';
export default text_bar;
