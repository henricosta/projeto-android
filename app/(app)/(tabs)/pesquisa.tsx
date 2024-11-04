import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, CheckBox, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import axios from 'axios';
import API from '@/common/paths';

export default function SearchScreen() {
  const [nome, setNome] = useState('');
  const [local, setLocal] = useState('');
  const [isOnline, setIsOnline] = useState(false);
  const [isPresencial, setIsPresencial] = useState(false);
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API.PESQUISAR_EVENTOS, {
        params: {
          nome,
          local,
          is_online: isOnline,
          is_presencial: isPresencial,
        }
      });
      setEventos(response.data.events);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={styles.label}>Pesquisar por Nome</Text>
        <TextInput
          style={styles.input}
          placeholder="Nome do Evento"
          value={nome}
          onChangeText={setNome}
        />

        <Text style={styles.label}>Pesquisar por Local</Text>
        <TextInput
          style={styles.input}
          placeholder="Local do Evento"
          value={local}
          onChangeText={setLocal}
        />

        <View style={styles.checkboxContainer}>
          <CheckBox value={isOnline} onValueChange={setIsOnline} />
          <Text style={styles.label}>Online</Text>
          <CheckBox value={isPresencial} onValueChange={setIsPresencial} />
          <Text style={styles.label}>Presencial</Text>
        </View>

        <Button title="Pesquisar" onPress={handleSearch} />
        
        {loading && <Text>Carregando...</Text>}
        {error && <Text>Erro: {error}</Text>}
        
        {eventos.length > 0 && (
          <View style={styles.results}>
            {eventos.map((evento, index) => (
              <Text key={index} style={styles.eventItem}>{evento.name}</Text>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  scrollView: { flexGrow: 1 },
  input: { height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingLeft: 8 },
  label: { fontSize: 16, marginBottom: 5 },
  checkboxContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  results: { marginTop: 20 },
  eventItem: { fontSize: 16, padding: 5 }
});
