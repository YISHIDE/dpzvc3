import React from 'react';
import type { load_moreProps } from './types';
import '@dpzvc3/styles/dist/components/load-more.css';

const prefixCls = 'dpzvc3-load-more';

const load_more: React.FC<load_moreProps> = (props) => {
  // TODO: port logic from vue version (packages/vue/src/components/load-more)
  return <div className={prefixCls}>{props.children}</div>;
};

export type { load_moreProps } from './types';
export default load_more;
