import React, {FC} from 'react';
import {
  GestureResponderEvent,
  Text,
  TextStyle,
  TouchableOpacity,
} from 'react-native';
import {linkStyle} from './LinkStyle';

// Definición de las propiedades que el componente LinkComponent recibirá
interface LinkComponentProps {
  text: string; // Texto que se mostrará como enlace
  onPress: (event: GestureResponderEvent) => void; // Función que se ejecutará al presionar el enlace
  style?: TextStyle; // Estilos adicionales para aplicar al texto (opcional)
}

// Componente de enlace funcional
const LinkComponent: FC<LinkComponentProps> = ({text, onPress, style}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      {/* Contenedor que detecta el toque */}
      <Text style={[linkStyle.link, style]}>{text}</Text>
      {/* Texto del enlace con estilos aplicados */}
    </TouchableOpacity>
  );
};

export default LinkComponent;
