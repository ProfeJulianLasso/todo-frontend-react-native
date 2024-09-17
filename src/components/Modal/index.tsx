import React, {FC, ReactNode} from 'react';
import {Modal, Text, TouchableOpacity, View} from 'react-native';
import {modalStyle} from './ModalStyle';

// Definición de las propiedades que el componente ModalComponent recibirá
interface ModalComponentProps {
  visible: boolean; // Indica si el modal debe ser visible
  onRequestClose: () => void; // Función que se ejecuta al cerrar el modal
  title: string; // Título del modal
  children: ReactNode; // Contenido que se mostrará dentro del modal
  actions: Array<{label: string; onPress: () => void}>; // Acciones (botones) que se mostrarán en el modal
}

// Componente de modal funcional
const ModalComponent: FC<ModalComponentProps> = ({
  visible,
  onRequestClose,
  title,
  children,
  actions,
}) => {
  return (
    <Modal
      visible={visible} // Propiedad para controlar la visibilidad del modal
      animationType="fade" // Tipo de animación al mostrar el modal
      transparent={true} // Hace que el fondo del modal sea transparente
      onRequestClose={onRequestClose} // Llama a la función al intentar cerrar el modal
    >
      <View style={modalStyle.modalOverlay}>
        {/* Contenedor del fondo del modal */}
        <View style={modalStyle.modalContainer}>
          {/* Contenedor principal del modal */}
          <Text style={modalStyle.modalTitle}>{title}</Text>
          {/* Título del modal */}
          <View>{children}</View>
          {/* Contenido adicional del modal */}
          {actions.map(
            (
              action,
              index, // Mapea las acciones y crea botones
            ) => (
              <TouchableOpacity
                key={action.label + index} // Clave única para cada botón
                style={modalStyle.modalButton} // Estilo del botón
                onPress={action.onPress}>
                {/* Función que se ejecuta al presionar el botón */}
                <Text style={modalStyle.modalButtonText}>{action.label}</Text>
                {/* Texto del botón */}
              </TouchableOpacity>
            ),
          )}
        </View>
      </View>
    </Modal>
  );
};

export default ModalComponent; // Exporta el componente ModalComponent
