import {useState} from 'react';
import apiService from '../../services/apiService';
import {ITask} from '../interfaces/TaskInterface';

// Hook personalizado para obtener tareas desde un endpoint
export const useFetchTasks = (endpoint: string) => {
  const [tasks, setTasks] = useState<ITask[]>([]); // Estado para almacenar la lista de tareas
  const [loading, setLoading] = useState<boolean>(true); // Estado para indicar si se está cargando
  const [error, setError] = useState<string | null>(null); // Estado para almacenar errores

  // Función para obtener tareas desde el API
  const fetchTasks = async (token: string) => {
    try {
      const data = await apiService.fetchTasks(endpoint, token); // Llama al servicio API para obtener las tareas
      setTasks(data.data); // Establece las tareas en el estado
    } catch (err: any) {
      setError(err.message); // Establece el mensaje de error en el estado si ocurre un error
    } finally {
      setLoading(false); // Cambia el estado de carga a falso una vez que se completa la solicitud
    }
  };

  // Devuelve las tareas, el estado de carga, los errores y la función para obtener tareas
  return {tasks, loading, error, fetchTasks};
};
