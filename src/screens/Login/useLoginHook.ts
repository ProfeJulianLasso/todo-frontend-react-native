import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useState} from 'react';
import {useAuth} from '../../context/AuthContext';
import {RootStackParamList} from '../../navigation/RootNavigator';

// Hook personalizado para manejar la lógica de inicio de sesión
export const useLoginHook = () => {
  // Definición del tipo de navegación para la pantalla de inicio de sesión
  type LoginScreenNavigationProp =
    NativeStackNavigationProp<RootStackParamList>;

  const navigation = useNavigation<LoginScreenNavigationProp>(); // Hook para la navegación
  const {login} = useAuth(); // Extrae la función de login del contexto de autenticación
  const [email, setEmail] = useState(''); // Estado para almacenar el correo electrónico
  const [password, setPassword] = useState(''); // Estado para almacenar la contraseña
  const [error, setError] = useState(''); // Estado para almacenar errores de inicio de sesión

  // Función para manejar el inicio de sesión
  const handleLogin = async () => {
    // Llama a la función de login del contexto de autenticación
    login(email, password).catch(loginError => {
      setError(loginError.message); // Establece el mensaje de error si ocurre un error
    });
  };

  // Devuelve los estados y funciones para ser utilizados en el componente
  return {
    email,
    setEmail,
    password,
    setPassword,
    error,
    handleLogin,
    navigation,
  };
};
