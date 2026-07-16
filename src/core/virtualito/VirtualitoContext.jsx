/**
 * Slot / contexto preparado para Virtualito (asistente contextual).
 * En fase 2 se conectará el chat sin rediseñar el layout.
 */
import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';

const VirtualitoContext = createContext(null);

export function VirtualitoProvider({ children }) {
  const [open, setOpen] = useState(false);
  const [enabled] = useState(false); // fase 2: activar asistente
  const [contextPage, setContextPage] = useState(null);

  const openAssistant = useCallback((pageMeta) => {
    if (pageMeta) setContextPage(pageMeta);
    setOpen(true);
  }, []);

  const closeAssistant = useCallback(() => setOpen(false), []);
  const toggleAssistant = useCallback(() => setOpen((v) => !v), []);

  const value = useMemo(
    () => ({
      enabled,
      open,
      contextPage,
      setContextPage,
      openAssistant,
      closeAssistant,
      toggleAssistant,
    }),
    [enabled, open, contextPage, openAssistant, closeAssistant, toggleAssistant]
  );

  return (
    <VirtualitoContext.Provider value={value}>{children}</VirtualitoContext.Provider>
  );
}

export function useVirtualito() {
  const ctx = useContext(VirtualitoContext);
  if (!ctx) throw new Error('useVirtualito must be used within VirtualitoProvider');
  return ctx;
}

/** Contenedor visual reservado — no visible hasta fase 2 */
export function VirtualitoSlot() {
  const { enabled, open, closeAssistant, contextPage } = useVirtualito();
  if (!enabled) return null;

  return (
    <aside
      className={`virtualito-slot ${open ? 'is-open' : ''}`}
      aria-hidden={!open}
      data-context={contextPage?.path || ''}
    >
      <header className="virtualito-slot__header">
        <span>Virtualito</span>
        <button type="button" onClick={closeAssistant} aria-label="Cerrar asistente">
          ×
        </button>
      </header>
      <div className="virtualito-slot__body">
        {/* Fase 2: chat contextual SCKora */}
      </div>
    </aside>
  );
}
