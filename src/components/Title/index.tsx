import React, {FC} from 'react';
import {Text, TextStyle} from 'react-native';
import {titleStyle} from './TitleStyle';

// Definición de las propiedades que el componente TitleComponent recibirá
interface TitleComponentProps {
  text: string; // Texto que se mostrará como título
  size?: number; // Tamaño de la fuente del título (opcional, por defecto 24)
  align?: 'left' | 'center' | 'right'; // Alineación del texto (opcional, por defecto 'center')
  style?: TextStyle; // Estilos adicionales para aplicar al texto (opcional)
}

// Componente de título funcional
const TitleComponent: FC<TitleComponentProps> = ({
  text,
  size = 24, // Valor por defecto para el tamaño
  align = 'center', // Valor por defecto para la alineación
  style,
}) => {
  return (
    // Componente Text que muestra el título con estilos aplicados
    <Text style={[titleStyle.title, {fontSize: size, textAlign: align}, style]}>
      {text} {/* Muestra el texto del título */}
    </Text>
  );
};

export default TitleComponent;
