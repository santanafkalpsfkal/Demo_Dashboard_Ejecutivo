import React from 'react';
import { Avatar, Card, Col, Descriptions, Row, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import PageHeader from '../components/common/PageHeader';
import KpiCard from '../components/kpi/KpiCard';
import { userServices } from '../../services/userServices';
import { COMPANY } from '../../data/mock/executiveData';
import './module.css';

export default function Profile() {
  const user = userServices.getCurrentUser();

  return (
    <div className="module-page">
      <PageHeader
        title="Mi perfil"
        subtitle="Información del usuario ejecutivo en la plataforma."
        breadcrumb={['SCKora', 'Perfil']}
      />

      <Row gutter={[16, 16]}>
        <Col xs={24} md={8}>
          <Card className="module-panel" bordered={false}>
            <div style={{ textAlign: 'center', padding: '12px 0' }}>
              <Avatar size={88} icon={<UserOutlined />} style={{ background: 'var(--sck-accent)' }} />
              <Typography.Title level={4} style={{ marginTop: 12, marginBottom: 4 }}>
                {user?.name || 'Ejecutivo Demo'}
              </Typography.Title>
              <Typography.Text type="secondary">{user?.email || 'demo@sckorasystems.com'}</Typography.Text>
            </div>
          </Card>
        </Col>
        <Col xs={24} md={16}>
          <Card className="module-panel" bordered={false} title="Detalle">
            <Descriptions column={1} size="middle">
              <Descriptions.Item label="Empresa">{COMPANY.name}</Descriptions.Item>
              <Descriptions.Item label="Producto">{COMPANY.product}</Descriptions.Item>
              <Descriptions.Item label="Rol">{user?.title || (user?.role === 'admin' ? 'Administrador' : 'Usuario')}</Descriptions.Item>
              <Descriptions.Item label="Soporte">{COMPANY.support}</Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <KpiCard title="Sesiones" value={128} trend={4} comparison="este mes" color="#1677ff" icon="UserOutlined" spark={[10, 12, 14, 15, 16, 17, 18, 20]} />
        </Col>
        <Col xs={24} sm={8}>
          <KpiCard title="Reportes vistos" value={46} trend={12} comparison="este mes" color="#10b981" icon="ProjectOutlined" spark={[5, 8, 10, 12, 14, 16, 18, 20]} />
        </Col>
        <Col xs={24} sm={8}>
          <KpiCard title="Alertas atendidas" value={19} trend={-8} comparison="esta semana" color="#f59e0b" icon="CheckCircleOutlined" spark={[12, 11, 10, 9, 8, 8, 7, 6]} />
        </Col>
      </Row>
    </div>
  );
}
