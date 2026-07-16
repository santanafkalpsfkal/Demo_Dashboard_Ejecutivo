import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Card, Col, Form, Input, Row, Select, Switch, Typography, Button, message, Radio, Space, Alert } from 'antd';
import PageHeader from '../components/common/PageHeader';
import { useTheme } from '../../theme/ThemeContext';
import { COMPANY } from '../../data/mock/executiveData';
import { userServices } from '../../services/userServices';
import { useVirtualitoStore } from '../components/virtualito/virtualitoStore';
import './module.css';

export default function Settings() {
  const { themeId, themes, setTheme } = useTheme();
  const user = userServices.getCurrentUser();
  const isAdmin = user?.role === 'admin';

  const [prefs, setPrefs] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('sckora-prefs') || '{}');
    } catch {
      return {};
    }
  });

  useEffect(() => {
    document.title = 'Configuración | Dashboard Ejecutivo';
  }, []);

  if (!isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  const savePrefs = (next) => {
    setPrefs(next);
    localStorage.setItem('sckora-prefs', JSON.stringify(next));
    message.success('Preferencias guardadas');
  };

  return (
    <div className="module-page" data-tour="page-settings">
      <PageHeader
        title="Configuración"
        subtitle="Empresa, perfil, tema, idioma y preferencias de la plataforma."
        breadcrumb={['SCKora', 'Configuración']}
      />

      <Alert
        type="info"
        showIcon
        style={{ marginBottom: 16 }}
        message="Panel exclusivo de administrador"
        description="Los cambios de tema y empresa afectan la experiencia demo de SCKora Systems."
      />

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <Card className="module-panel" bordered={false} title="Empresa" data-tour="settings-company">
            <Form layout="vertical" initialValues={{ company: COMPANY.name, product: COMPANY.product, email: COMPANY.email }}>
              <Form.Item label="Empresa" name="company">
                <Input />
              </Form.Item>
              <Form.Item label="Producto" name="product">
                <Input />
              </Form.Item>
              <Form.Item label="Contacto" name="email">
                <Input />
              </Form.Item>
              <Button
                type="primary"
                onClick={() => {
                  message.success('Datos de empresa actualizados (demo)');
                  useVirtualitoStore.getState().advise('guardar');
                }}
              >
                Guardar empresa
              </Button>
            </Form>
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card className="module-panel" bordered={false} title="Perfil administrador">
            <Form layout="vertical" initialValues={{ name: user?.name || 'Administrador', email: user?.email || 'admin@sckorasystems.com' }}>
              <Form.Item label="Nombre" name="name">
                <Input />
              </Form.Item>
              <Form.Item label="Correo" name="email">
                <Input />
              </Form.Item>
              <Button onClick={() => message.success('Perfil actualizado (demo)')}>Guardar perfil</Button>
            </Form>
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card className="module-panel" bordered={false} title="Tema visual" data-tour="settings-themes">
            <Typography.Paragraph type="secondary">
              Cuatro temas corporativos SCKora. Cada uno aplica tipografía Google Fonts coherente.
            </Typography.Paragraph>
            <Radio.Group value={themeId} onChange={(e) => setTheme(e.target.value)} style={{ width: '100%' }}>
              <Space direction="vertical" style={{ width: '100%' }}>
                {Object.values(themes).map((t) => (
                  <div key={t.id} data-tour={`theme-${t.id}`}>
                    <Radio.Button value={t.id} style={{ width: '100%', height: 'auto', padding: '10px 14px' }}>
                      <strong>{t.name}</strong>
                      <div style={{ fontSize: 12, opacity: 0.75 }}>{t.fontFamily.replace(/'/g, '').split(',')[0]}</div>
                    </Radio.Button>
                  </div>
                ))}
              </Space>
            </Radio.Group>
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card className="module-panel" bordered={false} title="Idioma y preferencias" data-tour="settings-prefs">
            <Form
              layout="vertical"
              initialValues={{
                lang: prefs.lang || 'es',
                dense: !!prefs.dense,
                alerts: prefs.alerts !== false,
              }}
              onFinish={(values) => savePrefs({ ...prefs, ...values })}
            >
              <Form.Item label="Idioma" name="lang">
                <Select
                  options={[
                    { value: 'es', label: 'Español' },
                    { value: 'en', label: 'English' },
                  ]}
                />
              </Form.Item>
              <Form.Item label="Densidad compacta" name="dense" valuePropName="checked">
                <Switch />
              </Form.Item>
              <Form.Item label="Alertas en tiempo real" name="alerts" valuePropName="checked">
                <Switch />
              </Form.Item>
              <Button type="primary" htmlType="submit">
                Guardar preferencias
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
