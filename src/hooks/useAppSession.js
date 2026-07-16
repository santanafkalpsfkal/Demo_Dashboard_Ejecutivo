import { useCallback, useEffect, useState } from 'react';
import { userServices } from '../services/userServices';

function readUser() {
  try {
    return userServices.getCurrentUser();
  } catch {
    return null;
  }
}

/** Sesión sincrónica + reactiva — una sola fuente para todo el router */
export function useAppSession() {
  const [user, setUser] = useState(readUser);
  const [ready] = useState(true);

  const sync = useCallback(() => {
    setUser(readUser());
  }, []);

  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === 'userData' || e.key === 'authToken') sync();
    };
    const onSessionChanged = () => sync();
    window.addEventListener('storage', onStorage);
    window.addEventListener('session-changed', onSessionChanged);
    return () => {
      window.removeEventListener('storage', onStorage);
      window.removeEventListener('session-changed', onSessionChanged);
    };
  }, [sync]);

  return { user, ready, isAuthenticated: !!user, isAdmin: user?.role === 'admin' };
}
