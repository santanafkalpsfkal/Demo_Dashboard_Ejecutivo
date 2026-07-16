import React, { useEffect, useState } from 'react';
import { Col, Row, Card, List, Tag, Typography, Skeleton } from 'antd';
import {
  WarningOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons';
import PageHeader from '../components/common/PageHeader';
import KpiCard from '../components/kpi/KpiCard';
import {
  ChartCard,
  LineChartWidget,
  BarChartWidget,
  DonutChartWidget,
} from '../components/charts/ChartWidgets';
import {
  kpiSummary,
  dailyRevenue,
  monthlyComparative,
  alerts,
  salesByChannel,
} from '../../data/mock/executiveData';
import './module.css';

const alertIcon = {
  warning: <WarningOutlined style={{ color: '#f59e0b' }} />,
  success: <CheckCircleOutlined style={{ color: '#10b981' }} />,
  error: <CloseCircleOutlined style={{ color: '#ef4444' }} />,
  info: <InfoCircleOutlined style={{ color: '#3b82f6' }} />,
};

export default function Dashboard() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(t);
  }, []);

  if (loading) {
    return (
      <div>
        <Skeleton active paragraph={{ rows: 1 }} />
        <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
          {Array.from({ length: 8 }).map((_, i) => (
            <Col xs={24} sm={12} lg={6} key={i}>
              <Card><Skeleton active /></Card>
            </Col>
          ))}
        </Row>
      </div>
    );
  }

  return (
    <div className="module-page">
      <PageHeader
        title="Dashboard General"
        subtitle="Visión ejecutiva de indicadores, alertas y desempeño en tiempo real."
        breadcrumb={['SCKora', 'Dashboard']}
      />

      <Row gutter={[16, 16]}>
        {kpiSummary.map((kpi) => (
          <Col xs={24} sm={12} lg={8} xl={6} key={kpi.key}>
            <KpiCard {...kpi} />
          </Col>
        ))}
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col xs={24} lg={16}>
          <ChartCard title="Ingresos diarios" subtitle="Últimos 30 días">
            <LineChartWidget
              labels={dailyRevenue.map((d) => d.day)}
              datasets={[
                { label: 'Ingresos', data: dailyRevenue.map((d) => d.ingresos) },
                { label: 'Costos', data: dailyRevenue.map((d) => d.costos) },
              ]}
            />
          </ChartCard>
        </Col>
        <Col xs={24} lg={8}>
          <Card className="module-panel" bordered={false} title="Alertas ejecutivas">
            <List
              dataSource={alerts}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={alertIcon[item.type]}
                    title={item.title}
                    description={
                      <span>
                        {item.detail}
                        <br />
                        <Typography.Text type="secondary" style={{ fontSize: 11 }}>
                          {item.time}
                        </Typography.Text>
                      </span>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col xs={24} lg={14}>
          <ChartCard title="Comparativo mensual" subtitle="Actual vs anterior vs objetivo">
            <BarChartWidget
              labels={monthlyComparative.map((m) => m.month)}
              datasets={[
                { label: 'Actual', data: monthlyComparative.map((m) => m.actual) },
                { label: 'Anterior', data: monthlyComparative.map((m) => m.anterior) },
                { label: 'Objetivo', data: monthlyComparative.map((m) => m.objetivo) },
              ]}
            />
          </ChartCard>
        </Col>
        <Col xs={24} lg={10}>
          <ChartCard title="Canales de venta" subtitle="Distribución del mes">
            <DonutChartWidget
              labels={salesByChannel.map((s) => s.label)}
              values={salesByChannel.map((s) => s.value)}
            />
          </ChartCard>
        </Col>
      </Row>
    </div>
  );
}
