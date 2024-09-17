import {StyleSheet} from 'react-native';

export const tabNavigatorStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
  floatingButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#007bff',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
  },
  floatingButtonText: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
  },
});
