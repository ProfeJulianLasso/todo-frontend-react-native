import {StyleSheet} from 'react-native';

export const textInputStyle = StyleSheet.create({
  container: {
    marginBottom: 12,
  },
  label: {
    fontSize: 16,
    marginBottom: 4,
    color: '#333',
  },
  input: {
    fontSize: 16,
    height: 40,
    borderColor: '#c3c3c3',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
});
