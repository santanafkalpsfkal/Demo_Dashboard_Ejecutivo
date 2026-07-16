// Contenido de Virtualito — Dashboard Ejecutivo by SCKora Systems

export const GREETING =
  '¡Hola! Soy Virtualito 🤖, tu asistente del Dashboard Ejecutivo. Puedo guiarte por todos los módulos, temas y roles (Admin / Usuario). Escribe "recorrido" o usa el botón rápido para empezar.';

export const WELCOME_BACK =
  '¡Qué bueno verte de nuevo! Puedo repetir el recorrido completo, el de administrador (temas) o ayudarte con un módulo puntual.';

export const ROUTE_BUBBLES = {
  '/login': {
    icon: '🔐',
    title: 'Acceso demo',
    text: 'Usa las cuentas Admin o Usuario. Haz clic en una tarjeta para autocompletar.',
  },
  '/dashboard': {
    icon: '📊',
    title: 'Dashboard General',
    text: 'KPIs ejecutivos, alertas e ingresos diarios en un solo vistazo.',
  },
  '/analytics': {
    icon: '📈',
    title: 'Analítica',
    text: 'Tendencias, rankings, radar, donut y heatmaps para decidir con datos.',
  },
  '/sales': {
    icon: '💼',
    title: 'Ventas',
    text: 'Facturación, mix de productos y ranking de vendedores.',
  },
  '/clients': {
    icon: '👥',
    title: 'Clientes',
    text: 'Altas, retención, segmentación y valor del portafolio.',
  },
  '/finance': {
    icon: '💰',
    title: 'Finanzas',
    text: 'Ingresos, egresos, utilidad y flujo de caja.',
  },
  '/hr': {
    icon: '🧑‍💼',
    title: 'Recursos Humanos',
    text: 'Headcount, asistencia, productividad y ausencias.',
  },
  '/operations': {
    icon: '⚙️',
    title: 'Operaciones',
    text: 'Procesos, cumplimiento, riesgos y capacidad.',
  },
  '/kpis': {
    icon: '🎯',
    title: 'KPIs & OKRs',
    text: 'Metas estratégicas, avance y semáforos ejecutivos.',
  },
  '/reports': {
    icon: '📄',
    title: 'Reportes',
    text: 'Catálogo descargable con exportación PDF y Excel simulada.',
  },
  '/settings': {
    icon: '🛠️',
    title: 'Configuración',
    text: 'Solo Admin: empresa, preferencias y los 4 temas visuales.',
  },
  '/profile': {
    icon: '👤',
    title: 'Perfil',
    text: 'Datos del usuario activo y resumen de actividad.',
  },
};

export const LOADING_MESSAGES = {
  '/login': 'Cargando accesos de demostración...',
  '/dashboard': 'Preparando indicadores ejecutivos...',
  '/analytics': 'Cargando analítica avanzada...',
  '/sales': 'Cargando pipeline comercial...',
  '/clients': 'Consultando portafolio de clientes...',
  '/finance': 'Preparando flujo financiero...',
  '/hr': 'Cargando indicadores de talento...',
  '/operations': 'Sincronizando procesos operativos...',
  '/kpis': 'Calculando cumplimiento de OKRs...',
  '/reports': 'Preparando catálogo de reportes...',
  '/settings': 'Abriendo configuración corporativa...',
  '/profile': 'Cargando perfil ejecutivo...',
};

/** Tour en pantalla de login (ambos roles) */
export const LOGIN_TOUR_STEPS = [
  {
    id: 'login-welcome',
    path: '/login',
    target: 'login-brand',
    title: 'Bienvenida',
    text: 'Este es el Dashboard Ejecutivo by SCKora Systems. Te mostraré cómo entrar y luego recorreré todos los módulos contigo.',
  },
  {
    id: 'login-admin',
    path: '/login',
    target: 'demo-admin',
    title: 'Cuenta Administrador',
    text: 'Admin: admin@sckorasystems.com / Admin123! — Acceso total, incluida Configuración y cambio de temas.',
  },
  {
    id: 'login-user',
    path: '/login',
    target: 'demo-user',
    title: 'Cuenta Usuario',
    text: 'Usuario: usuario@sckorasystems.com / User123! — Acceso a dashboards, analítica y reportes (sin Configuración).',
  },
  {
    id: 'login-form',
    path: '/login',
    target: 'login-form',
    title: 'Formulario de acceso',
    text: 'Haz clic en una tarjeta demo para autocompletar, o escribe las credenciales manualmente y pulsa Entrar.',
  },
  {
    id: 'login-virtualito',
    path: '/login',
    target: 'virtualito-avatar',
    title: 'Sigo contigo',
    text: 'Después de iniciar sesión iniciaré el recorrido completo por cada página. ¡Entra con Admin o Usuario cuando quieras!',
  },
];

