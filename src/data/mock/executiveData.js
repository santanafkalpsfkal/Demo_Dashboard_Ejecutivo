/** Datos demo realistas — Dashboard Ejecutivo SCKora Systems */

const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

export const COMPANY = {
  name: 'SCKora Systems',
  product: 'Dashboard Ejecutivo',
  subtitle:
    'Plataforma inteligente para monitoreo de indicadores empresariales, métricas estratégicas y análisis ejecutivo en tiempo real.',
  email: 'contacto@sckorasystems.com',
  support: 'soporte@sckorasystems.com',
};

export const kpiSummary = [
  { key: 'ventas', title: 'Ventas del mes', value: 1842500, prefix: '$', suffix: '', trend: 12.4, comparison: 'vs mes anterior', color: '#1677ff', icon: 'DollarOutlined', spark: [42, 48, 45, 52, 58, 61, 67, 72] },
  { key: 'ingresos', title: 'Ingresos', value: 2148000, prefix: '$', suffix: '', trend: 8.1, comparison: 'vs mes anterior', color: '#10b981', icon: 'RiseOutlined', spark: [30, 35, 38, 42, 40, 48, 55, 60] },
  { key: 'costos', title: 'Costos', value: 986400, prefix: '$', suffix: '', trend: -3.2, comparison: 'vs mes anterior', color: '#f59e0b', icon: 'FallOutlined', spark: [55, 52, 50, 48, 49, 46, 44, 42] },
  { key: 'utilidad', title: 'Utilidad', value: 1161600, prefix: '$', suffix: '', trend: 15.6, comparison: 'vs mes anterior', color: '#6366f1', icon: 'TrophyOutlined', spark: [20, 25, 28, 32, 38, 42, 48, 55] },
  { key: 'clientes', title: 'Clientes', value: 1284, prefix: '', suffix: '', trend: 6.3, comparison: 'vs mes anterior', color: '#0ea5e9', icon: 'TeamOutlined', spark: [80, 82, 85, 88, 90, 93, 96, 100] },
  { key: 'proyectos', title: 'Proyectos activos', value: 47, prefix: '', suffix: '', trend: 4.4, comparison: 'vs mes anterior', color: '#8b5cf6', icon: 'ProjectOutlined', spark: [30, 32, 34, 36, 38, 40, 42, 47] },
  { key: 'empleados', title: 'Empleados activos', value: 186, prefix: '', suffix: '', trend: 2.1, comparison: 'vs trimestre', color: '#14b8a6', icon: 'UserOutlined', spark: [170, 172, 175, 178, 180, 182, 184, 186] },
  { key: 'margen', title: 'Margen', value: 54.1, prefix: '', suffix: '%', trend: 1.8, comparison: 'vs mes anterior', color: '#22c55e', icon: 'PercentageOutlined', spark: [48, 49, 50, 51, 52, 53, 53.5, 54.1] },
  { key: 'conversion', title: 'Conversión', value: 18.7, prefix: '', suffix: '%', trend: 2.9, comparison: 'vs mes anterior', color: '#ec4899', icon: 'FunnelPlotOutlined', spark: [12, 13, 14, 15, 16, 17, 18, 18.7] },
  { key: 'nps', title: 'NPS', value: 72, prefix: '', suffix: '', trend: 5.0, comparison: 'vs trimestre', color: '#06b6d4', icon: 'SmileOutlined', spark: [58, 60, 62, 65, 67, 69, 70, 72] },
  { key: 'cumplimiento', title: 'Cumplimiento', value: 94.2, prefix: '', suffix: '%', trend: 1.1, comparison: 'vs objetivo', color: '#84cc16', icon: 'CheckCircleOutlined', spark: [88, 89, 90, 91, 92, 93, 93.5, 94.2] },
  { key: 'crecimiento', title: 'Crecimiento', value: 21.5, prefix: '', suffix: '%', trend: 3.4, comparison: 'YoY', color: '#f43f5e', icon: 'RocketOutlined', spark: [10, 12, 14, 15, 17, 18, 20, 21.5] },
];

export const dailyRevenue = Array.from({ length: 30 }, (_, i) => ({
  day: `${i + 1}`,
  ingresos: Math.round(55000 + Math.sin(i / 3) * 12000 + Math.random() * 8000),
  costos: Math.round(28000 + Math.cos(i / 4) * 5000 + Math.random() * 4000),
}));

