import React from 'react';
import type { swipeProps } from './types';
import '@dpzvc3/styles/dist/components/swipe.css';

const prefixCls = 'dpzvc3-swipe';

const swipe: React.FC<swipeProps> = (props) => {
  // TODO: port logic from vue version (packages/vue/src/components/swipe)
  return <div className={prefixCls}>{props.children}</div>;
};

export type { swipeProps } from './types';
export default swipe;
