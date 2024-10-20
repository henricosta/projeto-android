import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1,
  },
  image: {
    height: 100,
    width: 100,
    marginBottom: 30,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
    width: '80%',
  },
  button: {
    backgroundColor: '#D32F2F',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    width: '80%',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  footerText: {
    marginTop: 20,
    fontSize: 16,
    color: '#333',
  },
  signup: {
    color: '#D32F2F',
    fontWeight: 'bold',
  },
});
