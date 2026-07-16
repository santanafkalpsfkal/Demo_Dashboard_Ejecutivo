import React from 'react';
import { Col, Row, Tag } from 'antd';
import PageHeader from '../components/common/PageHeader';
import KpiCard from '../components/kpi/KpiCard';
import { ChartCard, BarChartWidget } from '../components/charts/ChartWidgets';
import EnterpriseTable, { StatusBadge, RowActions } from '../components/tables/EnterpriseTable';
import { clientsTable, monthlyComparative } from '../../data/mock/executiveData';
import './module.css';

export default function Clients() {
  const columns = [
    { title: 'ID', dataIndex: 'id', width: 100 },
    {
      title: 'Cliente',
      dataIndex: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Segmento',
      dataIndex: 'segment',
      filters: [
        { text: 'Enterprise', value: 'Enterprise' },
        { text: 'Mid-Market', value: 'Mid-Market' },
        { text: 'SMB', value: 'SMB' },
      ],
      onFilter: (v, r) => r.segment === v,
      render: (s) => (
        <Tag color={s === 'Enterprise' ? 'blue' : s === 'Mid-Market' ? 'geekblue' : 'default'}>{s}</Tag>
      ),
    },
    {
      title: 'Valor',
      dataIndex: 'valor',
      sorter: (a, b) => a.valor - b.valor,
      render: (v) => `$${v.toLocaleString('es-CO')}`,
    },
    {
      title: 'Retención',
      dataIndex: 'retencion',
      sorter: (a, b) => a.retencion - b.retencion,
      render: (v) => `${v}%`,
    },
    {
      title: 'Estado',
      dataIndex: 'estado',
      filters: [
        { text: 'Activo', value: 'Activo' },
        { text: 'Nuevo', value: 'Nuevo' },
        { text: 'En riesgo', value: 'En riesgo' },
        { text: 'Inactivo', value: 'Inactivo' },
      ],
      onFilter: (v, r) => r.estado === v,
      render: (s) => <StatusBadge status={s} />,
    },
    { title: 'Desde', dataIndex: 'desde' },
    { title: 'Acciones', key: 'a', render: () => <RowActions /> },
  ];

  return (
    <div className="module-page">
      <PageHeader
        title="Clientes"
        subtitle="Altas, retención, segmentación y valor promedio del portafolio."
        breadcrumb={['SCKora', 'Clientes']}
      />

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <KpiCard title="Clientes nuevos" value={42} trend={9.5} comparison="este mes" color="#0ea5e9" icon="TeamOutlined" spark={[20, 22, 25, 28, 30, 34, 38, 42]} />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <KpiCard title="Clientes activos" value={1186} trend={4.2} comparison="vs mes anterior" color="#10b981" icon="CheckCircleOutlined" spark={[100, 105, 110, 112, 115, 116, 117, 118]} />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <KpiCard title="Retención" value={91.4} suffix="%" trend={1.6} comparison="vs trimestre" color="#6366f1" icon="SmileOutlined" spark={[85, 86, 87, 88, 89, 90, 91, 91.4]} />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <KpiCard title="Valor promedio" value={142500} prefix="$" trend={5.1} comparison="ARPU" color="#f59e0b" icon="DollarOutlined" spark={[10, 11, 12, 12.5, 13, 13.5, 14, 14.2]} />
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col xs={24}>
          <ChartCard title="Historial de adquisición" subtitle="Clientes acumulados (proxy mensual)">
            <BarChartWidget
              labels={monthlyComparative.map((m) => m.month)}
              datasets={[
                {
                  label: 'Altas netas',
                  data: monthlyComparative.map((_, i) => 20 + i * 2 + (i % 3) * 4),
                },
              ]}
            />
          </ChartCard>
        </Col>
      </Row>

      <div style={{ marginTop: 16 }}>
        <EnterpriseTable
          title="Portafolio de clientes"
          columns={columns}
          dataSource={clientsTable}
          searchPlaceholder="Buscar cliente, ID o segmento..."
        />
      </div>
    </div>
  );
}
