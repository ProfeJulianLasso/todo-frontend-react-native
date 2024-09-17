import React from 'react';
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
import {inProgressStyle} from './InProgressStyle';
import {useInProgressHook} from './useInProgressHook';

// Componente de pantalla de tareas en progreso
const InProgressScreen = (): React.ReactElement => {
  // Hook para manejar la lógica de la pantalla de tareas en progreso
  const {
    tasks, // Lista de tareas en progreso
    actions, // Acciones disponibles para la tarea seleccionada
    loading, // Estado de carga
    refreshing, // Estado de refresco
    error, // Mensaje de error
    modalVisible, // Estado de visibilidad del modal
    selectedTask, // Tarea seleccionada
    onRefresh, // Función para refrescar la lista de tareas
    handleOpenModal, // Función para abrir el modal
    handleCloseModal, // Función para cerrar el modal
  } = useInProgressHook();

  // Muestra un indicador de carga mientras se obtienen las tareas
  if (loading) {
    return (
      <View style={inProgressStyle.center}>
        {/* Contenedor centrado para el indicador */}
        <ActivityIndicator size="large" color="#007bff" />
        {/* Indicador de carga */}
      </View>
    );
  }

  // Si hay un error, muestra un mensaje de error
  if (error) {
    return (
      <View style={inProgressStyle.center}>
        {/* Contenedor centrado para el mensaje de error */}
        <ErrorMessageComponent message={error} />
        {/* Componente para mostrar el mensaje de error */}
      </View>
    );
  }

  // Renderiza la lista de tareas en progreso
  return (
    <View style={inProgressStyle.container}>
      {/* Contenedor principal de la pantalla */}
      <FlatList
        data={tasks} // Datos de la lista (tareas en progreso)
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

export default InProgressScreen; // Exporta el componente InProgressScreen
