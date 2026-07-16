import React from 'react';
import { Typography } from 'antd';
import { COMPANY } from '../../../data/mock/executiveData';
import './AppFooter.css';

export default function AppFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="app-footer-exec">
      <Typography.Text className="app-footer-exec__text">
        © {year} {COMPANY.product} · Desarrollado por SCKora Systems
      </Typography.Text>
      <Typography.Text className="app-footer-exec__sub">
        {COMPANY.subtitle}
      </Typography.Text>
    </footer>
  );
}

export function Watermark() {
  return (
    <div className="sck-watermark" aria-hidden>
      Developed by SCKora Systems
    </div>
  );
}
