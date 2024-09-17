import React, {FC} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {taskItemStyle} from './TaskItemStyle';

// Definición de las propiedades que el componente TaskItemComponent recibirá
interface TaskItemComponentProps {
  title: string; // Título de la tarea
  description: string; // Descripción de la tarea
  onLongPress: () => void; // Función que se ejecuta al mantener presionado el elemento
}

// Componente de elemento de tarea funcional
const TaskItemComponent: FC<TaskItemComponentProps> = ({
  title,
  description,
  onLongPress,
}) => {
  return (
    <TouchableOpacity
      onLongPress={onLongPress} // Maneja el evento de mantener presionado
      style={taskItemStyle.taskContainer}>
      {/* Estilo del contenedor de la tarea */}
      <Text style={taskItemStyle.taskTitle}>{title}</Text>
      {/* Muestra el título de la tarea */}
      <Text>{description}</Text>
      {/* Muestra la descripción de la tarea */}
    </TouchableOpacity>
  );
};

export default TaskItemComponent; // Exporta el componente TaskItemComponent
