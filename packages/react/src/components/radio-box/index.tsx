import React from 'react';
import type { radio_boxProps } from './types';
import '@dpzvc3/styles/dist/components/radio-box.css';

const prefixCls = 'dpzvc3-radio-box';

const radio_box: React.FC<radio_boxProps> = (props) => {
  // TODO: port logic from vue version (packages/vue/src/components/radio-box)
  return <div className={prefixCls}>{props.children}</div>;
};

export type { radio_boxProps } from './types';
export default radio_box;
