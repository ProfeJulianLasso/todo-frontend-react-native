import {useFocusEffect} from '@react-navigation/native';
import {useCallback, useState} from 'react';
import Config from 'react-native-config';
import {useFetchTasks} from '../../common/hooks/useFetchTasksHook';
import {useModal} from '../../common/hooks/useModal';
import {useAuth} from '../../context/AuthContext';
import apiService from '../../services/apiService';

// Hook personalizado para manejar la lógica de la pantalla de tareas en progreso
export const useInProgressHook = () => {
  const {token} = useAuth(); // Obtiene el token de autenticación del contexto
  // Llama al hook para obtener tareas desde el endpoint de tareas en progreso
  const {tasks, loading, error, fetchTasks} = useFetchTasks(
    `${Config.HOST}/api/tasks/in-progress`,
  );

  const [refreshing, setRefreshing] = useState(false); // Estado para manejar el refresco de la lista de tareas
  const {modalVisible, selectedTask, handleOpenModal, handleCloseModal} =
    useModal(); // Hook para manejar el modal

  // Efecto que se ejecuta cuando la pantalla está enfocada
  useFocusEffect(
    useCallback(() => {
      fetchTasks(token ?? ''); // Llama a la función para obtener tareas, pasando el token
    }, [fetchTasks, token]),
  );

  // Función para refrescar la lista de tareas
  const onRefresh = () => {
    setRefreshing(true); // Establece el estado de refresco a verdadero
    fetchTasks(token ?? '').finally(() => setRefreshing(false)); // Obtiene las tareas y cambia el estado de refresco a falso al finalizar
  };

  // Función para actualizar el estado de una tarea
  const handleUpdateTaskStatus = async (
    taskId: string, // ID de la tarea a actualizar
    status: 'todo' | 'completed', // Nuevo estado de la tarea
  ) => {
    try {
      // Llama al servicio API para actualizar el estado de la tarea
      await apiService.updateTaskStatus(taskId, status, token ?? '');
      fetchTasks(token ?? ''); // Vuelve a obtener las tareas después de actualizar
      handleCloseModal(); // Cierra el modal
    } catch (err: any) {
      console.error('Error updating task status:', err.message); // Muestra un error en la consola si ocurre
    }
  };

  // Definición de las acciones disponibles para la tarea seleccionada en el modal
  const actions = [
    {
      label: 'TODO', // Etiqueta para marcar como "por hacer"
      onPress: () => handleUpdateTaskStatus(selectedTask?.taskId ?? '', 'todo'), // Actualiza el estado al presionar
    },
    {
      label: 'COMPLETED', // Etiqueta para marcar como "completada"
      onPress: () =>
        handleUpdateTaskStatus(selectedTask?.taskId ?? '', 'completed'), // Actualiza el estado al presionar
    },
    {label: 'CANCEL', onPress: handleCloseModal}, // Acción para cancelar y cerrar el modal
  ];

  // Devuelve los estados y funciones para ser utilizados en el componente
  return {
    tasks,
    actions,
    loading,
    refreshing,
    error,
    modalVisible,
    selectedTask,
    onRefresh,
    handleOpenModal,
    handleCloseModal,
  };
};
