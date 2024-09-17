import React, {FC} from 'react';
import {Text, View} from 'react-native';
import {errorMessageStyle} from './ErrorMessageStyle';

// Definición de las propiedades que el componente ErrorMessageComponent recibirá
interface ErrorMessageComponentProps {
  message: string; // Mensaje de error que se mostrará
  align?: 'left' | 'center' | 'right'; // Alineación del texto (opcional, por defecto 'left')
}

// Componente de mensaje de error funcional
const ErrorMessageComponent: FC<ErrorMessageComponentProps> = ({
  message,
  align = 'left', // Valor por defecto para la alineación
}) => {
  return (
    <View style={errorMessageStyle.container}>
      {' '}
      {/* Contenedor para el mensaje de error */}
      <Text style={[errorMessageStyle.errorText, {textAlign: align}]}>
        {message} {/* Muestra el mensaje de error */}
      </Text>
    </View>
  );
};

export default ErrorMessageComponent;
