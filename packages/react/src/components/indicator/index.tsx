import React from 'react';
import type { indicatorProps } from './types';
import '@dpzvc3/styles/dist/components/indicator.css';

const prefixCls = 'dpzvc3-indicator';

const indicator: React.FC<indicatorProps> = (props) => {
  // TODO: port logic from vue version (packages/vue/src/components/indicator)
  return <div className={prefixCls}>{props.children}</div>;
};

export type { indicatorProps } from './types';
export default indicator;
