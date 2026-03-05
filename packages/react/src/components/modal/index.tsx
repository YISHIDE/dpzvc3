import React from 'react';
import type { modalProps } from './types';
import '@dpzvc3/styles/dist/components/modal.css';

const prefixCls = 'dpzvc3-modal';

const modal: React.FC<modalProps> = (props) => {
  // TODO: port logic from vue version (packages/vue/src/components/modal)
  return <div className={prefixCls}>{props.children}</div>;
};

export type { modalProps } from './types';
export default modal;
