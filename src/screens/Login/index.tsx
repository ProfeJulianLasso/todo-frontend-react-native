import {NavigationProp, useNavigation} from '@react-navigation/native';
import React, {ReactElement} from 'react';
import {Button, Text, View} from 'react-native';
import Config from 'react-native-config';
import {RootStackParamList} from '../../navigation/RootNavigator';

const LoginScreen = (): ReactElement => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  console.log('LoginScreen', Config.HOST);

  return (
    <View>
      <Text>Login Screen</Text>
      <Button
        title="Login"
        onPress={() => navigation.navigate('TabNavigator')}
      />
    </View>
  );
};

export default LoginScreen;
