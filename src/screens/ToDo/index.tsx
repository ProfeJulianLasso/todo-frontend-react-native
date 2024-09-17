import React, {ReactElement} from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Text,
  View,
} from 'react-native';
import ErrorMessageComponent from '../../components/ErrorMessage';
import ModalComponent from '../../components/Modal';
import TaskItemComponent from '../../components/TaskItem';
import {toDoStyle} from './ToDoStyle';
import {useToDoHook} from './useToDoHook';

// Componente de pantalla de tareas por hacer
const ToDoScreen = (): ReactElement => {
  // Hook para manejar la lógica de la pantalla de tareas
  const {
    tasks, // Lista de tareas
    actions, // Acciones para la tarea seleccionada
    loading, // Estado de carga
    refreshing, // Estado de refresco
    error, // Mensaje de error
    modalVisible, // Estado de visibilidad del modal
    selectedTask, // Tarea seleccionada
    onRefresh, // Función para refrescar la lista de tareas
    handleOpenModal, // Función para abrir el modal
    handleCloseModal, // Función para cerrar el modal
  } = useToDoHook();

  // Muestra un indicador de carga mientras se obtienen las tareas
  if (loading) {
    return (
      <View style={toDoStyle.center}>
        {/* Contenedor centrado para el indicador */}
        <ActivityIndicator size="large" color="#007bff" />
        {/* Indicador de carga */}
      </View>
    );
  }

  // Si hay un error, muestra un mensaje de error
  if (error) {
    return (
      <View style={toDoStyle.center}>
        {/* Contenedor centrado para el mensaje de error */}
        <ErrorMessageComponent message={error} />
        {/* Componente para mostrar el mensaje de error */}
      </View>
    );
  }

  // Renderiza la lista de tareas
  return (
    <View style={toDoStyle.container}>
      {/* Contenedor principal de la pantalla */}
      <FlatList
        data={tasks} // Datos de la lista (tareas)
        keyExtractor={item => item.taskId} // Clave única para cada tarea
        renderItem={(
          {item}, // Renderiza cada tarea
        ) => (
          <TaskItemComponent
            title={item.title} // Título de la tarea
            description={item.description} // Descripción de la tarea
            onLongPress={() => handleOpenModal(item)} // Abre el modal al mantener presionado
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} /> // Control de refresco para actualizar la lista
        }
      />
      {/* Componente modal para acciones de la tarea seleccionada */}
      <ModalComponent
        visible={modalVisible} // Controla la visibilidad del modal
        onRequestClose={handleCloseModal} // Función para cerrar el modal
        title={selectedTask?.title ?? 'Options'} // Título del modal, muestra el título de la tarea seleccionada o 'Options'
        actions={actions}>
        {/* Acciones disponibles para la tarea */}
        <Text>Select an action for this task.</Text>
        {/* Instrucción dentro del modal */}
      </ModalComponent>
    </View>
  );
};

export default ToDoScreen; // Exporta el componente ToDoScreen
