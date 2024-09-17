import Config from 'react-native-config';
import {IServerResponse} from '../common/interfaces/ServerResponseInterface';
import {ITask} from '../common/interfaces/TaskInterface';

// Servicio de API para manejar tareas
const apiService = {
  // Función para obtener tareas desde un endpoint
  fetchTasks: async (endpoint: string, token: string) => {
    const response = await fetch(endpoint, {
      headers: {Authorization: `Bearer ${token}`}, // Incluye el token de autorización en la cabecera
    });

    // Verifica si la respuesta fue satisfactoria
    if (!response.ok) {
      const data: IServerResponse<null> = await response.json(); // Convierte la respuesta a JSON
      throw new Error(data.message || 'Error fetching tasks'); // Lanza un error con el mensaje correspondiente
    }

    return (await response.json()) as IServerResponse<ITask[]>; // Devuelve los datos de la respuesta en formato JSON
  },

  // Función para actualizar el estado de una tarea
  updateTaskStatus: async (
    taskId: string, // ID de la tarea a actualizar
    action: 'todo' | 'inprogress' | 'completed', // Acción que se desea realizar
    token: string, // Token de autorización
  ) => {
    // Define los endpoints para cada acción
    const endpoints = {
      todo: `${Config.HOST}/api/tasks/${taskId}/to-do`, // Endpoint para marcar como "por hacer"
      inprogress: `${Config.HOST}/api/tasks/${taskId}/in-progress`, // Endpoint para marcar como "en progreso"
      completed: `${Config.HOST}/api/tasks/${taskId}/completed`, // Endpoint para marcar como "completada"
    };

    // Realiza la solicitud PUT al endpoint correspondiente
    const response = await fetch(endpoints[action], {
      method: 'PUT', // Método de la solicitud
      headers: {Authorization: `Bearer ${token}`}, // Incluye el token de autorización en la cabecera
    });

    // Verifica si la respuesta fue satisfactoria
    if (!response.ok) {
      const data: IServerResponse<null> = await response.json(); // Convierte la respuesta a JSON
      throw new Error(data.message || 'Error updating task status'); // Lanza un error con el mensaje correspondiente
    }

    return (await response.json()) as IServerResponse<null>; // Devuelve los datos de la respuesta en formato JSON
  },
};

export default apiService; // Exporta el servicio de API
