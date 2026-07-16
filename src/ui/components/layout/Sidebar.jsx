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

function navItem(key, icon, label, tourId) {
  return {
    key,
    icon,
    label: <span data-tour={tourId}>{label}</span>,
  };
}

const NAV_BASE = [
  navItem('/dashboard', <DashboardOutlined />, 'Dashboard General', 'nav-dashboard'),
  navItem('/analytics', <BarChartOutlined />, 'Analítica', 'nav-analytics'),
  navItem('/sales', <ShoppingOutlined />, 'Ventas', 'nav-sales'),
  navItem('/clients', <TeamOutlined />, 'Clientes', 'nav-clients'),
  navItem('/finance', <DollarOutlined />, 'Finanzas', 'nav-finance'),
  navItem('/hr', <UserOutlined />, 'Recursos Humanos', 'nav-hr'),
  navItem('/operations', <ClusterOutlined />, 'Operaciones', 'nav-operations'),
  navItem('/kpis', <AimOutlined />, 'KPIs & OKRs', 'nav-kpis'),
  navItem('/reports', <FileTextOutlined />, 'Reportes', 'nav-reports'),
];

const NAV_ADMIN = navItem('/settings', <SettingOutlined />, 'Configuración', 'nav-settings');

export default function Sidebar({ collapsed, onCollapse, onNavigate }) {
  const navigate = useNavigate();
  const location = useLocation();
  const user = userServices.getCurrentUser();
  const isAdmin = user?.role === 'admin';

  const NAV = useMemo(() => (isAdmin ? [...NAV_BASE, NAV_ADMIN] : NAV_BASE), [isAdmin]);

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
      <div className="app-sidebar__brand" data-tour="sidebar-brand" onClick={() => go('/dashboard')}>
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

      <div className="app-sidebar__role" data-tour="sidebar-role">
        <span className={`app-sidebar__role-pill ${isAdmin ? 'is-admin' : 'is-user'}`}>
          {collapsed ? (isAdmin ? 'A' : 'U') : isAdmin ? 'Admin' : 'Usuario'}
        </span>
      </div>

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