export const monthlyComparative = months.map((m, i) => ({
  month: m,
  actual: Math.round(1400000 + i * 45000 + Math.sin(i) * 80000),
  anterior: Math.round(1200000 + i * 38000 + Math.cos(i) * 60000),
  objetivo: Math.round(1500000 + i * 40000),
}));

export const salesByChannel = [
  { label: 'Directo', value: 38 },
  { label: 'Partners', value: 24 },
  { label: 'Online', value: 22 },
  { label: 'Enterprise', value: 16 },
];

export const productMix = [
  { label: 'Licencias SaaS', value: 42 },
  { label: 'Consultoría', value: 28 },
  { label: 'Soporte Premium', value: 18 },
  { label: 'Integraciones', value: 12 },
];

export const radarPerformance = {
  labels: ['Ventas', 'Calidad', 'Entrega', 'Soporte', 'Innovación', 'Finanzas'],
  datasets: [
    { label: 'Actual', data: [88, 92, 79, 85, 74, 90] },
    { label: 'Objetivo', data: [90, 90, 85, 88, 80, 92] },
  ],
};

export const heatmapData = [
  [12, 18, 22, 30, 28, 35, 40],
  [15, 20, 25, 32, 38, 42, 45],
  [10, 14, 19, 24, 30, 36, 39],
  [8, 12, 16, 20, 26, 31, 34],
  [18, 24, 29, 35, 40, 48, 52],
];

export const alerts = [
  { id: 1, type: 'warning', title: 'Costo operativo +4.2%', detail: 'Área Operaciones supera umbral semanal', time: 'hace 12 min' },
  { id: 2, type: 'success', title: 'Meta de ventas alcanzada', detail: 'Región Norte cerró 102% del objetivo', time: 'hace 45 min' },
  { id: 3, type: 'error', title: 'SLA crítico en soporte', detail: 'Ticket #4821 supera 8h sin respuesta', time: 'hace 1 h' },
  { id: 4, type: 'info', title: 'Predicción Q3', detail: 'Modelo estima +11% ingresos próximo trimestre', time: 'hace 2 h' },
];

export const topSellers = [
  { id: 1, name: 'Ana Martínez', avatar: 'AM', region: 'Norte', ventas: 428000, meta: 400000, estado: 'Excelente' },
  { id: 2, name: 'Carlos Ruiz', avatar: 'CR', region: 'Centro', ventas: 391000, meta: 380000, estado: 'En meta' },
  { id: 3, name: 'Laura Gómez', avatar: 'LG', region: 'Sur', ventas: 356000, meta: 350000, estado: 'En meta' },
  { id: 4, name: 'Diego Pérez', avatar: 'DP', region: 'Este', ventas: 298000, meta: 320000, estado: 'Atención' },
  { id: 5, name: 'Sofía Vargas', avatar: 'SV', region: 'Oeste', ventas: 275000, meta: 300000, estado: 'Atención' },
];

export const clientsTable = [
  { id: 'C-1001', name: 'NovaTech Latam', segment: 'Enterprise', valor: 185000, estado: 'Activo', retencion: 96, desde: '2023-02-14' },
  { id: 'C-1002', name: 'Andes Retail', segment: 'Mid-Market', valor: 92000, estado: 'Activo', retencion: 88, desde: '2024-01-08' },
  { id: 'C-1003', name: 'Pacific Logistics', segment: 'Enterprise', valor: 210000, estado: 'Activo', retencion: 91, desde: '2022-11-20' },
  { id: 'C-1004', name: 'GreenFarm Co', segment: 'SMB', valor: 28000, estado: 'En riesgo', retencion: 62, desde: '2024-06-02' },
  { id: 'C-1005', name: 'Urban Bank', segment: 'Enterprise', valor: 340000, estado: 'Activo', retencion: 98, desde: '2021-09-15' },
  { id: 'C-1006', name: 'MediCare Plus', segment: 'Mid-Market', valor: 76000, estado: 'Nuevo', retencion: 100, desde: '2026-05-01' },
  { id: 'C-1007', name: 'SkyLink Telecom', segment: 'Enterprise', valor: 198000, estado: 'Activo', retencion: 94, desde: '2023-07-22' },
  { id: 'C-1008', name: 'CasaDelSol', segment: 'SMB', valor: 18500, estado: 'Inactivo', retencion: 40, desde: '2024-03-11' },
];

