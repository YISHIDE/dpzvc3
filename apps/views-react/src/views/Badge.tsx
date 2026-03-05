import React from 'react';
import { Badge } from '@dpzvc3/react';
import './Badge.css';

const ViewBadge: React.FC = () => {
  return (
    <div className="Badge">
      <Badge number={10}>
        <div className="item" />
      </Badge>

      <Badge number={100} max={99} dot={false}>
        <div className="item" />
      </Badge>

      <Badge number={100} max={99} dot={true}>
        <div className="item" />
      </Badge>
    </div>
  );
};

export default ViewBadge;
