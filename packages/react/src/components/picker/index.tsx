import React from 'react';
import type { pickerProps } from './types';
import '@dpzvc3/styles/dist/components/picker.css';

const prefixCls = 'dpzvc3-picker';

const picker: React.FC<pickerProps> = (props) => {
  // TODO: port logic from vue version (packages/vue/src/components/picker)
  return <div className={prefixCls}>{props.children}</div>;
};

export type { pickerProps } from './types';
export default picker;
