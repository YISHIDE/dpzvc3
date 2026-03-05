import React from 'react';
import type { check_boxProps } from './types';
import '@dpzvc3/styles/dist/components/check-box.css';

const prefixCls = 'dpzvc3-check-box';

const check_box: React.FC<check_boxProps> = (props) => {
  // TODO: port logic from vue version (packages/vue/src/components/check-box)
  return <div className={prefixCls}>{props.children}</div>;
};

export type { check_boxProps } from './types';
export default check_box;
