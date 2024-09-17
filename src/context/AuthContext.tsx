import React, {
  createContext,
  FC,
  ReactNode,
  useContext,
  useMemo,
  useState,
} from 'react';
import authService from '../services/authService';

// Definición de las propiedades que tendrá el contexto de autenticación
interface AuthContextProps {
  token: string | null; // Almacena el token de autenticación o null si no está autenticado
  login: (email: string, password: string) => Promise<void>; // Función para iniciar sesión
  logout: () => void; // Función para cerrar sesión
  isAuthenticated: boolean; // Indica si el usuario está autenticado
}

// Definición de las propiedades que tendrá el proveedor de autenticación
interface AuthProviderProps {
  children: ReactNode; // Los componentes hijos que estarán dentro del proveedor
}

// Creación del contexto de autenticación
const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// Hook personalizado para utilizar el contexto de autenticación
export const useAuth = () => {
  const context = useContext(AuthContext);
  // Si el hook se utiliza fuera del proveedor de autenticación, lanza un error
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Componente proveedor de autenticación
export const AuthProvider: FC<AuthProviderProps> = ({children}) => {
  const [token, setToken] = useState<string | null>(null); // Estado para almacenar el token de autenticación

  // Función para iniciar sesión
  const login = async (email: string, password: string): Promise<void> => {
    try {
      const receivedToken = await authService.login(email, password); // Llama al servicio de autenticación para obtener el token
      setToken(receivedToken); // Guarda el token recibido en el estado
    } catch (error: any) {
      console.error('Error logging in', error); // Imprime el error en la consola
      throw error; // Lanza el error para que sea manejado por el componente que llama a esta función
    }
  };

  // Función para cerrar sesión
  const logout = () => {
    authService.logout(); // Llama al servicio de autenticación para cerrar sesión
    setToken(null); // Elimina el token del estado, lo que indica que el usuario ya no está autenticado
  };

  // Variable que indica si el usuario está autenticado (si existe un token)
  const isAuthenticated = !!token;

  // Memoriza el valor del contexto para evitar renders innecesarios
  const value = useMemo(
    () => ({token, login, logout, isAuthenticated}),
    [isAuthenticated, token],
  );

  // Provee el contexto de autenticación a los componentes hijos
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
