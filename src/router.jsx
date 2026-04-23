import { createContext, useContext, useState, useCallback } from 'react';

export const RouterContext = createContext(null);

export function useRouter() {
  const ctx = useContext(RouterContext);
  if (!ctx) throw new Error('useRouter must be used inside RouterProvider');
  return ctx;
}

export function RouterProvider({ children }) {
  const [page, setPage] = useState('home');
  const [routeState, setRouteState] = useState({});

  const navigate = useCallback((to, state = {}) => {
    setPage(to);
    setRouteState(state);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <RouterContext.Provider value={{ page, navigate, routeState }}>
      {children}
    </RouterContext.Provider>
  );
}


