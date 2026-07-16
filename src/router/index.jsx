// src/router/index.jsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useAppSession } from '../hooks/useAppSession';
import DashboardLayout from '../ui/components/layout/DashboardLayout';
import RouteBoot from '../ui/components/common/RouteBoot';

import Login from '../ui/pages/Login';
import Dashboard from '../ui/pages/Dashboard';
import Analytics from '../ui/pages/Analytics';
import Sales from '../ui/pages/Sales';
import Clients from '../ui/pages/Clients';
import Finance from '../ui/pages/Finance';
import HR from '../ui/pages/HR';
import Operations from '../ui/pages/Operations';
import KPIs from '../ui/pages/KPIs';
import Reports from '../ui/pages/Reports';
import Settings from '../ui/pages/Settings';
import Profile from '../ui/pages/Profile';
import Virtualito from '../ui/components/virtualito/Virtualito';

function ProtectedLayout() {
  const { user, ready } = useAppSession();
  if (!ready) return <RouteBoot />;
  if (!user) return <Navigate to="/login" replace />;
  return (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  );
}

function PublicOnlyLayout() {
  const { user, ready } = useAppSession();
  if (!ready) return <RouteBoot />;
  if (user) return <Navigate to="/dashboard" replace />;
  return <Outlet />;
}

function RootRedirect() {
  const { user, ready } = useAppSession();
  if (!ready) return <RouteBoot />;
  return <Navigate to={user ? '/dashboard' : '/login'} replace />;
}

const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<RootRedirect />} />

      <Route element={<PublicOnlyLayout />}>
        <Route path="/login" element={<Login />} />
      </Route>

      <Route element={<ProtectedLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/sales" element={<Sales />} />
        <Route path="/clients" element={<Clients />} />
        <Route path="/finance" element={<Finance />} />
        <Route path="/hr" element={<HR />} />
        <Route path="/operations" element={<Operations />} />
        <Route path="/kpis" element={<KPIs />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/profile" element={<Profile />} />
      </Route>

      {/* Compatibilidad: redirigir rutas antiguas */}
      <Route path="/home" element={<Navigate to="/dashboard" replace />} />
      <Route path="/evaluation" element={<Navigate to="/dashboard" replace />} />
      <Route path="/results" element={<Navigate to="/analytics" replace />} />
      <Route path="/admin" element={<Navigate to="/settings" replace />} />
      <Route path="/about" element={<Navigate to="/dashboard" replace />} />

      <Route path="*" element={<RootRedirect />} />
    </Routes>
    <Virtualito />
  </BrowserRouter>
);

export default Router;
