import React from 'react';
import { Card } from '../components/card';

export default {
  title: 'Components/Card',
  component: Card,
};

export const Basic = () => (
  <Card
    width="260px"
    header={<div style={{ fontWeight: 700 }}>Header</div>}
    footer={<div style={{ textAlign: 'center' }}>Footer</div>}
  >
    Content inside card.
  </Card>
);
