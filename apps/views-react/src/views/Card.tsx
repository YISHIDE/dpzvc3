import React from 'react';
import { Card } from '@dpzvc3/react';
import './Card.css';

const ViewCard: React.FC = () => {
  return (
    <div className="Card">
      <Card
        width="90%"
        header={<div style={{ fontWeight: 700 }}>卡片头部</div>}
        footer={<div style={{ textAlign: 'center' }}>底部信息</div>}
      >
        <div>
          这是卡片内容，可以放任意 React 节点。
          <br />
          使用 props 控制宽度、头部和底部。
        </div>
      </Card>
    </div>
  );
};

export default ViewCard;
