import React, { useState, useContext } from 'react';
import { SafeAreaView, ScrollView, Text, TextInput, Alert, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { styles } from '../styles/LoginScreenStyles';
import UserContext from '../context/UserContext';

function LoginScreen({ navigation }) {
  const { users } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);

  const login = () => {
    const user = users.find((user) => user.email === email && user.senha === senha);

    if (user) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        Alert.alert('Login', 'Login realizado com sucesso!', [
          { text: 'OK', onPress: () => navigation.navigate('UserManagement') },
        ]);
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

        <Text onPress={() => navigation.navigate('Cadastro')} style={styles.footerText}>
          Ainda não está cadastrado? <Text style={styles.signup}>Registre-se. </Text>
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

export default LoginScreen;
