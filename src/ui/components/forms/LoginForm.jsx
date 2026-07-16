import React from 'react';
import { Navigate } from 'react-router-dom';

/** Formulario legacy — el login activo está en pages/Login.jsx */
export default function LoginForm() {
  return <Navigate to="/login" replace />;
}
