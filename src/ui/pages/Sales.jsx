import React from 'react';
import { Col, Row, Progress } from 'antd';
import PageHeader from '../components/common/PageHeader';
import KpiCard from '../components/kpi/KpiCard';
import { ChartCard, BarChartWidget, DonutChartWidget } from '../components/charts/ChartWidgets';
import EnterpriseTable, {
  PersonCell,
  StatusBadge,
  RowActions,
} from '../components/tables/EnterpriseTable';
import { topSellers, productMix, monthlyComparative } from '../../data/mock/executiveData';
import './module.css';

export default function Sales() {
  const columns = [
    {
      title: 'Vendedor',
      dataIndex: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (_, r) => <PersonCell name={r.name} avatar={r.avatar} sub={r.region} />,
    },
    {
      title: 'Ventas',
      dataIndex: 'ventas',
      sorter: (a, b) => a.ventas - b.ventas,
      render: (v) => `$${v.toLocaleString('es-CO')}`,
    },
    {
      title: 'Meta',
      dataIndex: 'meta',
      render: (v, r) => (
        <Progress
          percent={Math.min(100, Math.round((r.ventas / v) * 100))}
          size="small"
          status={r.ventas >= v ? 'success' : 'active'}
        />
      ),
    },
    {
      title: 'Estado',
      dataIndex: 'estado',
      filters: [
        { text: 'Excelente', value: 'Excelente' },
        { text: 'En meta', value: 'En meta' },
        { text: 'Atención', value: 'Atención' },
      ],
      onFilter: (value, record) => record.estado === value,
      render: (s) => <StatusBadge status={s} />,
    },
    { title: 'Acciones', key: 'actions', render: () => <RowActions /> },
  ];

  return (
    <div className="module-page" data-tour="page-sales">
      <PageHeader
        title="Ventas"
        subtitle="Facturación, productos, servicios, clientes y top vendedores."
        breadcrumb={['SCKora', 'Ventas']}
      />

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <KpiCard title="Facturación" value={1842500} prefix="$" trend={12.4} comparison="vs mes anterior" color="#1677ff" icon="DollarOutlined" spark={[40, 45, 50, 55, 60, 65, 70, 75]} />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <KpiCard title="Ticket promedio" value={4850} prefix="$" trend={3.1} comparison="vs mes anterior" color="#10b981" icon="RiseOutlined" spark={[20, 22, 24, 26, 28, 30, 32, 34]} />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <KpiCard title="Órdenes" value={380} trend={7.8} comparison="vs mes anterior" color="#8b5cf6" icon="ProjectOutlined" spark={[10, 12, 14, 15, 16, 18, 19, 20]} />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <KpiCard title="Conversión" value={18.7} suffix="%" trend={2.9} comparison="vs mes anterior" color="#ec4899" icon="FunnelPlotOutlined" spark={[12, 13, 14, 15, 16, 17, 18, 18.7]} />
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col xs={24} lg={14}>
          <ChartCard title="Ventas mensuales" subtitle="Pipeline comercial">
            <BarChartWidget
              labels={monthlyComparative.map((m) => m.month)}
              datasets={[{ label: 'Ventas', data: monthlyComparative.map((m) => m.actual) }]}
            />
          </ChartCard>
        </Col>
        <Col xs={24} lg={10}>
          <ChartCard title="Productos y servicios" subtitle="Mix comercial">
            <DonutChartWidget
              labels={productMix.map((p) => p.label)}
              values={productMix.map((p) => p.value)}
            />
          </ChartCard>
        </Col>
      </Row>

      <div style={{ marginTop: 16 }}>
        <EnterpriseTable
          title="Top vendedores"
          columns={columns}
          dataSource={topSellers}
          searchPlaceholder="Buscar vendedor o región..."
        />
      </div>
    </div>
  );
}
