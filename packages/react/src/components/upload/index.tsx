import React from 'react';
import type { uploadProps } from './types';
import '@dpzvc3/styles/dist/components/upload.css';

const prefixCls = 'dpzvc3-upload';

const upload: React.FC<uploadProps> = (props) => {
  // TODO: port logic from vue version (packages/vue/src/components/upload)
  return <div className={prefixCls}>{props.children}</div>;
};

export type { uploadProps } from './types';
export default upload;
