import React from 'react';
import { Typography } from 'antd';
import { COMPANY } from '../../../data/mock/executiveData';
import './Footer.css';

/** Footer legacy — preferir AppFooter en el shell ejecutivo */
export default function Footer() {
  return (
    <footer className="app-footer-exec" style={{ padding: 16, textAlign: 'center' }}>
      <Typography.Text>
        Desarrollado por SCKora Systems · {COMPANY.product}
      </Typography.Text>
    </footer>
  );
}
