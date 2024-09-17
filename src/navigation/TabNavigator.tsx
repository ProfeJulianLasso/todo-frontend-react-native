import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import React from 'react';
import {View} from 'react-native';
import CompletedScreen from '../screens/Completed';
import InProgressScreen from '../screens/InProgress';
import ToDoScreen from '../screens/ToDo';
import {tabNavigatorStyle} from './TabNavigatorStyle';

export type TabParamList = {
  ToDo: undefined;
  InProgress: undefined;
  Completed: undefined;
};

const Tab = createMaterialTopTabNavigator<TabParamList>();

const TabNavigator = (): React.ReactElement => {
  return (
    <View style={tabNavigatorStyle.container}>
      <Tab.Navigator
        initialRouteName="ToDo"
        screenOptions={({route}) => ({
          tabBarLabel: route.name,
          key: route.key,
          tabBarIndicatorStyle: {backgroundColor: '#007bff'},
          tabBarStyle: {backgroundColor: '#fff'},
        })}>
        <Tab.Screen
          name="ToDo"
          component={ToDoScreen}
          options={{tabBarLabel: 'To Do'}}
        />
        <Tab.Screen
          name="InProgress"
          component={InProgressScreen}
          options={{tabBarLabel: 'In Progress'}}
        />
        <Tab.Screen
          name="Completed"
          component={CompletedScreen}
          options={{tabBarLabel: 'Completed'}}
        />
      </Tab.Navigator>
    </View>
  );
};

export default TabNavigator;
