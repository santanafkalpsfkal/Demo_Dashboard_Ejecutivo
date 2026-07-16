import React from 'react';
import { Typography, Breadcrumb, Space } from 'antd';
import './PageHeader.css';

export default function PageHeader({ title, subtitle, breadcrumb = [], extra }) {
  return (
    <div className="page-header fade-in">
      <div>
        {breadcrumb.length > 0 && (
          <Breadcrumb
            className="page-header__crumbs"
            items={breadcrumb.map((b) => ({ title: b }))}
          />
        )}
        <Typography.Title level={3} className="page-header__title">
          {title}
        </Typography.Title>
        {subtitle && (
          <Typography.Text type="secondary" className="page-header__sub">
            {subtitle}
          </Typography.Text>
        )}
      </div>
      {extra && <Space wrap>{extra}</Space>}
    </div>
  );
}
