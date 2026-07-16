import React from 'react';
import { Table, Input, Space, Tag, Avatar, Button, Tooltip } from 'antd';
import { SearchOutlined, EyeOutlined, EditOutlined, MoreOutlined } from '@ant-design/icons';
import './EnterpriseTable.css';

export default function EnterpriseTable({
  columns,
  dataSource,
  loading,
  searchable = true,
  searchPlaceholder = 'Buscar...',
  onSearch,
  rowKey = 'id',
  pagination = { pageSize: 6, showSizeChanger: true },
  title,
  extra,
}) {
  const [q, setQ] = React.useState('');

  const filtered = React.useMemo(() => {
    if (!searchable || !q) return dataSource;
    const needle = q.toLowerCase();
    return dataSource.filter((row) =>
      Object.values(row).some((v) => String(v ?? '').toLowerCase().includes(needle))
    );
  }, [dataSource, q, searchable]);

  return (
    <div className="enterprise-table">
      <div className="enterprise-table__toolbar">
        <div>
          {title && <h4 className="enterprise-table__title">{title}</h4>}
        </div>
        <Space wrap>
          {searchable && (
            <Input
              allowClear
              prefix={<SearchOutlined />}
              placeholder={searchPlaceholder}
              value={q}
              onChange={(e) => {
                setQ(e.target.value);
                onSearch?.(e.target.value);
              }}
              style={{ width: 220 }}
            />
          )}
          {extra}
        </Space>
      </div>
      <Table
        rowKey={rowKey}
        columns={columns}
        dataSource={filtered}
        loading={loading}
        pagination={pagination}
        scroll={{ x: true }}
        size="middle"
      />
    </div>
  );
}

export function StatusBadge({ status }) {
  const map = {
    Activo: 'success',
    Activa: 'success',
    Excelente: 'success',
    Cumplido: 'success',
    Óptimo: 'success',
    Nuevo: 'processing',
    'En meta': 'processing',
    'En curso': 'processing',
    Atención: 'warning',
    'En riesgo': 'warning',
    Ausencia: 'warning',
    Vacaciones: 'default',
    Inactivo: 'default',
    Crítico: 'error',
  };
  return <Tag color={map[status] || 'default'}>{status}</Tag>;
}

export function PersonCell({ name, avatar, sub }) {
  return (
    <Space>
      <Avatar style={{ background: 'var(--sck-accent)' }}>{avatar || name?.[0]}</Avatar>
      <div>
        <div style={{ fontWeight: 600 }}>{name}</div>
        {sub && <div style={{ fontSize: 12, color: 'var(--sck-text-secondary)' }}>{sub}</div>}
      </div>
    </Space>
  );
}

export function RowActions({ onView, onEdit }) {
  return (
    <Space>
      <Tooltip title="Ver">
        <Button type="text" size="small" icon={<EyeOutlined />} onClick={onView} />
      </Tooltip>
      <Tooltip title="Editar">
        <Button type="text" size="small" icon={<EditOutlined />} onClick={onEdit} />
      </Tooltip>
      <Button type="text" size="small" icon={<MoreOutlined />} />
    </Space>
  );
}
