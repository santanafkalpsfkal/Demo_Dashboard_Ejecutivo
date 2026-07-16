import React from 'react';
import { Outlet } from 'react-router-dom';
import DashboardLayout from './DashboardLayout';

/** Layout legacy reutiliza el shell ejecutivo */
export default function MainLayout() {
  return (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  );
}
