import React from 'react';
import type { cardProps } from './types';
import '@dpzvc3/styles/dist/components/card.css';

const prefixCls = 'dpzvc3-card';

const card: React.FC<cardProps> = (props) => {
  // TODO: port logic from vue version (packages/vue/src/components/card)
  return <div className={prefixCls}>{props.children}</div>;
};

export type { cardProps } from './types';
export default card;
