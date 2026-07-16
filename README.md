# Dashboard Ejecutivo — SCKora Systems

Plataforma demo de monitoreo de indicadores empresariales, métricas estratégicas y análisis ejecutivo en tiempo real.

## Cuentas de demostración

| Rol | Correo | Contraseña |
|-----|--------|------------|
| **Administrador** | `admin@sckorasystems.com` | `Admin123!` |
| **Usuario** | `usuario@sckorasystems.com` | `User123!` |

- **Admin**: acceso completo, incluye Configuración (temas, empresa, preferencias).
- **Usuario**: dashboards, analítica, ventas, clientes, finanzas, RRHH, operaciones, KPIs y reportes.

## Virtualito (asistente guiado)

El asistente flotante inicia tutoriales automáticos:

1. **Tour de login** — cuentas Admin/Usuario y formulario.
2. **Tour de módulos** — recorre todas las páginas del dashboard (KPIs, analítica, ventas, clientes, finanzas, RRHH, operaciones, OKRs, reportes y perfil).
3. **Tour Admin / temas** — al entrar a Configuración como Admin, aplica y explica los 4 temas (Corporate Light, Corporate Dark, Executive Blue, Emerald Analytics).

También puedes escribir en el chat: `recorrido`, `temas`, `login`, o usar los botones rápidos.

## Desarrollo

```bash
npm install
npm run dev
```

Abre `http://localhost:5173/login`.

## Despliegue en Vercel

El proyecto es una SPA (React + Vite). El archivo `vercel.json` configura:

- Build: `npm run build` → carpeta `dist`
- Rewrites: todas las rutas (`/login`, `/dashboard`, etc.) sirven `index.html`

**No requiere backend** en Vercel: las cuentas demo funcionan 100% en el cliente.

Tras conectar el repo en Vercel, el despliegue debe abrir directamente en `/login`.

## Stack

React + Vite · Ant Design · Chart.js · React Router
