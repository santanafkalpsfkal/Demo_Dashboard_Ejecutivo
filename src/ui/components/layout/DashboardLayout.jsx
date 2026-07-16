import React, { useEffect, useState } from 'react';
import { Layout, Drawer, Grid } from 'antd';
import { useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import AppHeader from './AppHeader';
import AppFooter, { Watermark } from './AppFooter';
import { VirtualitoSlot, useVirtualito } from '../../../core/virtualito/VirtualitoContext';
import './DashboardLayout.css';

const { Content } = Layout;
const { useBreakpoint } = Grid;

export default function DashboardLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const screens = useBreakpoint();
  const isMobile = !screens.lg;
  const location = useLocation();
  const { setContextPage } = useVirtualito();

  useEffect(() => {
    setContextPage({ path: location.pathname, title: document.title });
  }, [location.pathname, setContextPage]);

  useEffect(() => {
    if (isMobile) setCollapsed(true);
  }, [isMobile]);

  return (
    <Layout className="dashboard-shell">
      {!isMobile && <Sidebar collapsed={collapsed} onCollapse={setCollapsed} />}
      {isMobile && (
        <Drawer
          placement="left"
          open={!collapsed}
          onClose={() => setCollapsed(true)}
          width={260}
          styles={{ body: { padding: 0, background: 'var(--sck-sidebar-bg)' } }}
          closable={false}
        >
          <Sidebar
            collapsed={false}
            onCollapse={() => setCollapsed(true)}
            onNavigate={() => setCollapsed(true)}
          />
        </Drawer>
      )}

      <Layout className="dashboard-shell__main">
        <AppHeader onOpenMenu={isMobile ? () => setCollapsed(false) : undefined} />
        <Content className="dashboard-shell__content">
          <div className="dashboard-shell__inner slide-up">{children}</div>
          <AppFooter />
        </Content>
      </Layout>

      <Watermark />
      <VirtualitoSlot />
    </Layout>
  );
}
