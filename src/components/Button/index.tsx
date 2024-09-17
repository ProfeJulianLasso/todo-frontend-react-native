import React, {FC} from 'react';
import {GestureResponderEvent, Text, TouchableOpacity} from 'react-native';
import {buttonStyle} from './ButtonStyle';

// Definición de las propiedades que el componente ButtonComponent recibirá
interface ButtonComponentProps {
  title: string; // Título que se mostrará en el botón
  onPress: (event: GestureResponderEvent) => void; // Función que se ejecutará al presionar el botón
}

// Componente de botón funcional
const ButtonComponent: FC<ButtonComponentProps> = ({title, onPress}) => {
  return (
    // TouchableOpacity es un contenedor que puede detectar toques
    <TouchableOpacity style={buttonStyle.button} onPress={onPress}>
      {/* Texto que se muestra dentro del botón */}
      <Text style={buttonStyle.text}>{title}</Text>
    </TouchableOpacity>
  );
};

export default ButtonComponent;
