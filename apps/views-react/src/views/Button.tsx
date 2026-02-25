import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@dpzvc3/react';
import type { ButtonProps } from '@dpzvc3/react';
import './Button.css';

const ViewButton: React.FC = () => {
  const [loading, setLoading] = useState<ButtonProps['loading']>(false);
  const navigate = useNavigate();

  const onClick: ButtonProps['onClick'] = () => {
    setLoading(!loading);
  };

  const jump = () => {
    // go back to guide (首页)
    navigate('/');
  };

  return (
    <div className="Button">
      <Button type="primary" onClick={jump}>
        Primary
      </Button>
      <Button type="success" loading={loading} onClick={onClick}>
        Success
      </Button>
      <Button type="warning" loading={loading} onClick={onClick}>
        Warning
      </Button>
      <Button type="danger">Danger</Button>
      <Button type="normal">Normal</Button>
      <Button type="normal" disabled>
        Disabled
      </Button>
    </div>
  );
};

export default ViewButton;
