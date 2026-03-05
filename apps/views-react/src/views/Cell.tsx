import React from 'react';
import { Cell } from '@dpzvc3/react';
import './Cell.css';

const ViewCell: React.FC = () => {
  return (
    <div className="Cell">
      <Cell title="标题" value="内容" label="标签" />
      <Cell title="链接" link="/" />
      <Cell title="有遮罩" hasMask>
        <span>右侧内容</span>
      </Cell>
    </div>
  );
};

export default ViewCell;
