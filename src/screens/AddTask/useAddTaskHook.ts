import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import Config from 'react-native-config';
import {useAuth} from '../../context/AuthContext';

// Hook personalizado para manejar la lógica de añadir una tarea
export const useAddTaskHook = () => {
  const [title, setTitle] = useState(''); // Estado para almacenar el título de la tarea
  const [description, setDescription] = useState(''); // Estado para almacenar la descripción de la tarea
  const [error, setError] = useState<string | null>(null); // Estado para almacenar errores
  const {token} = useAuth(); // Obtiene el token de autenticación del contexto
  const navigation = useNavigation(); // Hook para la navegación

  // Interfaz para la respuesta de añadir tarea
  interface AddTaskResponse {
    message: string; // Mensaje de respuesta del servidor
    data: [{title: string; description: string}]; // Datos de la tarea añadida
  }

  // Función para manejar la adición de una tarea
  const handleAddTask = async () => {
    setError(null); // Limpia cualquier error previo
    try {
      // Realiza una solicitud POST para añadir la tarea
      const response = await fetch(`${Config.HOST}/api/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Establece el tipo de contenido
          Authorization: `Bearer ${token}`, // Incluye el token de autorización
        },
        body: JSON.stringify({title, description}), // Envía el título y la descripción como cuerpo de la solicitud
      });

      const data: AddTaskResponse = await response.json(); // Convierte la respuesta a JSON

      if (response.ok) {
        // Si la respuesta es satisfactoria
        console.log(`Task ID: ${data.data}`); // Muestra el ID de la tarea en la consola
        navigation.goBack(); // Regresa a la pantalla anterior
      } else {
        console.error(data); // Muestra el error en la consola
        setError(data.message ?? 'Error adding task'); // Establece un mensaje de error
      }
    } catch (fetchError: any) {
      console.error(fetchError); // Muestra el error en la consola
      setError(fetchError.message); // Establece el mensaje de error
    }
  };

  // Devuelve los estados y funciones para ser utilizados en el componente
  return {title, setTitle, description, setDescription, error, handleAddTask};
};
