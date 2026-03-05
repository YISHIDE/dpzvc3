import React from 'react';
import type { to_topProps } from './types';
import '@dpzvc3/styles/dist/components/to-top.css';

const prefixCls = 'dpzvc3-to-top';

const to_top: React.FC<to_topProps> = (props) => {
  // TODO: port logic from vue version (packages/vue/src/components/to-top)
  return <div className={prefixCls}>{props.children}</div>;
};

export type { to_topProps } from './types';
export default to_top;
