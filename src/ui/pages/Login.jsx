import React, { useState } from 'react';
import { Form, Input, Button, Typography, Alert, Tag } from 'antd';
import {
  UserOutlined,
  LockOutlined,
  SafetyCertificateOutlined,
  TeamOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { userServices } from '../../services/userServices';
import { COMPANY } from '../../data/mock/executiveData';
import { DEMO_ACCOUNTS } from '../../data/demoAccounts';
import { toast } from 'react-toastify';
import logo from '../../assets/Logo_SCKora_Red_Socia.png';
import icon from '../../assets/Icon_SCKora.png';
import { Watermark } from '../components/layout/AppFooter';
import './Login.css';

const { Title, Text, Paragraph } = Typography;

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onLogin = async (values) => {
    setError(null);
    setLoading(true);
    try {
      const result = await userServices.login(values.email, values.password);
      if (result?.success && result?.user) {
        toast.success(`Bienvenido, ${result.user.name}`);
        setTimeout(() => {
          setLoading(false);
          navigate('/dashboard', { replace: true });
        }, 400);
        return;
      }
      const msg = result?.error || result?.message || 'Credenciales incorrectas';
      setError(msg);
      toast.error(msg);
      setLoading(false);
    } catch (err) {
      const msg = err.message || 'No se pudo iniciar sesión';
      setError(msg);
      toast.error(msg);
      setLoading(false);
    }
  };

  const fillAccount = (account) => {
    form.setFieldsValue({ email: account.email, password: account.password });
    setError(null);
  };

  return (
    <div className="login-page">
      <div className="login-page__shell">
        <aside className="login-page__hero">
          <div className="login-page__hero-glow" aria-hidden />
          <div className="login-page__hero-content" data-tour="login-brand">
            <img src={logo} alt="SCKora Systems" className="login-page__logo" />
            <Tag className="login-page__badge" icon={<SafetyCertificateOutlined />}>
              Demo corporativa
            </Tag>
            <Title level={1} className="login-page__product">
              {COMPANY.product}
            </Title>
            <Text className="login-page__by">by SCKora Systems</Text>
            <Paragraph className="login-page__sub">{COMPANY.subtitle}</Paragraph>

            <ul className="login-page__features">
              <li>
                <CheckCircleOutlined /> KPIs y métricas en tiempo real
              </li>
              <li>
                <CheckCircleOutlined /> Analítica ejecutiva multi-módulo
              </li>
              <li>
                <CheckCircleOutlined /> Reportes PDF / Excel simulados
              </li>
            </ul>
          </div>
          <Text className="login-page__hero-foot">© {new Date().getFullYear()} SCKora Systems</Text>
        </aside>

        <main className="login-page__main">
          <div className="login-page__form-wrap">
            <div className="login-page__form-brand">
              <img src={icon} alt="" className="login-page__icon" />
              <div>
                <Title level={3} className="login-page__form-title">
                  Iniciar sesión
                </Title>
                <Text type="secondary">Acceso seguro al panel ejecutivo</Text>
              </div>
            </div>

            {error && (
              <Alert
                className="login-page__alert"
                type="error"
                showIcon
                message={error}
                closable
                onClose={() => setError(null)}
              />
            )}

            <div data-tour="login-form">
              <Form
                form={form}
                layout="vertical"
                onFinish={onLogin}
                requiredMark={false}
                className="login-page__form"
              >
                <Form.Item
                  name="email"
                  label="Correo corporativo"
                  rules={[
                    { required: true, message: 'Ingresa tu correo' },
                    { type: 'email', message: 'Correo inválido' },
                  ]}
                >
                  <Input
                    size="large"
                    prefix={<UserOutlined />}
                    placeholder="admin@sckorasystems.com"
                    autoComplete="username"
                  />
                </Form.Item>
                <Form.Item
                  name="password"
                  label="Contraseña"
                  rules={[{ required: true, message: 'Ingresa tu contraseña' }]}
                >
                  <Input.Password
                    size="large"
                    prefix={<LockOutlined />}
                    placeholder="••••••••"
                    autoComplete="current-password"
                  />
                </Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  block
                  loading={loading}
                  className="login-page__submit"
                >
                  Entrar al dashboard
                </Button>
              </Form>
            </div>

            <div className="login-page__demos">
              <Text className="login-page__demos-label">Cuentas de demostración</Text>
              <div className="login-page__demo-grid">
                {DEMO_ACCOUNTS.map((account) => (
                  <button
                    key={account.id}
                    type="button"
                    data-tour={account.role === 'admin' ? 'demo-admin' : 'demo-user'}
                    className={`login-page__demo-card login-page__demo-card--${account.role}`}
                    onClick={() => fillAccount(account)}
                  >
                    <div className="login-page__demo-top">
                      <span className="login-page__demo-icon">
                        {account.role === 'admin' ? <SafetyCertificateOutlined /> : <TeamOutlined />}
                      </span>
                      <Tag color={account.role === 'admin' ? 'blue' : 'default'}>{account.title}</Tag>
                    </div>
                    <strong>{account.name}</strong>
                    <span className="login-page__demo-email">{account.email}</span>
                    <span className="login-page__demo-pass">Pass: {account.password}</span>
                    <em>{account.description}</em>
                  </button>
                ))}
              </div>
              <Text type="secondary" className="login-page__demos-hint">
                Haz clic en una cuenta para autocompletar el formulario.
              </Text>
            </div>
          </div>
        </main>
      </div>
      <Watermark />
    </div>
  );
}
