import React from 'react';
import type { switch_barProps } from './types';
import '@dpzvc3/styles/dist/components/switch-bar.css';

const prefixCls = 'dpzvc3-switch-bar';

const switch_bar: React.FC<switch_barProps> = (props) => {
  // TODO: port logic from vue version (packages/vue/src/components/switch-bar)
  return <div className={prefixCls}>{props.children}</div>;
};

export type { switch_barProps } from './types';
export default switch_bar;
