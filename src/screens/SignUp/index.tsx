import React, {ReactElement} from 'react';
import {ActivityIndicator, View} from 'react-native';
import ButtonComponent from '../../components/Button';
import ErrorMessageComponent from '../../components/ErrorMessage';
import LinkComponent from '../../components/Link';
import TextInputComponent from '../../components/TextInput';
import TitleComponent from '../../components/Title';
import {signUpStyle} from './SignUpStyle';
import {useSignUpHook} from './useSignUpHook';

// Componente de pantalla de registro
const SignUpScreen = (): ReactElement => {
  // Hook personalizado para manejar la lógica de registro
  const {
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    errorPassword,
    error,
    loading,
    handleRegister,
    navigation,
  } = useSignUpHook();

  return (
    <View style={signUpStyle.container}>
      {/* Contenedor principal de la pantalla */}
      <View style={signUpStyle.spacerTop} />
      {/* Espaciador en la parte superior */}
      <TitleComponent text="Sign up" size={32} align="center" />
      {/* Título de la pantalla */}
      {loading ? ( // Si está cargando, muestra un indicador de actividad
        <ActivityIndicator size="large" color="#007bff" />
      ) : (
        <>
          {/* Si no está cargando, muestra los campos de entrada */}
          <TextInputComponent
            placeholder="Name" // Campo para el nombre
            value={name}
            onChangeText={setName}
          />
          <TextInputComponent
            placeholder="Email" // Campo para el correo electrónico
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address" // Tipo de teclado para correos electrónicos
          />
          <TextInputComponent
            placeholder="Password" // Campo para la contraseña
            value={password}
            onChangeText={setPassword}
            secureTextEntry // Oculta el texto de la contraseña
          />
          <TextInputComponent
            placeholder="Confirm Password" // Campo para confirmar la contraseña
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry // Oculta el texto de la contraseña
          />
          <ButtonComponent title="REGISTER" onPress={handleRegister} />
          {/* Botón para registrar */}
          <View style={signUpStyle.link}>
            {/* Contenedor para el enlace */}
            <LinkComponent
              text="Already have an account? Sign in" // Enlace para ir a la pantalla de inicio de sesión
              onPress={() => navigation.navigate('Login')}
            />
          </View>
        </>
      )}
      {!!errorPassword && ( // Si hay un error de contraseña, muestra el mensaje de error
        <ErrorMessageComponent message={errorPassword} align="right" />
      )}
      {error && <ErrorMessageComponent message={error} align="center" />}
      {/* Si hay un error, muestra el mensaje de error */}
    </View>
  );
};

export default SignUpScreen;
