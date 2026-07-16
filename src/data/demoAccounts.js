/** Cuentas de demostración — Dashboard Ejecutivo SCKora */
export const DEMO_ACCOUNTS = [
  {
    id: 'demo-admin',
    email: 'admin@sckorasystems.com',
    password: 'Admin123!',
    name: 'Ana Administradora',
    role: 'admin',
    title: 'Administrador',
    description: 'Acceso completo a configuración y módulos ejecutivos',
  },
  {
    id: 'demo-user',
    email: 'usuario@sckorasystems.com',
    password: 'User123!',
    name: 'Carlos Analista',
    role: 'user',
    title: 'Usuario',
    description: 'Acceso a dashboards, analítica y reportes',
  },
];

export function findDemoAccount(email, password) {
  const e = String(email || '').trim().toLowerCase();
  const p = String(password || '');
  return DEMO_ACCOUNTS.find(
    (a) => a.email.toLowerCase() === e && a.password === p
  );
}
