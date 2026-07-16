import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useVirtualitoStore } from './virtualitoStore';
import {
  LOGIN_TOUR_STEPS,
  ADMIN_TOUR_STEPS,
  QUICK_REPLIES,
  getMainTourSteps,
} from './virtualitoContent';
import { userServices } from '../../../services/userServices';
import { useTheme } from '../../../theme/ThemeContext';
import avatarImg from '../../../assets/virtualito.png';
import s from './Virtualito.module.css';

function getIsAdmin() {
  return userServices.getCurrentUser()?.role === 'admin';
}

function getIsLoggedIn() {
  return !!userServices.getCurrentUser();
}

export default function Virtualito() {
  const location = useLocation();
  const navigate = useNavigate();
  const { setTheme } = useTheme();

  const open = useVirtualitoStore((state) => state.open);
  const booted = useVirtualitoStore((state) => state.booted);
  const chatLoading = useVirtualitoStore((state) => state.chatLoading);
  const messages = useVirtualitoStore((state) => state.messages);
  const typing = useVirtualitoStore((state) => state.typing);
  const bubble = useVirtualitoStore((state) => state.bubble);
  const tourActive = useVirtualitoStore((state) => state.tourActive);
  const tourSteps = useVirtualitoStore((state) => state.tourSteps);
  const tourIndex = useVirtualitoStore((state) => state.tourIndex);
  const loginTourDone = useVirtualitoStore((state) => state.loginTourDone);
  const tourDone = useVirtualitoStore((state) => state.tourDone);
  const adminTourDone = useVirtualitoStore((state) => state.adminTourDone);

  const [input, setInput] = useState('');
  const [highlightRect, setHighlightRect] = useState(null);
  const [sessionUser, setSessionUser] = useState(() => userServices.getCurrentUser());
  const messagesRef = useRef(null);
  const prevPathRef = useRef(null);
  const announcedStepRef = useRef(null);
  const wasTourActiveRef = useRef(false);

  useEffect(() => {
    useVirtualitoStore.getState().init();
  }, []);

  useEffect(() => {
    const sync = () => setSessionUser(userServices.getCurrentUser());
    window.addEventListener('session-changed', sync);
    window.addEventListener('storage', sync);
    return () => {
      window.removeEventListener('session-changed', sync);
      window.removeEventListener('storage', sync);
    };
  }, []);

  const isAdmin = sessionUser?.role === 'admin';
  const isLoggedIn = !!sessionUser;

  // Tour de login (antes de autenticarse)
  useEffect(() => {
    if (!booted || loginTourDone || tourActive) return;
    if (location.pathname !== '/login') return;
    if (isLoggedIn) return;
    const t = setTimeout(() => {
      useVirtualitoStore.getState().startTour(LOGIN_TOUR_STEPS, 'login');
    }, 1200);
    return () => clearTimeout(t);
  }, [booted, loginTourDone, tourActive, location.pathname, isLoggedIn]);

  // Tour principal tras login
  useEffect(() => {
    if (!booted || tourDone || tourActive) return;
    if (!isLoggedIn) return;
    if (location.pathname === '/login') return;
    const t = setTimeout(() => {
      useVirtualitoStore.getState().startTour(getMainTourSteps(getIsAdmin()), 'main');
    }, 1400);
    return () => clearTimeout(t);
  }, [booted, tourDone, tourActive, isLoggedIn, location.pathname]);

  // Tour Admin (temas) al entrar a settings
  useEffect(() => {
    if (!isAdmin || adminTourDone || tourActive) return;
    if (location.pathname !== '/settings') return;
    const t = setTimeout(() => {
      useVirtualitoStore.getState().startTour(ADMIN_TOUR_STEPS, 'admin');
    }, 900);
    return () => clearTimeout(t);
  }, [location.pathname, isAdmin, adminTourDone, tourActive]);

  useEffect(() => {
    if (prevPathRef.current === null) {
      prevPathRef.current = location.pathname;
      return;
    }
    if (prevPathRef.current === location.pathname) return;
    prevPathRef.current = location.pathname;
    useVirtualitoStore.getState().notifyRoute(location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    if (tourActive && !wasTourActiveRef.current) {
      announcedStepRef.current = null;
    }
    wasTourActiveRef.current = tourActive;
  }, [tourActive]);

  // Navegar solo al cambiar de paso del tour (no al navegar manualmente el usuario)
  useEffect(() => {
    if (!tourActive) return;
    const step = tourSteps[tourIndex];
    if (!step) return;
    if (step.path === '/settings' && !getIsAdmin()) {
      useVirtualitoStore.getState().nextTourStep();
      return;
    }
    if (step.path !== location.pathname) {
      navigate(step.path);
    }
  }, [tourActive, tourIndex, tourSteps, navigate]);

  useEffect(() => {
    if (!tourActive) {
      setHighlightRect(null);
      return;
    }
    const step = tourSteps[tourIndex];
    if (!step || step.path !== location.pathname) {
      setHighlightRect(null);
      return;
    }

    if (step.themeId) {
      setTheme(step.themeId);
    }

    if (announcedStepRef.current !== step.id) {
      announcedStepRef.current = step.id;
      useVirtualitoStore.getState().pushBot(`${step.title} — ${step.text}`, { silentBubble: true });
    }

    let attempts = 0;
    let raf;
    const measure = () => {
      const el = document.querySelector(`[data-tour="${step.target}"]`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
        setHighlightRect(el.getBoundingClientRect());
      } else if (attempts < 16) {
        attempts += 1;
        raf = requestAnimationFrame(measure);
      } else {
        setHighlightRect(null);
      }
    };
    raf = requestAnimationFrame(measure);
    return () => raf && cancelAnimationFrame(raf);
  }, [tourActive, tourIndex, tourSteps, location.pathname, setTheme]);

  useEffect(() => {
    if (!tourActive) return;
    const step = tourSteps[tourIndex];
    if (!step) return;
    const update = () => {
      const el = document.querySelector(`[data-tour="${step.target}"]`);
      if (el) setHighlightRect(el.getBoundingClientRect());
    };
    window.addEventListener('scroll', update, true);
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update, true);
      window.removeEventListener('resize', update);
    };
  }, [tourActive, tourIndex, tourSteps]);

  useEffect(() => {
    const el = messagesRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
  }, [messages, typing, open]);

  const startMainTour = () => {
    if (!getIsLoggedIn()) {
      useVirtualitoStore.getState().startTour(LOGIN_TOUR_STEPS, 'login');
      return;
    }
    useVirtualitoStore.getState().startTour(getMainTourSteps(getIsAdmin()), 'main');
  };

  const startAdminTour = () => {
    if (!getIsAdmin()) {
      useVirtualitoStore
        .getState()
        .pushBot(
          'El tour de temas es exclusivo de Administrador. Entra con admin@sckorasystems.com / Admin123! y vuelve a pedirlo.',
          { silentBubble: true }
        );
      return;
    }
    navigate('/settings');
    setTimeout(() => {
      useVirtualitoStore.getState().startTour(ADMIN_TOUR_STEPS, 'admin');
    }, 400);
  };

  const handleQuickAction = (qr) => {
    if (qr.action === 'startTour') startMainTour();
    else if (qr.action === 'startAdminTour') startAdminTour();
    else if (qr.action === 'goTo') navigate(qr.path);
    else if (qr.action === 'chat') {
      const action = useVirtualitoStore.getState().sendUserMessage(qr.text);
      if (action === 'startTour') setTimeout(startMainTour, 600);
      if (action === 'startAdminTour') setTimeout(startAdminTour, 600);
    }
  };

  const handleSend = () => {
    const text = input.trim();
    if (!text) return;
    setInput('');

    if (/\b(tour|recorrido|guia|gu[ií]a)\b/i.test(text)) {
      useVirtualitoStore.getState().pushUser(text);
      useVirtualitoStore.getState().pushBot('Perfecto, iniciemos el recorrido de módulos.', {
        silentBubble: true,
      });
      setTimeout(startMainTour, 500);
      return;
    }

    if (/\b(tema|temas|theme)\b/i.test(text)) {
      useVirtualitoStore.getState().pushUser(text);
      setTimeout(startAdminTour, 400);
      return;
    }

    if (/\b(login|acceso|cuentas?)\b/i.test(text) && !getIsLoggedIn()) {
      useVirtualitoStore.getState().pushUser(text);
      useVirtualitoStore.getState().pushBot('Te muestro el acceso demo.', { silentBubble: true });
      setTimeout(() => useVirtualitoStore.getState().startTour(LOGIN_TOUR_STEPS, 'login'), 500);
      return;
    }

    const action = useVirtualitoStore.getState().sendUserMessage(text);
    if (action === 'startTour') setTimeout(startMainTour, 600);
    if (action === 'startAdminTour') setTimeout(startAdminTour, 600);
  };

  const currentStep = tourActive ? tourSteps[tourIndex] : null;
  const isLastStep = tourActive && tourIndex === tourSteps.length - 1;

  return (
    <>
      {highlightRect && (
        <div
          className={s.highlight}
          style={{
            top: Math.max(4, highlightRect.top - 6),
            left: Math.max(4, highlightRect.left - 6),
            width: highlightRect.width + 12,
            height: highlightRect.height + 12,
          }}
        />
      )}

      {bubble && !open && (
        <button type="button" className={s.peekBubble} onClick={() => useVirtualitoStore.getState().openChat()}>
          <span className={s.peekIcon}>{bubble.icon}</span>
          <span className={s.peekTextWrap}>
            <span className={s.peekTitle}>{bubble.title}</span>
            <span className={s.peekText}>{bubble.text}</span>
          </span>
        </button>
      )}

      {open && (
        <div className={s.panel} role="dialog" aria-label="Virtualito">
          <div className={s.header}>
            <div className={s.headerAvatarWrap}>
              <img src={avatarImg} alt="Virtualito" className={s.headerAvatar} />
              <span className={s.onlineDot} />
            </div>
            <div className={s.headerInfo}>
              <p className={s.headerName}>Virtualito</p>
              <p className={s.headerSub}>Asistente · Dashboard Ejecutivo SCKora</p>
            </div>
            {tourActive ? (
              <button type="button" className={s.skipBtn} onClick={() => useVirtualitoStore.getState().skipTour()}>
                Saltar
              </button>
            ) : (
              <button
                type="button"
                className={s.closeBtn}
                onClick={() => useVirtualitoStore.getState().closeChat()}
                aria-label="Cerrar"
              >
                ✕
              </button>
            )}
          </div>

          <div className={s.messages} ref={messagesRef}>
            {chatLoading ? (
              <>
                <div className={s.skeletonRow}>
                  <div className={s.skeletonAvatar} />
                  <div className={s.skeletonBubble} style={{ width: '70%' }} />
                </div>
                <div className={s.skeletonRow}>
                  <div className={s.skeletonAvatar} />
                  <div className={s.skeletonBubble} style={{ width: '50%' }} />
                </div>
              </>
            ) : (
              messages.map((m) => (
                <div key={m.id} className={`${s.msgRow} ${m.from === 'user' ? s.msgRowUser : ''}`}>
                  {m.from === 'bot' && <img src={avatarImg} alt="" className={s.msgAvatar} />}
                  <div className={`${s.bubble} ${m.from === 'user' ? s.bubbleUser : s.bubbleBot}`}>
                    <p>{m.text}</p>
                    <span className={s.msgTime}>{m.time}</span>
                  </div>
                </div>
              ))
            )}

            {typing && (
              <div className={s.msgRow}>
                <img src={avatarImg} alt="" className={s.msgAvatar} />
                <div className={`${s.bubble} ${s.bubbleBot} ${s.typingBubble}`}>
                  <span className={s.dot} />
                  <span className={s.dot} />
                  <span className={s.dot} />
                </div>
              </div>
            )}
          </div>

          {tourActive && currentStep ? (
            <div className={s.tourBar}>
              <div className={s.tourProgress}>
                {tourSteps.map((step, i) => (
                  <span
                    key={step.id}
                    className={`${s.tourDot} ${i === tourIndex ? s.tourDotActive : ''}`}
                  />
                ))}
              </div>
              <div className={s.tourActions}>
                <button
                  type="button"
                  className={s.tourBtnGhost}
                  disabled={tourIndex === 0}
                  onClick={() => useVirtualitoStore.getState().prevTourStep()}
                >
                  ← Anterior
                </button>
                <button
                  type="button"
                  className={s.tourBtnPrimary}
                  onClick={() => useVirtualitoStore.getState().nextTourStep()}
                >
                  {isLastStep ? 'Finalizar' : 'Siguiente →'}
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className={s.quickReplies}>
                {QUICK_REPLIES.map((qr) => (
                  <button
                    key={qr.label}
                    type="button"
                    className={s.quickBtn}
                    onClick={() => handleQuickAction(qr)}
                  >
                    {qr.label}
                  </button>
                ))}
              </div>
              <div className={s.inputRow}>
                <input
                  className={s.input}
                  placeholder="Escribe: recorrido, temas, login..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                />
                <button type="button" className={s.sendBtn} onClick={handleSend} aria-label="Enviar">
                  ➤
                </button>
              </div>
            </>
          )}
        </div>
      )}

      <button
        type="button"
        className={`${s.avatarBtn} ${bubble && !open ? s.avatarBtnPulse : ''}`}
        data-tour="virtualito-avatar"
        onClick={() => useVirtualitoStore.getState().toggleChat()}
        aria-label="Abrir Virtualito"
      >
        <img src={avatarImg} alt="Virtualito" className={s.avatarImg} />
      </button>
    </>
  );
}
