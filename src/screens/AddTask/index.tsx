import React, {ReactElement} from 'react';
import {View} from 'react-native';
import ButtonComponent from '../../components/Button';
import ErrorMessageComponent from '../../components/ErrorMessage';
import TextInputComponent from '../../components/TextInput';
import {addTaskStyle} from './AddTaskStyle';
import {useAddTaskHook} from './useAddTaskHook';

// Componente de pantalla para añadir una tarea
const AddTaskScreen = (): ReactElement => {
  // Hook para manejar la lógica de añadir una tarea
  const {title, setTitle, description, setDescription, error, handleAddTask} =
    useAddTaskHook();

  return (
    <View style={addTaskStyle.container}>
      {/* Contenedor principal de la pantalla */}
      {/* Campo para el título de la tarea */}
      <TextInputComponent
        placeholder="Title" // Texto que se muestra cuando el campo está vacío
        value={title} // Valor actual del título
        onChangeText={setTitle} // Actualiza el estado del título al cambiar el texto
        autoFocus={true} // Enfoca automáticamente este campo al cargar la pantalla
      />
      {/* Campo para la descripción de la tarea */}
      <TextInputComponent
        placeholder="Description" // Texto que se muestra cuando el campo está vacío
        value={description} // Valor actual de la descripción
        onChangeText={setDescription} // Actualiza el estado de la descripción al cambiar el texto
        numberOfLines={5} // Número de líneas para el campo de descripción
      />
      {/* Botón para añadir la tarea */}
      <ButtonComponent title="ADD TASK" onPress={handleAddTask} />
      {/* Muestra un mensaje de error si existe */}
      {error && <ErrorMessageComponent message={error} align="center" />}
    </View>
  );
};

export default AddTaskScreen;
