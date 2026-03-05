import React from 'react';
import type { promptProps } from './types';
import '@dpzvc3/styles/dist/components/prompt.css';

const prefixCls = 'dpzvc3-prompt';

const prompt: React.FC<promptProps> = (props) => {
  // TODO: port logic from vue version (packages/vue/src/components/prompt)
  return <div className={prefixCls}>{props.children}</div>;
};

export type { promptProps } from './types';
export default prompt;
