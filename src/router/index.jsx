// src/router/index.jsx
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { userServices } from '../services/userServices';
import DashboardLayout from '../ui/components/layout/DashboardLayout';

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

function useStoredUser() {
  const [ready, setReady] = useState(false);
  const [user, setUser] = useState(null);

  const read = () => {
    try {
      setUser(userServices.getCurrentUser());
    } catch {
      setUser(null);
    }
  };

  useEffect(() => {
    read();
    setReady(true);
    const onStorage = (e) => {
      if (e.key === 'userData' || e.key === 'authToken') read();
    };
    const onSessionChanged = () => read();
    window.addEventListener('storage', onStorage);
    window.addEventListener('session-changed', onSessionChanged);
    return () => {
      window.removeEventListener('storage', onStorage);
      window.removeEventListener('session-changed', onSessionChanged);
    };
  }, []);

  return { user, ready };
}

const ProtectedRoute = ({ children }) => {
  const { user, ready } = useStoredUser();
  if (!ready) return null;
  if (!user) return <Navigate to="/login" replace />;
  return <DashboardLayout>{children}</DashboardLayout>;
};

const PublicOnlyRoute = ({ children }) => {
  const { user, ready } = useStoredUser();
  if (!ready) return null;
  if (user) return <Navigate to="/dashboard" replace />;
  return children;
};

function RootRedirect() {
  const { user, ready } = useStoredUser();
  if (!ready) return null;
  return <Navigate to={user ? '/dashboard' : '/login'} replace />;
}

const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<RootRedirect />} />
      <Route path="/login" element={<PublicOnlyRoute><Login /></PublicOnlyRoute>} />

      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
      <Route path="/sales" element={<ProtectedRoute><Sales /></ProtectedRoute>} />
      <Route path="/clients" element={<ProtectedRoute><Clients /></ProtectedRoute>} />
      <Route path="/finance" element={<ProtectedRoute><Finance /></ProtectedRoute>} />
      <Route path="/hr" element={<ProtectedRoute><HR /></ProtectedRoute>} />
      <Route path="/operations" element={<ProtectedRoute><Operations /></ProtectedRoute>} />
      <Route path="/kpis" element={<ProtectedRoute><KPIs /></ProtectedRoute>} />
      <Route path="/reports" element={<ProtectedRoute><Reports /></ProtectedRoute>} />
      <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />

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
