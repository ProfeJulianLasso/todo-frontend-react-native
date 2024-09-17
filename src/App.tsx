import {NavigationContainer} from '@react-navigation/native';
import React, {ReactElement} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {appStyle} from './AppStyle';
import RootNavigator from './navigation/RootNavigator';

const App = (): ReactElement => {
  return (
    <SafeAreaView style={appStyle.container}>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default App;
