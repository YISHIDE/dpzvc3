import React from 'react';
import type { raterProps } from './types';
import '@dpzvc3/styles/dist/components/rater.css';

const prefixCls = 'dpzvc3-rater';

const rater: React.FC<raterProps> = (props) => {
  // TODO: port logic from vue version (packages/vue/src/components/rater)
  return <div className={prefixCls}>{props.children}</div>;
};

export type { raterProps } from './types';
export default rater;
