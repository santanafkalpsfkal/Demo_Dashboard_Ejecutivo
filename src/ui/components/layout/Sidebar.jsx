import React, { useMemo } from 'react';
import { Layout, Menu, Typography, Button, Tooltip } from 'antd';
import {
  DashboardOutlined,
  BarChartOutlined,
  ShoppingOutlined,
  TeamOutlined,
  DollarOutlined,
  UserOutlined,
  ClusterOutlined,
  AimOutlined,
  FileTextOutlined,
  SettingOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';
import { userServices } from '../../../services/userServices';
import logo from '../../../assets/Logo_SCKora_Red_Socia.png';
import icon from '../../../assets/Icon_SCKora.png';
import './Sidebar.css';

const { Sider } = Layout;

const NAV_BASE = [
  { key: '/dashboard', icon: <DashboardOutlined />, label: 'Dashboard General' },
  { key: '/analytics', icon: <BarChartOutlined />, label: 'Analítica' },
  { key: '/sales', icon: <ShoppingOutlined />, label: 'Ventas' },
  { key: '/clients', icon: <TeamOutlined />, label: 'Clientes' },
  { key: '/finance', icon: <DollarOutlined />, label: 'Finanzas' },
  { key: '/hr', icon: <UserOutlined />, label: 'Recursos Humanos' },
  { key: '/operations', icon: <ClusterOutlined />, label: 'Operaciones' },
  { key: '/kpis', icon: <AimOutlined />, label: 'KPIs & OKRs' },
  { key: '/reports', icon: <FileTextOutlined />, label: 'Reportes' },
];

const NAV_ADMIN = { key: '/settings', icon: <SettingOutlined />, label: 'Configuración' };

export default function Sidebar({ collapsed, onCollapse, onNavigate }) {
  const navigate = useNavigate();
  const location = useLocation();
  const user = userServices.getCurrentUser();
  const isAdmin = user?.role === 'admin';

  const NAV = useMemo(
    () => (isAdmin ? [...NAV_BASE, NAV_ADMIN] : NAV_BASE),
    [isAdmin]
  );

  const selected = useMemo(() => {
    const match = NAV.find((n) => location.pathname.startsWith(n.key));
    return [match?.key || '/dashboard'];
  }, [location.pathname, NAV]);

  const go = (path) => {
    navigate(path);
    onNavigate?.();
  };

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      trigger={null}
      width={260}
      className="app-sidebar"
      breakpoint="lg"
      onBreakpoint={(broken) => onCollapse?.(broken)}
    >
      <div className="app-sidebar__brand" onClick={() => go('/dashboard')}>
        <img src={collapsed ? icon : logo} alt="SCKora Systems" className="app-sidebar__logo" />
        {!collapsed && (
          <div className="app-sidebar__brand-text">
            <Typography.Text className="app-sidebar__product">Dashboard Ejecutivo</Typography.Text>
            <Typography.Text className="app-sidebar__by">by SCKora Systems</Typography.Text>
          </div>
        )}
      </div>

      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={selected}
        items={NAV}
        onClick={({ key }) => go(key)}
        className="app-sidebar__menu"
      />

      {!collapsed && (
        <div className="app-sidebar__role">
          <span className={`app-sidebar__role-pill ${isAdmin ? 'is-admin' : 'is-user'}`}>
            {isAdmin ? 'Admin' : 'Usuario'}
          </span>
        </div>
      )}

      <div className="app-sidebar__footer">
        <Tooltip title={collapsed ? 'Expandir' : 'Colapsar'} placement="right">
          <Button
            type="text"
            className="app-sidebar__collapse"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => onCollapse?.(!collapsed)}
          />
        </Tooltip>
      </div>
    </Sider>
  );
}

export { NAV_BASE };
