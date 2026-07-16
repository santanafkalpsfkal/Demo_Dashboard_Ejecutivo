import axios from 'axios';
import { API_BASE_URL } from '../config/config.js';
import { findDemoAccount } from '../data/demoAccounts.js';

console.log('[userServices] API_BASE_URL:', API_BASE_URL);

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 4000,
  headers: { 'Content-Type': 'application/json' }
});

api.interceptors.request.use(cfg => { console.log('[userServices] ->', cfg.method?.toUpperCase(), cfg.url); return cfg; });
api.interceptors.response.use(r => { console.log('[userServices] <-', r.status, r.config.url); return r; }, e => { console.log('[userServices] !! error', e.code, e.message); return Promise.reject(e); });

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('userData');
    }
    return Promise.reject(error);
  }
);

function persistSession(user, token) {
  localStorage.setItem('userData', JSON.stringify(user));
  localStorage.setItem('authToken', token);
  try { window.dispatchEvent(new Event('session-changed')); } catch {}
}

function loginWithDemo(email, password) {
  const account = findDemoAccount(email, password);
  if (!account) {
    return {
      success: false,
      error: 'Credenciales inválidas. Usa una cuenta de demostración (Admin o Usuario).',
    };
  }
  const user = {
    id: account.id,
    name: account.name,
    email: account.email,
    role: account.role,
    title: account.title,
  };
  const token = `demo-token-${account.role}-${Date.now()}`;
  persistSession(user, token);
  return { success: true, user, token, demo: true };
}

export const userServices = {
  async login(email, password) {
    // Prioridad demo: cuentas oficiales del Dashboard Ejecutivo
    const demo = loginWithDemo(email, password);
    if (demo.success) return demo;

    try {
      const res = await api.post('/auth/login', { email, password });
      const data = res.data;
      if (data?.success && data?.user && data?.token) {
        persistSession(data.user, data.token);
        return { success: true, user: data.user, token: data.token };
      }
      return {
        success: false,
        error: data?.error || 'Credenciales inválidas. Usa admin@sckorasystems.com o usuario@sckorasystems.com',
      };
    } catch {
      return {
        success: false,
        error: 'Credenciales inválidas. Usa una cuenta de demostración (Admin o Usuario).',
      };
    }
  },

  async register({ name, email, password, skipPersist = false }) {
    try {
      const res = await api.post('/auth/register', { name, email, password });
      const data = res.data;
      if (!skipPersist && data?.success && data?.user && data?.token) {
        persistSession(data.user, data.token);
      }
      return data;
    } catch (err) {
      return { success: false, error: err.response?.data?.error || 'Error en registro' };
    }
  },

  async getUsers() {
    try {
      const res = await api.get('/auth/users');
      return res.data;
    } catch (err) {
      return { success: false, error: err.response?.data?.error || 'Error obteniendo usuarios' };
    }
  },

  async updateUser(id, updates) {
    try {
      const res = await api.put(`/auth/users/${id}`, updates);
      return res.data;
    } catch (err) {
      return { success: false, error: err.response?.data?.error || 'Error actualizando usuario' };
    }
  },

  async deleteUser(id) {
    try {
      const res = await api.delete(`/auth/users/${id}`);
      return res.data;
    } catch (err) {
      return { success: false, error: err.response?.data?.error || 'Error desactivando usuario' };
    }
  },

  logout() {
    try {
      localStorage.removeItem('authToken');
      localStorage.removeItem('userData');
      localStorage.setItem('justLoggedOut', '1');
      window.dispatchEvent(new Event('session-changed'));
    } catch {}
    return { success: true };
  },

  getCurrentUser() {
    try {
      const raw = localStorage.getItem('userData');
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }
};