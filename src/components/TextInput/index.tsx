import React, {FC} from 'react';
import {Text, TextInput, TextInputProps, View} from 'react-native';
import {textInputStyle} from './TextInputStyle';

// Definición de las propiedades que el componente TextInputComponent recibirá
interface TextInputComponentProps extends TextInputProps {
  label?: string; // Etiqueta opcional que se mostrará encima del campo de entrada
  value: string; // Valor del campo de entrada
  onChangeText: (text: string) => void; // Función que se ejecutará al cambiar el texto
  placeholder?: string; // Texto que se mostrará cuando el campo esté vacío (opcional)
  numberOfLines?: number; // Número de líneas que se mostrarán (opcional, por defecto 1)
}

// Componente de entrada de texto funcional
const TextInputComponent: FC<TextInputComponentProps> = ({
  label,
  value,
  onChangeText,
  placeholder = '', // Valor por defecto para el placeholder
  numberOfLines = 1, // Valor por defecto para el número de líneas
  ...rest // Propiedades adicionales que se pasarán al componente TextInput
}) => {
  return (
    <View style={textInputStyle.container}>
      {/* Contenedor para el campo de entrada */}
      {label && <Text style={textInputStyle.label}>{label}</Text>}
      {/* Muestra la etiqueta si está definida */}
      <TextInput
        style={[
          textInputStyle.input, // Estilo base para el campo de entrada
          numberOfLines > 1 && textInputStyle.textArea, // Aplica estilo de área de texto si hay más de una línea
        ]}
        value={value} // Valor actual del campo de entrada
        onChangeText={onChangeText} // Maneja el cambio de texto
        placeholder={placeholder} // Texto que se muestra cuando el campo está vacío
        numberOfLines={numberOfLines} // Número de líneas permitidas
        multiline={numberOfLines > 1} // Habilita el modo multiline si hay más de una línea
        {...rest} // Propiedades adicionales
      />
    </View>
  );
};

export default TextInputComponent;
