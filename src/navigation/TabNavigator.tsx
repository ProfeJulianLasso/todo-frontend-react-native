import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import CompletedScreen from '../screens/Completed';
import InProgressScreen from '../screens/InProgress';
import ToDoScreen from '../screens/ToDo';
import {RootStackParamList} from './RootNavigator';
import {tabNavigatorStyle} from './TabNavigatorStyle';

// Definición de los parámetros para las pestañas
export type TabParamList = {
  ToDo: undefined; // Pantalla de tareas por hacer
  InProgress: undefined; // Pantalla de tareas en progreso
  Completed: undefined; // Pantalla de tareas completadas
};

const Tab = createMaterialTopTabNavigator<TabParamList>(); // Crea el navegador de pestañas

const TabNavigator = (): React.ReactElement => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>(); // Hook para la navegación

  return (
    <View style={tabNavigatorStyle.container}>
      {/* Contenedor principal de las pestañas */}
      <Tab.Navigator
        initialRouteName="ToDo" // Ruta inicial establecida en "ToDo"
        screenOptions={({route}) => ({
          tabBarLabel: route.name, // Etiqueta de la pestaña basada en el nombre de la ruta
          key: route.key, // Clave única para la pestaña
          tabBarIndicatorStyle: {backgroundColor: '#007bff'}, // Estilo del indicador de pestaña
          tabBarStyle: {backgroundColor: '#fff'}, // Estilo del fondo de la barra de pestañas
        })}>
        {/* Pantalla para tareas por hacer */}
        <Tab.Screen
          name="ToDo"
          component={ToDoScreen}
          options={{tabBarLabel: 'To Do'}} // Etiqueta de la pestaña
        />
        {/* Pantalla para tareas en progreso */}
        <Tab.Screen
          name="InProgress"
          component={InProgressScreen}
          options={{tabBarLabel: 'In Progress'}} // Etiqueta de la pestaña
        />
        {/* Pantalla para tareas completadas */}
        <Tab.Screen
          name="Completed"
          component={CompletedScreen}
          options={{tabBarLabel: 'Completed'}} // Etiqueta de la pestaña
        />
      </Tab.Navigator>
      {/* Botón flotante para añadir una nueva tarea */}
      <TouchableOpacity
        style={tabNavigatorStyle.floatingButton}
        onPress={() => navigation.navigate('AddTask')}>
        <Text style={tabNavigatorStyle.floatingButtonText}>+</Text>
        {/* Texto del botón */}
      </TouchableOpacity>
    </View>
  );
};

export default TabNavigator;
