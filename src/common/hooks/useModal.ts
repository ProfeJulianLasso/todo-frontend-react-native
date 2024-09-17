import {useState} from 'react';
import {ITask} from '../interfaces/TaskInterface';

// Hook personalizado para manejar la lógica del modal
export const useModal = () => {
  const [modalVisible, setModalVisible] = useState(false); // Estado para controlar la visibilidad del modal
  const [selectedTask, setSelectedTask] = useState<ITask | null>(null); // Estado para almacenar la tarea seleccionada (puede ser null)

  // Función para abrir el modal y establecer la tarea seleccionada
  const handleOpenModal = (task: ITask) => {
    setSelectedTask(task); // Establece la tarea seleccionada
    setModalVisible(true); // Cambia la visibilidad del modal a verdadero
  };

  // Función para cerrar el modal y limpiar la tarea seleccionada
  const handleCloseModal = () => {
    setModalVisible(false); // Cambia la visibilidad del modal a falso
    setSelectedTask(null); // Limpia la tarea seleccionada
  };

  // Devuelve el estado y las funciones para ser utilizados en el componente
  return {modalVisible, selectedTask, handleOpenModal, handleCloseModal};
};
