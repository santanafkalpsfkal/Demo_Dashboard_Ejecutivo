import React from 'react';
import { Col, Row } from 'antd';
import PageHeader from '../components/common/PageHeader';
import {
  ChartCard,
  LineChartWidget,
  BarChartWidget,
  DonutChartWidget,
  RadarChartWidget,
  AreaChartWidget,
  HeatmapWidget,
} from '../components/charts/ChartWidgets';
import {
  monthlyComparative,
  productMix,
  radarPerformance,
  heatmapData,
  areaPerformance,
  dailyRevenue,
} from '../../data/mock/executiveData';
import './module.css';

export default function Analytics() {
  return (
    <div className="module-page">
      <PageHeader
        title="Analítica"
        subtitle="Tendencias, comparativos, rankings y mapas de calor para decisión ejecutiva."
        breadcrumb={['SCKora', 'Analítica']}
      />

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <ChartCard title="Tendencia de ingresos" subtitle="Serie temporal">
            <AreaChartWidget
              labels={dailyRevenue.map((d) => d.day)}
              datasets={[{ label: 'Ingresos', data: dailyRevenue.map((d) => d.ingresos), fill: true }]}
            />
          </ChartCard>
        </Col>
        <Col xs={24} lg={12}>
          <ChartCard title="Ranking por área" subtitle="Score de desempeño">
            <BarChartWidget
              labels={areaPerformance.map((a) => a.area)}
              datasets={[{ label: 'Score', data: areaPerformance.map((a) => a.score) }]}
            />
          </ChartCard>
        </Col>
        <Col xs={24} lg={8}>
          <ChartCard title="Mix de productos" subtitle="Participación">
            <DonutChartWidget
              labels={productMix.map((p) => p.label)}
              values={productMix.map((p) => p.value)}
            />
          </ChartCard>
        </Col>
        <Col xs={24} lg={8}>
          <ChartCard title="Radar de performance" subtitle="Actual vs objetivo">
            <RadarChartWidget
              labels={radarPerformance.labels}
              datasets={radarPerformance.datasets}
            />
          </ChartCard>
        </Col>
        <Col xs={24} lg={8}>
          <ChartCard title="Heatmap de actividad" subtitle="Simulado · días × franjas">
            <HeatmapWidget
              data={heatmapData}
              rowLabels={['Lun', 'Mar', 'Mié', 'Jue', 'Vie']}
              colLabels={['8h', '10h', '12h', '14h', '16h', '18h', '20h']}
            />
          </ChartCard>
        </Col>
        <Col xs={24}>
          <ChartCard title="Comparativo anual" subtitle="Línea de tendencia">
            <LineChartWidget
              labels={monthlyComparative.map((m) => m.month)}
              datasets={[
                { label: 'Actual', data: monthlyComparative.map((m) => m.actual) },
                { label: 'Objetivo', data: monthlyComparative.map((m) => m.objetivo) },
              ]}
            />
          </ChartCard>
        </Col>
      </Row>
    </div>
  );
}
