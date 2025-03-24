// ctx.js
import { createContext, useContext } from 'react';
import { useStorageState } from './useStorageState';

// Define la forma que tendrá nuestro contexto
const AuthContext = createContext({
  signIn: () => null,
  signOut: () => null,
  session: null,
  isLoading: false,
});

// Hook personalizado para acceder al contexto
export function useSession() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useSession must be used within a <SessionProvider />');
  }
  return context;
}

// Proveedor del contexto de sesión
export function SessionProvider({ children }) {
  const [[isLoading, session], setSession] = useStorageState('session');

  return (
    <AuthContext.Provider
      value={{
        signIn: (email = 'demo@greenmate.com') => {
          // Aquí puedes conectar con Supabase o API real
          setSession({ user: email }); // Guardamos sesión simulada
        },
        signOut: () => {
          setSession(null); // Limpia la sesión
        },
        session,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
