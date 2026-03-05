import React from 'react';
import { Badge } from '@dpzvc3/react';
import '@dpzvc3/styles/dist/components/badge.css';

export default {
  title: 'Badge',
  component: Badge,
};

export const Basic = () => (
  <div style={{ display: 'flex', gap: 20 }}>
    <Badge number={10}>
      <div style={{ width: 45, height: 45, backgroundColor: 'red' }} />
    </Badge>
    <Badge number={100} max={99} dot={false}>
      <div style={{ width: 45, height: 45, backgroundColor: 'red' }} />
    </Badge>
    <Badge number={100} max={99} dot>
      <div style={{ width: 45, height: 45, backgroundColor: 'red' }} />
    </Badge>
  </div>
);
