import React from 'react';
import type { cell_swipeProps } from './types';
import '@dpzvc3/styles/dist/components/cell-swipe.css';

const prefixCls = 'dpzvc3-cell-swipe';

const cell_swipe: React.FC<cell_swipeProps> = (props) => {
  // TODO: port logic from vue version (packages/vue/src/components/cell-swipe)
  return <div className={prefixCls}>{props.children}</div>;
};

export type { cell_swipeProps } from './types';
export default cell_swipe;
