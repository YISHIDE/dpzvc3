import React from 'react';
import { Header } from '@dpzvc3/react';
import './Header.css';

const ViewHeader: React.FC = () => {
  return (
    <Header title="示例标题" fixed>
      {{
        left: <span style={{ color: 'white' }}>左</span>,
        right: <span style={{ color: 'white' }}>右</span>,
      }}
    </Header>
  );
};

export default ViewHeader;
