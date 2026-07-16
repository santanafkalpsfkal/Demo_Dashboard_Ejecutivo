import React from 'react';
import { Col, Row, Progress } from 'antd';
import PageHeader from '../components/common/PageHeader';
import KpiCard from '../components/kpi/KpiCard';
import { ChartCard, RadarChartWidget, BarChartWidget } from '../components/charts/ChartWidgets';
import EnterpriseTable, { PersonCell, StatusBadge, RowActions } from '../components/tables/EnterpriseTable';
import { employees } from '../../data/mock/executiveData';
import './module.css';

export default function HR() {
  const columns = [
    {
      title: 'Empleado',
      dataIndex: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (_, r) => <PersonCell name={r.name} avatar={r.name.split(' ').map((p) => p[0]).join('').slice(0, 2)} sub={r.area} />,
    },
    {
      title: 'Asistencia',
      dataIndex: 'asistencia',
      sorter: (a, b) => a.asistencia - b.asistencia,
      render: (v) => <Progress percent={v} size="small" status={v < 90 ? 'exception' : 'normal'} />,
    },
    {
      title: 'Productividad',
      dataIndex: 'productividad',
      sorter: (a, b) => a.productividad - b.productividad,
      render: (v) => `${v}%`,
    },
    {
      title: 'Vacaciones',
      dataIndex: 'vacaciones',
      render: (v) => `${v} días`,
    },
    {
      title: 'Estado',
      dataIndex: 'estado',
      filters: [
        { text: 'Activo', value: 'Activo' },
        { text: 'Vacaciones', value: 'Vacaciones' },
        { text: 'Ausencia', value: 'Ausencia' },
      ],
      onFilter: (v, r) => r.estado === v,
      render: (s) => <StatusBadge status={s} />,
    },
    { title: 'Acciones', key: 'a', render: () => <RowActions /> },
  ];

  return (
    <div className="module-page" data-tour="page-hr">
      <PageHeader
        title="Recursos Humanos"
        subtitle="Empleados, asistencia, productividad, vacaciones y ausencias."
        breadcrumb={['SCKora', 'RRHH']}
      />

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <KpiCard title="Empleados" value={186} trend={2.1} comparison="headcount" color="#14b8a6" icon="UserOutlined" spark={[170, 172, 175, 178, 180, 182, 184, 186]} />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <KpiCard title="Asistencia" value={94.8} suffix="%" trend={0.8} comparison="promedio" color="#1677ff" icon="CheckCircleOutlined" spark={[90, 91, 92, 93, 93.5, 94, 94.5, 94.8]} />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <KpiCard title="Productividad" value={89.2} suffix="%" trend={3.4} comparison="índice" color="#8b5cf6" icon="RiseOutlined" spark={[80, 82, 84, 85, 86, 87, 88, 89]} />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <KpiCard title="Ausencias" value={7} trend={-12} comparison="esta semana" color="#ef4444" icon="FallOutlined" spark={[14, 12, 11, 10, 9, 8, 8, 7]} />
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col xs={24} lg={12}>
          <ChartCard title="Indicadores de talento" subtitle="Radar RRHH">
            <RadarChartWidget
              labels={['Asistencia', 'Productividad', 'Clima', 'Rotación*', 'Capacitación', 'Engagement']}
              datasets={[
                { label: 'Actual', data: [95, 89, 82, 78, 74, 86] },
                { label: 'Meta', data: [96, 90, 85, 85, 80, 88] },
              ]}
            />
          </ChartCard>
        </Col>
        <Col xs={24} lg={12}>
          <ChartCard title="Productividad por área" subtitle="Índice relativo">
            <BarChartWidget
              labels={['Ventas', 'Ops', 'Finanzas', 'TI', 'RRHH', 'Producto']}
              datasets={[{ label: 'Score', data: [94, 88, 96, 91, 90, 82] }]}
            />
          </ChartCard>
        </Col>
      </Row>

      <div style={{ marginTop: 16 }}>
        <EnterpriseTable
          title="Directorio de empleados"
          columns={columns}
          dataSource={employees}
          searchPlaceholder="Buscar empleado o área..."
        />
      </div>
    </div>
  );
}
