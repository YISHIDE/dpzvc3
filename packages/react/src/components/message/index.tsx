import React from 'react';
import type { messageProps } from './types';
import '@dpzvc3/styles/dist/components/message.css';

const prefixCls = 'dpzvc3-message';

const message: React.FC<messageProps> = (props) => {
  // TODO: port logic from vue version (packages/vue/src/components/message)
  return <div className={prefixCls}>{props.children}</div>;
};

export type { messageProps } from './types';
export default message;
