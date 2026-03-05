import React from 'react';
import type { dp_headerProps } from './types';
import '@dpzvc3/styles/dist/components/dp-header.css';

const prefixCls = 'dpzvc3-dp-header';

const dp_header: React.FC<dp_headerProps> = (props) => {
  // TODO: port logic from vue version (packages/vue/src/components/dp-header)
  return <div className={prefixCls}>{props.children}</div>;
};

export type { dp_headerProps } from './types';
export default dp_header;
