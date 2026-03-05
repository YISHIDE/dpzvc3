import React from 'react';
import type { tabProps } from './types';
import '@dpzvc3/styles/dist/components/tab.css';

const prefixCls = 'dpzvc3-tab';

const tab: React.FC<tabProps> = (props) => {
  // TODO: port logic from vue version (packages/vue/src/components/tab)
  return <div className={prefixCls}>{props.children}</div>;
};

export type { tabProps } from './types';
export default tab;
