import { create } from 'zustand';
import {
  GREETING,
  ROUTE_BUBBLES,
  LOADING_MESSAGES,
  ADVISORY_MESSAGES,
  FREE_CHAT_RULES,
  FREE_CHAT_FALLBACK,
} from './virtualitoContent';

const LOGIN_TOUR_DONE_KEY = 'sckora_exec_virtualito_login_tour_v1';
const TOUR_DONE_KEY = 'sckora_exec_virtualito_tour_v1';
const ADMIN_TOUR_DONE_KEY = 'sckora_exec_virtualito_admin_tour_v1';

let bubbleTimer = null;
let typingTimer = null;
let routeTimer = null;
let idSeq = 1;

function nowTime() {
  const now = new Date();
  return `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`;
}

function pickVariant(entry) {
  if (Array.isArray(entry)) return entry[Math.floor(Math.random() * entry.length)];
  return entry;
}

function safeGetFlag(key) {
  if (typeof window === 'undefined') return false;
  return window.localStorage.getItem(key) === '1';
}

function safeSetFlag(key) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(key, '1');
}

export const useVirtualitoStore = create((set, get) => ({
  open: false,
  booted: false,
  chatLoading: false,
  messages: [],
  typing: false,

  bubble: null,
  routeLoading: false,
  routeLoadingText: '',

  tourActive: false,
  tourSteps: [],
  tourIndex: 0,
  tourKind: 'main',
  loginTourDone: safeGetFlag(LOGIN_TOUR_DONE_KEY),
  tourDone: safeGetFlag(TOUR_DONE_KEY),
  adminTourDone: safeGetFlag(ADMIN_TOUR_DONE_KEY),

  init: () => {
    if (get().booted) return;
    set({
      booted: true,
      messages: [{ id: idSeq++, from: 'bot', text: GREETING, time: nowTime() }],
    });
  },

  openChat: () => {
    set({ open: true, bubble: null });
    if (!get().chatLoading && get().messages.length <= 1) {
      set({ chatLoading: true });
      setTimeout(() => set({ chatLoading: false }), 500);
    }
  },
  closeChat: () => set({ open: false }),
  toggleChat: () => (get().open ? get().closeChat() : get().openChat()),

  clearBubble: () => {
    if (bubbleTimer) clearTimeout(bubbleTimer);
    set({ bubble: null });
  },

  showBubble: (icon, title, text, ttl = 7000) => {
    if (get().open) return;
    if (bubbleTimer) clearTimeout(bubbleTimer);
    set({ bubble: { icon, title, text } });
    bubbleTimer = setTimeout(() => set({ bubble: null }), ttl);
  },

  pushBot: (text, { silentBubble = false } = {}) => {
    if (typingTimer) clearTimeout(typingTimer);
    set({ typing: true });
    typingTimer = setTimeout(() => {
      set((state) => ({
        typing: false,
        messages: [...state.messages, { id: idSeq++, from: 'bot', text, time: nowTime() }],
      }));
      if (!silentBubble && !get().open) {
        get().showBubble('🤖', 'Virtualito', text);
      }
    }, 550 + Math.min(600, text.length * 6));
  },

  pushUser: (text) => {
    set((state) => ({
      messages: [...state.messages, { id: idSeq++, from: 'user', text, time: nowTime() }],
    }));
  },

  sendUserMessage: (rawText) => {
    const text = rawText.trim();
    if (!text) return;
    get().pushUser(text);

    const normalized = text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');

    const rule = FREE_CHAT_RULES.find((r) => r.match.test(normalized));
    get().pushBot(rule ? rule.reply : FREE_CHAT_FALLBACK, { silentBubble: true });
    return rule?.action || null;
  },

  advise: (actionKey, customText) => {
    const text = customText || pickVariant(ADVISORY_MESSAGES[actionKey]) || ADVISORY_MESSAGES.generico;
    get().pushBot(text);
  },

  notifyRoute: (pathname) => {
    if (get().tourActive) return;
    const loadingText = LOADING_MESSAGES[pathname] || 'Cargando información...';
    const route = ROUTE_BUBBLES[pathname];

    if (routeTimer) clearTimeout(routeTimer);
    set({ routeLoading: true, routeLoadingText: loadingText });
    if (!get().open) {
      get().showBubble('⏳', 'Virtualito', loadingText, 1600);
    }

    routeTimer = setTimeout(() => {
      set({ routeLoading: false });
      if (route) {
        get().showBubble(route.icon, route.title, route.text);
        set((state) => ({
          messages: [
            ...state.messages,
            {
              id: idSeq++,
              from: 'bot',
              text: `${route.icon} ${route.title} — ${route.text}`,
              time: nowTime(),
            },
          ],
        }));
      }
    }, 700);
  },

  startTour: (steps, kind = 'main') => {
    if (!steps?.length) return;
    if (bubbleTimer) clearTimeout(bubbleTimer);
    set({
      tourActive: true,
      tourSteps: steps,
      tourIndex: 0,
      tourKind: kind,
      open: true,
      bubble: null,
    });
  },

  nextTourStep: () => {
    const { tourIndex, tourSteps } = get();
    if (tourIndex + 1 >= tourSteps.length) {
      get().finishTour();
      return;
    }
    set({ tourIndex: tourIndex + 1 });
  },

  prevTourStep: () => {
    set((state) => ({ tourIndex: Math.max(0, state.tourIndex - 1) }));
  },

  finishTour: () => {
    const { tourKind } = get();
    set({ tourActive: false, tourSteps: [], tourIndex: 0 });
    if (tourKind === 'login') {
      safeSetFlag(LOGIN_TOUR_DONE_KEY);
      set({ loginTourDone: true });
    } else if (tourKind === 'admin') {
      safeSetFlag(ADMIN_TOUR_DONE_KEY);
      set({ adminTourDone: true });
    } else {
      safeSetFlag(TOUR_DONE_KEY);
      set({ tourDone: true });
    }
  },

  skipTour: () => {
    get().finishTour();
  },

  resetTours: () => {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(LOGIN_TOUR_DONE_KEY);
      window.localStorage.removeItem(TOUR_DONE_KEY);
      window.localStorage.removeItem(ADMIN_TOUR_DONE_KEY);
    }
    set({ loginTourDone: false, tourDone: false, adminTourDone: false });
  },
}));
