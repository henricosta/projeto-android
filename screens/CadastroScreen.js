import React, { useState, useContext } from 'react';
import { SafeAreaView, ScrollView, Text, TextInput, Alert, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from '../styles/CadastroScreenStyles';
import UserContext from '../context/UserContext';

// Validação de e-mail
const isValidEmail = (email) => {
  const regex = /\S+@\S+\.\S+/;
  return regex.test(email);
};

// Validação de senha
const isValidPassword = (senha) => {
  return senha.length >= 6;
};

function CadastroScreen({ navigation }) {
  const { users, setUsers } = useContext(UserContext);
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
      setLoading(true);
      const newUser = { nome, email, senha };
      const updatedUsers = [...users, newUser];
      setUsers(updatedUsers);
      await AsyncStorage.setItem('users', JSON.stringify(updatedUsers));

      setTimeout(() => {
        setLoading(false);
        Alert.alert('Cadastro', 'Cadastro realizado com sucesso!', [
          { text: 'OK', onPress: () => navigation.navigate('Login') },
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

        <Text onPress={() => navigation.navigate('Login')} style={styles.footerText}>
          Já está cadastrado? <Text style={styles.signup}>Faça login. </Text>
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

export default CadastroScreen;
