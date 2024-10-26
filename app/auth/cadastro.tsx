import React, { useState, useContext } from 'react';
import { SafeAreaView, ScrollView, Text, TextInput, Alert, TouchableOpacity, Image, ActivityIndicator, StyleSheet } from 'react-native';
import UserContext from '@/context/UserContext';
import { router } from 'expo-router';

// Validação de e-mail
const isValidEmail = (email) => {
  const regex = /\S+@\S+\.\S+/;
  return regex.test(email);
};

// Validação de senha
const isValidPassword = (senha) => {
  return senha.length >= 6;
};

function TelaCadastro() {
  const { users, setUsers }: any = useContext(UserContext);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);

  const cadastrar = async () => {
    if (nome === '' || email === '' || senha === '') {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
    } else if (!isValidEmail(email)) {
      Alert.alert('Erro', 'Por favor, insira um e-mail válido.');
    } else if (!isValidPassword(senha)) {
      Alert.alert('Erro', 'A senha deve ter pelo menos 6 caracteres.');
    } else {
      // TODO: Salvar usuarios no banco de dados 
      setLoading(true);
      const newUser = { nome, email, senha };
      const updatedUsers = [...users, newUser];
      setUsers(updatedUsers);

      setTimeout(() => {
        setLoading(false);
        Alert.alert('Cadastro', 'Cadastro realizado com sucesso!', [
          { text: 'OK', onPress: () => router.replace('/auth/login') },
        ]);
        setNome('');
        setEmail('');
        setSenha('');
      }, 2000);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Image
          source={{
            uri: 'https://cdn-icons-png.flaticon.com/512/9771/9771721.png',
          }}
          style={styles.image}
        />
        <Text style={styles.title}>Cadastro</Text>

        {loading ? (
          <ActivityIndicator size="large" color="#D32F2F" />
        ) : (
          <>
            <TextInput
              style={styles.input}
              placeholder="Nome"
              value={nome}
              onChangeText={setNome}
            />
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
            <TouchableOpacity style={styles.button} onPress={cadastrar}>
              <Text style={styles.buttonText}>Cadastrar</Text>
            </TouchableOpacity>
          </>
        )}

        <Text onPress={() => router.replace('/auth/login')} style={styles.footerText}>
          Já está cadastrado? <Text style={styles.signup}>Faça login. </Text>
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

export default TelaCadastro;