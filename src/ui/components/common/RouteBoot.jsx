import React from 'react';
import { Spin } from 'antd';
import './RouteBoot.css';

export default function RouteBoot() {
  return (
    <div className="route-boot" role="status" aria-label="Cargando">
      <Spin size="large" />
    </div>
  );
}