/** Tour principal post-login — todos los módulos */
export const MAIN_TOUR_STEPS = [
  {
    id: 'main-welcome',
    path: '/dashboard',
    target: 'sidebar-brand',
    title: 'Shell ejecutivo',
    text: 'Esta es la plataforma. El logo y el nombre del producto identifican el Dashboard Ejecutivo by SCKora Systems.',
  },
  {
    id: 'main-role',
    path: '/dashboard',
    target: 'sidebar-role',
    title: 'Rol activo',
    text: 'Aquí ves si estás como Admin o Usuario. Los menús disponibles cambian según el rol.',
  },
  {
    id: 'main-header',
    path: '/dashboard',
    target: 'header-greeting',
    title: 'Header ejecutivo',
    text: 'Saludo, empresa y fecha actual. Todo el chrome superior está pensado para operación diaria.',
  },
  {
    id: 'main-search',
    path: '/dashboard',
    target: 'header-search',
    title: 'Buscador',
    text: 'Busca indicadores, clientes o reportes desde cualquier módulo (demo).',
  },
  {
    id: 'main-notifs',
    path: '/dashboard',
    target: 'header-notifications',
    title: 'Notificaciones',
    text: 'Alertas ejecutivas y avisos del sistema aparecen aquí.',
  },
  {
    id: 'main-profile-menu',
    path: '/dashboard',
    target: 'header-profile',
    title: 'Perfil',
    text: 'Accede a tu perfil, configuración (si eres Admin) y cierre de sesión.',
  },
  {
    id: 'nav-dashboard',
    path: '/dashboard',
    target: 'nav-dashboard',
    title: 'Dashboard General',
    text: 'Punto de partida: KPIs, alertas, ingresos diarios y comparativos mensuales.',
  },
  {
    id: 'dash-kpis',
    path: '/dashboard',
    target: 'dashboard-kpis',
    title: 'Tarjetas KPI',
    text: 'Cada tarjeta muestra valor, tendencia, comparación y mini-sparkline animados.',
  },
  {
    id: 'dash-charts',
    path: '/dashboard',
    target: 'dashboard-charts',
    title: 'Gráficos y alertas',
    text: 'Series temporales, comparativos y el panel de alertas ejecutivas en vivo.',
  },
  {
    id: 'nav-analytics',
    path: '/analytics',
    target: 'nav-analytics',
    title: 'Analítica',
    text: 'Módulo de analítica avanzada: área, barras, donut, radar y heatmaps.',
  },
  {
    id: 'analytics-body',
    path: '/analytics',
    target: 'page-analytics',
    title: 'Vistas analíticas',
    text: 'Compara tendencias, rankings por área y mapas de calor de actividad.',
  },
  {
    id: 'nav-sales',
    path: '/sales',
    target: 'nav-sales',
    title: 'Ventas',
    text: 'Facturación, conversión, mix de productos y top vendedores.',
  },
  {
    id: 'sales-body',
    path: '/sales',
    target: 'page-sales',
    title: 'Pipeline comercial',
    text: 'Tabla empresarial con avatar, estado, progreso de meta y acciones.',
  },
  {
    id: 'nav-clients',
    path: '/clients',
    target: 'nav-clients',
    title: 'Clientes',
    text: 'Portafolio con segmentación Enterprise / Mid-Market / SMB y retención.',
  },
  {
    id: 'clients-body',
    path: '/clients',
    target: 'page-clients',
    title: 'Gestión de clientes',
    text: 'Filtra, busca y revisa valor promedio, altas y clientes en riesgo.',
  },
  {
    id: 'nav-finance',
    path: '/finance',
    target: 'nav-finance',
    title: 'Finanzas',
    text: 'Ingresos, egresos, utilidad, rentabilidad y flujo de caja.',
  },
  {
    id: 'finance-body',
    path: '/finance',
    target: 'page-finance',
    title: 'Vista financiera',
    text: 'Áreas apiladas y barras para leer el desempeño económico del periodo.',
  },
  {
    id: 'nav-hr',
    path: '/hr',
    target: 'nav-hr',
    title: 'Recursos Humanos',
    text: 'Empleados, asistencia, productividad, vacaciones y ausencias.',
  },
  {
    id: 'hr-body',
    path: '/hr',
    target: 'page-hr',
    title: 'Talento',
    text: 'Radar de indicadores y directorio con estados operativos del equipo.',
  },
  {
    id: 'nav-operations',
    path: '/operations',
    target: 'nav-operations',
    title: 'Operaciones',
    text: 'Procesos, cumplimiento, riesgos, capacidad y SLA.',
  },
  {
    id: 'ops-body',
    path: '/operations',
    target: 'page-operations',
    title: 'Estado operativo',
    text: 'Semáforos de proceso y heatmaps de carga para anticipar cuellos de botella.',
  },
  {
    id: 'nav-kpis',
    path: '/kpis',
    target: 'nav-kpis',
    title: 'KPIs & OKRs',
    text: 'Objetivos estratégicos, avance vs meta y semáforos de cumplimiento.',
  },
  {
    id: 'kpis-body',
    path: '/kpis',
    target: 'page-kpis',
    title: 'Tablero OKR',
    text: 'Sigue cada objetivo con progreso visual y estado (Cumplido / En curso / Atención).',
  },
  {
    id: 'nav-reports',
    path: '/reports',
    target: 'nav-reports',
    title: 'Reportes',
    text: 'Exporta PDF o Excel simulados desde el catálogo ejecutivo.',
  },
  {
    id: 'reports-body',
    path: '/reports',
    target: 'page-reports',
    title: 'Exportación',
    text: 'Cada reporte se puede descargar. En producción SCKora lo conecta a tu ERP/BI.',
  },
  {
    id: 'nav-profile',
    path: '/profile',
    target: 'header-profile',
    title: 'Mi perfil',
    text: 'Revisa tu identidad, rol y métricas de uso de la plataforma.',
  },
  {
    id: 'profile-body',
    path: '/profile',
    target: 'page-profile',
    title: 'Detalle de usuario',
    text: 'Aquí se distingue claramente Admin vs Usuario dentro del mismo producto.',
  },
  {
    id: 'main-closing',
    path: '/dashboard',
    target: 'virtualito-avatar',
    title: 'Recorrido de módulos listo',
    text: 'Ya conoces todas las páginas. Si eres Admin, al entrar a Configuración te guiaré por los 4 temas. También puedes pedirme “temas” o “recorrido admin”.',
  },
];

