import {useState} from 'react';
import {useAuth} from '../../context/AuthContext';

export const useHeaderButtonHook = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const {logout} = useAuth();

  const handleLogout = () => {
    logout();
    setModalVisible(false);
  };

  return {modalVisible, setModalVisible, handleLogout};
};
