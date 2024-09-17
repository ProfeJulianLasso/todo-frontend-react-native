import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {useAuth} from '../context/AuthContext';
import LoginScreen from '../screens/Login';
import SignUpScreen from '../screens/SignUp';
import TabNavigator from './TabNavigator';

export type RootStackParamList = {
  Login: undefined;
  SignUp: undefined;
  TabNavigator: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  const {isAuthenticated} = useAuth();

  return (
    <Stack.Navigator
      initialRouteName={isAuthenticated ? 'TabNavigator' : 'Login'}
      screenOptions={{
        headerShown: false,
      }}>
      {!isAuthenticated ? (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
        </>
      ) : (
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
      )}
    </Stack.Navigator>
  );
};

export default RootNavigator;
