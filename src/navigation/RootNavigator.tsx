import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import LoginScreen from '../screens/Login';
import TabNavigator from './TabNavigator';

export type RootStackParamList = {
  Login: undefined;
  TabNavigator: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={'Login'}
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen
        name="TabNavigator"
        component={TabNavigator}
        options={{
          title: 'My Awesome App',
          headerShown: true,
          headerBackVisible: false,
          headerShadowVisible: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default RootNavigator;