/** Tour Admin — Configuración + 4 temas */
export const ADMIN_TOUR_STEPS = [
  {
    id: 'admin-settings-nav',
    path: '/settings',
    target: 'nav-settings',
    title: 'Configuración (solo Admin)',
    text: 'Este menú solo aparece para Administrador. Centraliza empresa, perfil, temas y preferencias.',
  },
  {
    id: 'admin-company',
    path: '/settings',
    target: 'settings-company',
    title: 'Datos de empresa',
    text: 'Personaliza nombre, producto y contacto corporativo (demo).',
  },
  {
    id: 'admin-themes-intro',
    path: '/settings',
    target: 'settings-themes',
    title: 'Cuatro temas SCKora',
    text: 'Hay exactamente 4 temas. Cada uno cambia colores y tipografía Google Fonts. Te los muestro uno a uno.',
  },
  {
    id: 'theme-corporate-light',
    path: '/settings',
    target: 'theme-corporate-light',
    title: 'Corporate Light',
    text: 'Blanco, azul corporativo y grises suaves. Tipografía: Plus Jakarta Sans. Ideal para presentaciones diurnas.',
    themeId: 'corporate-light',
  },
  {
    id: 'theme-corporate-dark',
    path: '/settings',
    target: 'theme-corporate-dark',
    title: 'Corporate Dark',
    text: 'Negro, blanco y azul. Tipografía: Manrope. Pensado para monitoreo prolongado con bajo contraste agresivo.',
    themeId: 'corporate-dark',
  },
  {
    id: 'theme-executive-blue',
    path: '/settings',
    target: 'theme-executive-blue',
    title: 'Executive Blue',
    text: 'Azules premium tipo suite corporativa. Tipografía: IBM Plex Sans. Look ejecutivo de alta dirección.',
    themeId: 'executive-blue',
  },
  {
    id: 'theme-emerald-analytics',
    path: '/settings',
    target: 'theme-emerald-analytics',
    title: 'Emerald Analytics',
    text: 'Negro, verde y grises. Tipografía: Inter. Enfocado en analítica y operaciones.',
    themeId: 'emerald-analytics',
  },
  {
    id: 'admin-prefs',
    path: '/settings',
    target: 'settings-prefs',
    title: 'Preferencias',
    text: 'Idioma, densidad y alertas. En la versión comercial quedan persistidas por usuario.',
  },
  {
    id: 'admin-closing',
    path: '/settings',
    target: 'virtualito-avatar',
    title: 'Tour Admin completado',
    text: 'Ya dominas módulos, roles y temas. Puedes reiniciar cualquier recorrido escribiendo “recorrido”, “login” o “temas”.',
  },
];

