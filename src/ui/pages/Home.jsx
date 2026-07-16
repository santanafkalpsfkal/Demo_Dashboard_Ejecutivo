import { Navigate } from 'react-router-dom';

/** Página legacy — redirige al Dashboard Ejecutivo */
export default function Home() {
  return <Navigate to="/dashboard" replace />;
}
