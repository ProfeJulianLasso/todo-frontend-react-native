import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useMemo} from 'react';
import HeaderButtonComponent from '../components/HeaderButton';
import {useAuth} from '../context/AuthContext';
import AddTaskScreen from '../screens/AddTask';
import LoginScreen from '../screens/Login';
import SignUpScreen from '../screens/SignUp';
import TabNavigator from './TabNavigator';

// Definición de los tipos de parámetros para las pantallas del stack
export type RootStackParamList = {
  Login: undefined; // Pantalla de inicio de sesión
  SignUp: undefined; // Pantalla de registro
  TabNavigator: undefined; // Navegador de pestañas
  AddTask: undefined; // Pantalla para añadir tarea
};

const Stack = createNativeStackNavigator<RootStackParamList>(); // Crea el stack de navegación

const RootNavigator = () => {
  const {isAuthenticated} = useAuth(); // Obtiene el estado de autenticación del contexto
  const headerButton = useMemo(
    () => isAuthenticated && <HeaderButtonComponent />, // Muestra el botón de encabezado solo si está autenticado
    [isAuthenticated],
  );

  return (
    <Stack.Navigator
      initialRouteName={isAuthenticated ? 'TabNavigator' : 'Login'} // Define la ruta inicial según la autenticación
      screenOptions={{
        headerShown: false, // Oculta el encabezado por defecto
      }}>
      {!isAuthenticated ? ( // Si no está autenticado, muestra las pantallas de Login y SignUp
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
        </>
      ) : (
        // Si está autenticado, muestra el TabNavigator y AddTask
        <>
          <Stack.Screen
            name="TabNavigator"
            component={TabNavigator}
            options={{
              title: 'My Awesome App', // Título de la pantalla
              headerShown: true, // Muestra el encabezado
              headerBackVisible: false, // Oculta el botón de retroceso en el encabezado
              headerShadowVisible: false, // Oculta la sombra del encabezado
              headerRight: () => headerButton, // Agrega el botón de encabezado a la derecha
            }}
          />
          <Stack.Screen
            name="AddTask"
            component={AddTaskScreen}
            options={{
              title: 'Add new task', // Título de la pantalla para añadir tarea
              headerShown: true, // Muestra el encabezado
              headerShadowVisible: false, // Oculta la sombra del encabezado
            }}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default RootNavigator;