export const ADVISORY_MESSAGES = {
  guardar: [
    'Guardar cambios reales está disponible en la versión comercial de SCKora Systems.',
    'En producción, estos datos se persistirían en tu base corporativa.',
  ],
  exportar: 'La exportación PDF/Excel del demo es simulada. SCKora Systems puede conectarla a tu BI real.',
  generico: 'Esta función está disponible en la versión comercial desarrollada por SCKora Systems.',
};

export const FREE_CHAT_RULES = [
  {
    match: /hola|buenas|hey|que tal/,
    reply:
      '¡Hola! Puedo guiarte por el Dashboard Ejecutivo, explicar Admin vs Usuario, o mostrar los 4 temas. ¿Qué necesitas?',
  },
  {
    match: /tour|recorrido|guia|guía/,
    reply: 'Perfecto. Inicio el recorrido completo de módulos.',
    action: 'startTour',
  },
  {
    match: /login|acceso|cuenta|credencial/,
    reply:
      'Cuentas demo — Admin: admin@sckorasystems.com / Admin123! · Usuario: usuario@sckorasystems.com / User123!',
  },
  {
    match: /admin|administrador/,
    reply:
      'El Administrador ve Configuración (temas, empresa, preferencias). Entra con admin@sckorasystems.com y pide “temas” para el tour Admin.',
  },
  {
    match: /usuario normal|rol usuario|analista/,
    reply:
      'El Usuario accede a dashboards, analítica, ventas, clientes, finanzas, RRHH, operaciones, KPIs y reportes. No ve Configuración.',
  },
  {
    match: /tema|temas|theme|oscuro|emerald|corporate/,
    reply:
      'Hay 4 temas: Corporate Light, Corporate Dark, Executive Blue y Emerald Analytics. Solo Admin los cambia en Configuración. Escribe “temas” para el tour.',
    action: 'startAdminTour',
  },
  {
    match: /kpi|okr|meta|indicador/,
    reply: 'En KPIs & OKRs ves metas, avance y semáforos. El Dashboard General resume los indicadores clave del mes.',
  },
  {
    match: /venta|comercial|vendedores/,
    reply: 'Ventas muestra facturación, conversión, mix de productos y el ranking de vendedores con cumplimiento de meta.',
  },
  {
    match: /finanza|caja|utilidad|ingreso/,
    reply: 'Finanzas concentra ingresos, egresos, utilidad, margen y flujo de caja mensual.',
  },
  {
    match: /cliente|retencion|retención|churn/,
    reply: 'Clientes permite revisar segmentación, retención, valor promedio y alertas de riesgo.',
  },
  {
    match: /rrhh|empleado|asistencia|talento/,
    reply: 'RRHH cubre headcount, asistencia, productividad, vacaciones y ausencias.',
  },
  {
    match: /operacion|operación|proceso|sla|riesgo/,
    reply: 'Operaciones monitorea procesos, cumplimiento, riesgos, capacidad y SLA.',
  },
  {
    match: /reporte|pdf|excel|export/,
    reply: 'En Reportes puedes exportar PDF o Excel simulados del catálogo ejecutivo.',
  },
  {
    match: /sckora|empresa|quien te/,
    reply:
      'SCKora Systems desarrolla soluciones digitales a medida. Este Dashboard Ejecutivo es un demo de plataforma corporativa adaptable.',
  },
  {
    match: /virtualito|ayudame|ayuda/,
    reply:
      'Estoy aquí para el tutorial y dudas del demo. Prueba: “recorrido”, “temas”, “login”, “ventas” o “finanzas”.',
  },
  {
    match: /gracias|ok|listo|perfecto/,
    reply: 'Con gusto. Si quieres repetir el tutorial, escribe “recorrido”.',
  },
];

export const FREE_CHAT_FALLBACK =
  'Puedo ayudarte con módulos (dashboard, ventas, finanzas…), roles (admin/usuario), temas visuales o reiniciar el recorrido. ¿Qué exploramos?';

export const QUICK_REPLIES = [
  { label: '🎯 Recorrido módulos', action: 'startTour' },
  { label: '🎨 Tour de temas', action: 'startAdminTour' },
  { label: '🔐 Cuentas demo', action: 'chat', text: 'login' },
  { label: '🏢 ¿Qué es SCKora?', action: 'chat', text: 'sckora' },
];

export function getMainTourSteps(isAdmin) {
  if (isAdmin) return MAIN_TOUR_STEPS;
  // Usuario: quitar mención de config en el cierre
  return MAIN_TOUR_STEPS.map((step) =>
    step.id === 'main-closing'
      ? {
          ...step,
          text: 'Ya conoces todas las páginas disponibles para Usuario. Si inicias sesión como Admin verás Configuración y los 4 temas. Escribe “recorrido” para repetir.',
        }
      : step
  );
}
