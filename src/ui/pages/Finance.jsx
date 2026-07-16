import React from 'react';
import { Col, Row } from 'antd';
import PageHeader from '../components/common/PageHeader';
import KpiCard from '../components/kpi/KpiCard';
import { ChartCard, AreaChartWidget, BarChartWidget, LineChartWidget } from '../components/charts/ChartWidgets';
import { financeFlow } from '../../data/mock/executiveData';
import './module.css';

export default function Finance() {
  return (
    <div className="module-page" data-tour="page-finance">
      <PageHeader
        title="Finanzas"
        subtitle="Ingresos, egresos, utilidad, rentabilidad y flujo de caja."
        breadcrumb={['SCKora', 'Finanzas']}
      />

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <KpiCard title="Ingresos" value={2148000} prefix="$" trend={8.1} comparison="vs mes anterior" color="#10b981" icon="RiseOutlined" spark={[30, 35, 40, 45, 50, 55, 58, 60]} />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <KpiCard title="Egresos" value={986400} prefix="$" trend={-3.2} comparison="vs mes anterior" color="#f59e0b" icon="FallOutlined" spark={[55, 52, 50, 48, 47, 45, 44, 42]} />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <KpiCard title="Utilidad" value={1161600} prefix="$" trend={15.6} comparison="vs mes anterior" color="#6366f1" icon="TrophyOutlined" spark={[20, 25, 30, 35, 40, 45, 50, 55]} />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <KpiCard title="Rentabilidad" value={54.1} suffix="%" trend={1.8} comparison="margen neto" color="#22c55e" icon="PercentageOutlined" spark={[48, 49, 50, 51, 52, 53, 53.5, 54.1]} />
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col xs={24} lg={14}>
          <ChartCard title="Flujo de caja" subtitle="Ingresos vs egresos">
            <AreaChartWidget
              labels={financeFlow.map((f) => f.month)}
              datasets={[
                { label: 'Ingresos', data: financeFlow.map((f) => f.ingresos), fill: true },
                { label: 'Egresos', data: financeFlow.map((f) => f.egresos), fill: true },
              ]}
            />
          </ChartCard>
        </Col>
        <Col xs={24} lg={10}>
          <ChartCard title="Utilidad mensual" subtitle="Comparativo">
            <BarChartWidget
              labels={financeFlow.map((f) => f.month)}
              datasets={[{ label: 'Utilidad', data: financeFlow.map((f) => f.utilidad) }]}
            />
          </ChartCard>
        </Col>
        <Col xs={24}>
          <ChartCard title="Tendencia de rentabilidad" subtitle="Serie ejecutiva">
            <LineChartWidget
              labels={financeFlow.map((f) => f.month)}
              datasets={[
                {
                  label: 'Margen %',
                  data: financeFlow.map((f) => Math.round((f.utilidad / f.ingresos) * 1000) / 10),
                },
              ]}
            />
          </ChartCard>
        </Col>
      </Row>
    </div>
  );
}