export const financeFlow = months.map((m, i) => ({
  month: m,
  ingresos: Math.round(1800000 + i * 40000 + Math.sin(i) * 90000),
  egresos: Math.round(950000 + i * 22000 + Math.cos(i) * 50000),
  utilidad: Math.round(850000 + i * 18000 + Math.sin(i / 2) * 40000),
}));

export const employees = [
  { id: 'E-01', name: 'Valentina Soto', area: 'Ventas', asistencia: 98, productividad: 94, estado: 'Activo', vacaciones: 8 },
  { id: 'E-02', name: 'Miguel Ortega', area: 'Operaciones', asistencia: 92, productividad: 88, estado: 'Activo', vacaciones: 3 },
  { id: 'E-03', name: 'Paula Ríos', area: 'Finanzas', asistencia: 100, productividad: 96, estado: 'Activo', vacaciones: 12 },
  { id: 'E-04', name: 'Jorge Medina', area: 'TI', asistencia: 89, productividad: 91, estado: 'Vacaciones', vacaciones: 0 },
  { id: 'E-05', name: 'Camila Torres', area: 'RRHH', asistencia: 97, productividad: 90, estado: 'Activo', vacaciones: 5 },
  { id: 'E-06', name: 'Andrés Silva', area: 'Producto', asistencia: 85, productividad: 82, estado: 'Ausencia', vacaciones: 2 },
];

export const operations = [
  { proceso: 'Facturación', estado: 'Óptimo', cumplimiento: 98, riesgo: 'Bajo', capacidad: 72 },
  { proceso: 'Logística', estado: 'Atención', cumplimiento: 86, riesgo: 'Medio', capacidad: 91 },
  { proceso: 'Onboarding', estado: 'Óptimo', cumplimiento: 95, riesgo: 'Bajo', capacidad: 64 },
  { proceso: 'Soporte L1', estado: 'Crítico', cumplimiento: 78, riesgo: 'Alto', capacidad: 97 },
  { proceso: 'Cobranza', estado: 'Óptimo', cumplimiento: 93, riesgo: 'Bajo', capacidad: 58 },
  { proceso: 'Producción', estado: 'Atención', cumplimiento: 88, riesgo: 'Medio', capacidad: 84 },
];

export const okrs = [
  { key: 'O1', objetivo: 'Crecer ingresos recurrentes', meta: 25, actual: 21.5, estado: 'En curso' },
  { key: 'O2', objetivo: 'Elevar NPS a 75', meta: 75, actual: 72, estado: 'En curso' },
  { key: 'O3', objetivo: 'Reducir churn a 3%', meta: 3, actual: 3.8, estado: 'Atención' },
  { key: 'O4', objetivo: 'Automatizar 40% de reportes', meta: 40, actual: 46, estado: 'Cumplido' },
  { key: 'O5', objetivo: 'SLA soporte < 2h', meta: 2, actual: 2.4, estado: 'Atención' },
];

export const reportsCatalog = [
  { id: 'R-01', name: 'Resumen Ejecutivo Mensual', tipo: 'PDF', area: 'Dirección', actualizado: '2026-07-10' },
  { id: 'R-02', name: 'Pipeline de Ventas', tipo: 'Excel', area: 'Comercial', actualizado: '2026-07-14' },
  { id: 'R-03', name: 'Flujo de Caja', tipo: 'Excel', area: 'Finanzas', actualizado: '2026-07-13' },
  { id: 'R-04', name: 'Headcount & Asistencia', tipo: 'PDF', area: 'RRHH', actualizado: '2026-07-12' },
  { id: 'R-05', name: 'Cumplimiento Operativo', tipo: 'PDF', area: 'Operaciones', actualizado: '2026-07-11' },
  { id: 'R-06', name: 'Scorecard de KPIs', tipo: 'Excel', area: 'Estrategia', actualizado: '2026-07-15' },
];

export const notifications = [
  { id: 1, title: 'Cierre contable disponible', unread: true },
  { id: 2, title: '3 clientes en riesgo de churn', unread: true },
  { id: 3, title: 'Reporte Q2 listo para exportar', unread: false },
  { id: 4, title: 'Nueva meta regional asignada', unread: false },
];

export const areaPerformance = [
  { area: 'Ventas', score: 92 },
  { area: 'Marketing', score: 78 },
  { area: 'Operaciones', score: 85 },
  { area: 'Finanzas', score: 94 },
  { area: 'RRHH', score: 88 },
  { area: 'TI', score: 91 },
];

export { months };
