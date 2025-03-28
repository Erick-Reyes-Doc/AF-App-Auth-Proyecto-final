import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Definimos el contexto
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
    throw new Error('useSession debe ser usado dentro de un <SessionProvider />');
  }
  return context;
}

// Proveedor del contexto
export function SessionProvider({ children }) {
  const [session, setSession] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Cargar sesión desde AsyncStorage
  useEffect(() => {
    const loadSession = async () => {
      try {
        const storedSession = await AsyncStorage.getItem('session');
        if (storedSession) {
          setSession(JSON.parse(storedSession));
        }
      } catch (error) {
        console.error('Error al cargar la sesión:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadSession();
  }, []);

  // Función para iniciar sesión
  const signIn = useCallback(async (email, password) => {
    try {
      if (!email || !password) {
        throw new Error('Correo y contraseña son obligatorios.');
      }

      const usuarios = JSON.parse(await AsyncStorage.getItem('usuarios')) || [];
      const usuario = usuarios.find((u) => u.email === email && u.password === password);

      if (!usuario) {
        throw new Error('Correo o contraseña incorrectos.');
      }

      const userSession = { user: usuario.email };
      await AsyncStorage.setItem('session', JSON.stringify(userSession));
      setSession(userSession);

      console.log('✅ Sesión iniciada correctamente');
    } catch (error) {
      console.error('Error al iniciar sesión:', error.message);
      throw error;
    }
  }, []);

  // Función para cerrar sesión
  const signOut = useCallback(async () => {
    try {
      await AsyncStorage.removeItem('session');
      setSession(null);
      console.log('✅ Sesión cerrada correctamente');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ signIn, signOut, session, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}
