import React from 'react';
import type { progressProps } from './types';
import '@dpzvc3/styles/dist/components/progress.css';

const prefixCls = 'dpzvc3-progress';

const progress: React.FC<progressProps> = (props) => {
  // TODO: port logic from vue version (packages/vue/src/components/progress)
  return <div className={prefixCls}>{props.children}</div>;
};

export type { progressProps } from './types';
export default progress;
