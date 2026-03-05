import React from 'react';
import type { dp_numberProps } from './types';
import '@dpzvc3/styles/dist/components/dp-number.css';

const prefixCls = 'dpzvc3-dp-number';

const dp_number: React.FC<dp_numberProps> = (props) => {
  // TODO: port logic from vue version (packages/vue/src/components/dp-number)
  return <div className={prefixCls}>{props.children}</div>;
};

export type { dp_numberProps } from './types';
export default dp_number;
