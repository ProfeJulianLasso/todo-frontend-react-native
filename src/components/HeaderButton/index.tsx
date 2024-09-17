import React from 'react';
import {Modal, Text, TouchableOpacity, View} from 'react-native';
import {headerButtonStyle} from './HeaderButtonStyle';
import {useHeaderButtonHook} from './useHeaderButtonHook';

// Componente del botón de encabezado
const HeaderButtonComponent = () => {
  // Hook para manejar la lógica del botón de encabezado
  const {modalVisible, setModalVisible, handleLogout} = useHeaderButtonHook();

  return (
    <View>
      {/* Botón que al presionarse muestra el modal */}
      <TouchableOpacity
        onPress={() => setModalVisible(true)} // Abre el modal al presionar
        style={headerButtonStyle.button}>
        <Text style={headerButtonStyle.buttonText}>⋮</Text>
        {/* Ícono del botón */}
      </TouchableOpacity>

      {/* Modal que se muestra al presionar el botón */}
      <Modal
        animationType="fade" // Tipo de animación al mostrar el modal
        transparent={true} // Hace que el fondo del modal sea transparente
        visible={modalVisible} // Controla la visibilidad del modal
        onRequestClose={() => setModalVisible(false)}>
        {/* Cierra el modal al solicitarlo */}
        <View style={headerButtonStyle.modalOverlay}>
          {/* Contenedor del fondo del modal */}
          <View style={headerButtonStyle.modalContainer}>
            {/* Contenedor principal del modal */}
            <Text style={headerButtonStyle.modalTitle}>Options</Text>
            {/* Título del modal */}
            {/* Botón para cerrar sesión */}
            <TouchableOpacity
              style={headerButtonStyle.modalButton}
              onPress={handleLogout}>
              <Text style={headerButtonStyle.modalButtonText}>LOGOUT</Text>
              {/* Texto del botón */}
            </TouchableOpacity>
            {/* Botón para cancelar y cerrar el modal */}
            <TouchableOpacity
              style={headerButtonStyle.modalButton}
              onPress={() => setModalVisible(false)}>
              <Text style={headerButtonStyle.modalButtonText}>CANCEL</Text>
              {/* Texto del botón */}
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default HeaderButtonComponent; // Exporta el componente HeaderButtonComponent
