import React from 'react';
import {Modal, Text, TouchableOpacity, View} from 'react-native';
import {headerButtonStyle} from './HeaderButtonStyle';
import {useHeaderButtonHook} from './useHeaderButtonHook';

const HeaderButtonComponent = () => {
  const {modalVisible, setModalVisible, handleLogout} = useHeaderButtonHook();

  return (
    <View>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={headerButtonStyle.button}>
        <Text style={headerButtonStyle.buttonText}>⋮</Text>
      </TouchableOpacity>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={headerButtonStyle.modalOverlay}>
          <View style={headerButtonStyle.modalContainer}>
            <Text style={headerButtonStyle.modalTitle}>Options</Text>
            <TouchableOpacity
              style={headerButtonStyle.modalButton}
              onPress={handleLogout}>
              <Text style={headerButtonStyle.modalButtonText}>LOGOUT</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={headerButtonStyle.modalButton}
              onPress={() => setModalVisible(false)}>
              <Text style={headerButtonStyle.modalButtonText}>CANCEL</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default HeaderButtonComponent;
