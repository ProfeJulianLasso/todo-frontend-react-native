import {NavigationContainer} from '@react-navigation/native';
import React, {ReactElement} from 'react';
import {SafeAreaView} from 'react-native';
import {appStyle} from './AppStyle';
import {AuthProvider} from './context/AuthContext';
import RootNavigator from './navigation/RootNavigator';

// Componente principal de la aplicación
const App = (): ReactElement => {
  return (
    // Proveedor de autenticación para gestionar el estado de login/logout en toda la app
    <AuthProvider>
      {/* SafeAreaView asegura que el contenido respete las áreas seguras del dispositivo (como la barra de estado en iOS) */}
      <SafeAreaView style={appStyle.container}>
        {/* NavigationContainer es el contenedor que gestiona la navegación en la app */}
        <NavigationContainer>
          {/* RootNavigator define la estructura de navegación principal de la app */}
          <RootNavigator />
        </NavigationContainer>
      </SafeAreaView>
    </AuthProvider>
  );
};

export default App;
