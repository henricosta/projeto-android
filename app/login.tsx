import React, { useState, useContext } from 'react';
import { SafeAreaView, ScrollView, Text, TextInput, Alert, TouchableOpacity, Image, ActivityIndicator, StyleSheet } from 'react-native';
import { UserContext } from '@/context/UserContext';
import { Href, Link, router } from 'expo-router';

function TelaLogin() {
  const { users }: any = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);

  const login = () => {
    const user = users.find((user) => user.email === email && user.senha === senha);

    if (user) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    } else {
      Alert.alert('Erro', 'E-mail ou senha incorretos.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Image
          source={{
            uri: 'https://static.vecteezy.com/ti/vetor-gratis/t2/439863-icone-de-usuarios-de-gratis-vetor.jpg',
          }}
          style={styles.image}
        />
        <Text style={styles.title}>Login</Text>

        {loading ? (
          <ActivityIndicator size="large" color="#D32F2F" />
        ) : (
          <>
            <TextInput
              style={styles.input}
              placeholder="E-mail"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
            <TextInput
              style={styles.input}
              placeholder="Senha"
              value={senha}
              onChangeText={setSenha}
              secureTextEntry
            />
            <TouchableOpacity style={styles.button} onPress={login}>
              <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>
          </>
        )}

        <Text style={styles.footerText}>
          <Link href={"/cadastro" as Href}>
            Ainda não está cadastrado? <Text style={styles.signup}>Registre-se. </Text>
          </Link>
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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

export default TelaLogin;