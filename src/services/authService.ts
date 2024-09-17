import Config from 'react-native-config';
import {IServerResponse} from '../common/interfaces/ServerResponseInterface';

// Servicio de autenticación
const authService = {
  // Función para iniciar sesión
  login: async (email: string, password: string) => {
    // Realiza una solicitud POST al endpoint de login
    const response = await fetch(`${Config.HOST}/api/login`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'}, // Establece el tipo de contenido a JSON
      body: JSON.stringify({email, password}), // Convierte el email y password a formato JSON
    });

    // Convierte la respuesta a formato JSON
    const data: IServerResponse<string> = await response.json();

    // Si el servidor responde con un estado 401 (no autorizado), lanza un error con el mensaje correspondiente
    if (response.status === 401) {
      console.error('Unauthorized');
      throw new Error(data.message);
    }

    // Si la respuesta no es satisfactoria (código diferente de 200-299), lanza un error
    if (!response.ok) {
      throw new Error(data.message);
    }

    // Devuelve los datos obtenidos en la respuesta si todo fue exitoso
    return data.data;
  },

  // Función para cerrar sesión (en este caso solo imprime un mensaje en la consola)
  logout: () => {
    console.log('Logout');
  },
};

// Exporta el servicio de autenticación
export default authService;
