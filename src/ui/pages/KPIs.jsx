import React from 'react';
import { Col, Row, Progress, Card, Typography } from 'antd';
import PageHeader from '../components/common/PageHeader';
import KpiCard from '../components/kpi/KpiCard';
import { ChartCard, RadarChartWidget } from '../components/charts/ChartWidgets';
import EnterpriseTable, { StatusBadge } from '../components/tables/EnterpriseTable';
import { okrs, kpiSummary } from '../../data/mock/executiveData';
import './module.css';

function semaforo(estado) {
  if (estado === 'Cumplido') return '#10b981';
  if (estado === 'Atención') return '#f59e0b';
  return '#3b82f6';
}

export default function KPIsPage() {
  const columns = [
    { title: 'Clave', dataIndex: 'key', width: 80 },
    { title: 'Objetivo', dataIndex: 'objetivo' },
    {
      title: 'Avance',
      key: 'avance',
      render: (_, r) => {
        const pct = Math.round((r.actual / r.meta) * 100);
        return <Progress percent={Math.min(pct, 100)} size="small" status={pct >= 100 ? 'success' : pct < 85 ? 'exception' : 'active'} />;
      },
    },
    { title: 'Meta', dataIndex: 'meta' },
    { title: 'Actual', dataIndex: 'actual' },
    {
      title: 'Estado',
      dataIndex: 'estado',
      render: (s) => <StatusBadge status={s} />,
    },
  ];

  return (
    <div className="module-page">
      <PageHeader
        title="KPIs & OKRs"
        subtitle="Metas estratégicas, cumplimiento y semáforos ejecutivos."
        breadcrumb={['SCKora', 'KPIs']}
      />

      <Row gutter={[16, 16]}>
        {kpiSummary.slice(0, 4).map((k) => (
          <Col xs={24} sm={12} lg={6} key={k.key}>
            <KpiCard {...k} />
          </Col>
        ))}
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col xs={24} lg={10}>
          <ChartCard title="Balance de objetivos" subtitle="Radar OKR">
            <RadarChartWidget
              labels={okrs.map((o) => o.key)}
              datasets={[
                { label: 'Actual', data: okrs.map((o) => Math.min(100, Math.round((o.actual / o.meta) * 100))) },
                { label: 'Meta', data: okrs.map(() => 100) },
              ]}
            />
          </ChartCard>
        </Col>
        <Col xs={24} lg={14}>
          <Card className="module-panel" bordered={false} title="Semáforos">
            <Row gutter={[12, 12]}>
              {okrs.map((o) => (
                <Col xs={24} sm={12} key={o.key}>
                  <div className="semaforo-card">
                    <span className="semaforo-dot" style={{ background: semaforo(o.estado) }} />
                    <div>
                      <Typography.Text strong>{o.objetivo}</Typography.Text>
                      <div>
                        <Typography.Text type="secondary">
                          {o.actual} / {o.meta} · {o.estado}
                        </Typography.Text>
                      </div>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          </Card>
        </Col>
      </Row>

      <div style={{ marginTop: 16 }}>
        <EnterpriseTable title="Tablero OKR" columns={columns} dataSource={okrs} rowKey="key" searchable={false} />
      </div>
    </div>
  );
}
