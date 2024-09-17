import React, {ReactElement} from 'react';
import {View} from 'react-native';
import ButtonComponent from '../../components/Button';
import ErrorMessageComponent from '../../components/ErrorMessage';
import LinkComponent from '../../components/Link';
import TextInputComponent from '../../components/TextInput';
import TitleComponent from '../../components/Title';
import {loginStyle} from './LoginStyle';
import {useLoginHook} from './useLoginHook';

// Componente de pantalla de inicio de sesión
const LoginScreen = (): ReactElement => {
  // Hook para manejar la lógica de inicio de sesión
  const {
    email,
    setEmail,
    password,
    setPassword,
    error,
    handleLogin,
    navigation,
  } = useLoginHook();

  return (
    <View style={loginStyle.container}>
      {/* Contenedor principal de la pantalla */}
      <View style={loginStyle.spacerTop} />
      {/* Espaciador en la parte superior */}
      <TitleComponent text="Sign in" size={32} align="center" />
      {/* Título de la pantalla */}
      {/* Campo para el correo electrónico */}
      <TextInputComponent
        placeholder="Email"
        value={email}
        onChangeText={setEmail} // Actualiza el estado del correo electrónico
        keyboardType="email-address" // Tipo de teclado para correos electrónicos
      />
      {/* Campo para la contraseña */}
      <TextInputComponent
        placeholder="Password"
        value={password}
        onChangeText={setPassword} // Actualiza el estado de la contraseña
        secureTextEntry // Oculta el texto de la contraseña
      />
      {/* Botón para iniciar sesión */}
      <ButtonComponent title="LOGIN" onPress={handleLogin} />
      <View style={loginStyle.link}>
        {/* Contenedor para el enlace */}
        <LinkComponent
          text="Sign up" // Enlace para ir a la pantalla de registro
          onPress={() => navigation.navigate('SignUp')} // Navega a la pantalla de registro
        />
      </View>
      {/* Muestra un mensaje de error si existe */}
      {error ? <ErrorMessageComponent message={error} align="center" /> : null}
    </View>
  );
};

export default LoginScreen;
