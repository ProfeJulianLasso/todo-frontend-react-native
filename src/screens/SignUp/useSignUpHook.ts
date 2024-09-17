import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useState} from 'react';
import Config from 'react-native-config';
import {RootStackParamList} from '../../navigation/RootNavigator';

// Hook personalizado para manejar la lógica de registro
export const useSignUpHook = () => {
  // Definición del tipo de navegación para la pantalla de registro
  type SignUpScreenNavigationProp =
    NativeStackNavigationProp<RootStackParamList>;

  // Estados para almacenar los datos del formulario
  const [name, setName] = useState(''); // Estado para el nombre
  const [email, setEmail] = useState(''); // Estado para el correo electrónico
  const [password, setPassword] = useState(''); // Estado para la contraseña
  const [confirmPassword, setConfirmPassword] = useState(''); // Estado para confirmar la contraseña
  const [errorPassword, setErrorPassword] = useState(''); // Estado para errores de contraseña
  const [error, setError] = useState<string | null>(null); // Estado para errores generales
  const [loading, setLoading] = useState(false); // Estado para indicar si está cargando
  const navigation = useNavigation<SignUpScreenNavigationProp>(); // Hook para la navegación

  // Función para verificar si las contraseñas coinciden
  const handleVerifyPassword = (): boolean => {
    if (password !== confirmPassword) {
      setErrorPassword('Passwords do not match'); // Establece un mensaje de error si no coinciden
      return false;
    }
    setErrorPassword(''); // Limpia el mensaje de error si coinciden
    return true;
  };

  // Función para manejar el registro del usuario
  const handleRegister = async (): Promise<void> => {
    if (!handleVerifyPassword()) {
      // Verifica las contraseñas antes de continuar
      return;
    }

    setError(null); // Limpia los errores
    setLoading(true); // Indica que está cargando

    try {
      // Realiza la solicitud POST para registrar al usuario
      const response = await fetch(`${Config.HOST}/api/user/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Establece el tipo de contenido
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await response.json(); // Convierte la respuesta a JSON

      if (response.ok) {
        // Si la respuesta es satisfactoria
        console.log('User registered successfully:', data.data); // Muestra un mensaje en la consola
        navigation.navigate('Login'); // Navega a la pantalla de inicio de sesión
      } else if (data.message instanceof Array) {
        // Si hay múltiples mensajes de error
        setError(data.message.join(', ')); // Establece los errores en el estado
      } else {
        setError(data.message ?? 'Failed to register user. Please try again.'); // Establece un mensaje de error general
      }
    } catch (fetchError: any) {
      console.error('Error during registration:', fetchError); // Muestra un error en la consola
      setError(
        'An error occurred during registration. Please try again later.', // Establece un mensaje de error
      );
    } finally {
      setLoading(false); // Indica que ha terminado de cargar
    }
  };

  // Devuelve los estados y funciones para ser utilizados en el componente
  return {
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    errorPassword,
    error,
    loading,
    handleRegister,
    navigation,
  };
};
