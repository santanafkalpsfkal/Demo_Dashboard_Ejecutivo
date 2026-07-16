import React from 'react';
import { Col, Row, Progress, Tag } from 'antd';
import PageHeader from '../components/common/PageHeader';
import KpiCard from '../components/kpi/KpiCard';
import { ChartCard, BarChartWidget, HeatmapWidget } from '../components/charts/ChartWidgets';
import EnterpriseTable, { StatusBadge, RowActions } from '../components/tables/EnterpriseTable';
import { operations, heatmapData } from '../../data/mock/executiveData';
import './module.css';

function riskColor(r) {
  if (r === 'Alto') return 'error';
  if (r === 'Medio') return 'warning';
  return 'success';
}

export default function Operations() {
  const columns = [
    { title: 'Proceso', dataIndex: 'proceso', sorter: (a, b) => a.proceso.localeCompare(b.proceso) },
    {
      title: 'Estado',
      dataIndex: 'estado',
      filters: [
        { text: 'Óptimo', value: 'Óptimo' },
        { text: 'Atención', value: 'Atención' },
        { text: 'Crítico', value: 'Crítico' },
      ],
      onFilter: (v, r) => r.estado === v,
      render: (s) => <StatusBadge status={s} />,
    },
    {
      title: 'Cumplimiento',
      dataIndex: 'cumplimiento',
      sorter: (a, b) => a.cumplimiento - b.cumplimiento,
      render: (v) => <Progress percent={v} size="small" status={v < 85 ? 'exception' : 'normal'} />,
    },
    {
      title: 'Riesgo',
      dataIndex: 'riesgo',
      render: (r) => <Tag color={riskColor(r)}>{r}</Tag>,
    },
    {
      title: 'Capacidad',
      dataIndex: 'capacidad',
      sorter: (a, b) => a.capacidad - b.capacidad,
      render: (v) => `${v}%`,
    },
    { title: 'Acciones', key: 'a', render: () => <RowActions /> },
  ];

  return (
    <div className="module-page" data-tour="page-operations">
      <PageHeader
        title="Operaciones"
        subtitle="Procesos, estado, cumplimiento, riesgos y capacidad instalada."
        breadcrumb={['SCKora', 'Operaciones']}
      />

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <KpiCard title="Cumplimiento" value={91.2} suffix="%" trend={1.4} comparison="procesos" color="#84cc16" icon="CheckCircleOutlined" spark={[85, 86, 87, 88, 89, 90, 91, 91.2]} />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <KpiCard title="Capacidad" value={78} suffix="%" trend={2.2} comparison="utilización" color="#0ea5e9" icon="ProjectOutlined" spark={[70, 72, 73, 74, 75, 76, 77, 78]} />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <KpiCard title="Riesgos altos" value={3} trend={-25} comparison="vs semana" color="#ef4444" icon="FallOutlined" spark={[8, 7, 6, 5, 4, 4, 3, 3]} />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <KpiCard title="SLA" value={96.5} suffix="%" trend={0.9} comparison="cumplimiento" color="#1677ff" icon="TrophyOutlined" spark={[92, 93, 94, 94.5, 95, 95.5, 96, 96.5]} />
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col xs={24} lg={14}>
          <ChartCard title="Cumplimiento por proceso" subtitle="Indicadores operativos">
            <BarChartWidget
              labels={operations.map((o) => o.proceso)}
              datasets={[{ label: 'Cumplimiento %', data: operations.map((o) => o.cumplimiento) }]}
            />
          </ChartCard>
        </Col>
        <Col xs={24} lg={10}>
          <ChartCard title="Carga operativa" subtitle="Heatmap simulado">
            <HeatmapWidget
              data={heatmapData}
              rowLabels={['Ops', 'Log', 'Sup', 'Fac', 'Onb']}
              colLabels={['L', 'M', 'X', 'J', 'V', 'S', 'D']}
            />
          </ChartCard>
        </Col>
      </Row>

      <div style={{ marginTop: 16 }}>
        <EnterpriseTable
          title="Estado de procesos"
          columns={columns}
          dataSource={operations.map((o, i) => ({ ...o, id: `OP-${i}` }))}
          searchPlaceholder="Buscar proceso..."
        />
      </div>
    </div>
  );
}
