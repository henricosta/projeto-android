import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, CheckBox, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import axios from 'axios';
import API from '@/common/paths';
import ListaEventos from '@/components/ListaEventos';
import { useSession } from '@/context/SessionContext';

export default function SearchScreen() {
  const [nome, setNome] = useState('');
  const [local, setLocal] = useState('');
  const [isOnline, setIsOnline] = useState(false);
  const [isPresencial, setIsPresencial] = useState(false);
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [precisaRecarregar, setPrecisaRecarregar] = useState(false)

  const { session } = useSession()

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API.PESQUISAR_EVENTOS, {
        params: {
          nome,
          local,
          is_online: isOnline,
          is_presencial: isPresencial,
          user_id: session.id
        }
      });
      console.log(response.data.events)
      setEventos(response.data.events);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log('precisa recarregar')
    if (precisaRecarregar) {
      handleSearch();
      setPrecisaRecarregar(false); // Reset to false after calling
    }
  }, [precisaRecarregar]);


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.formularioContainer}>
        <Text style={styles.label}>Nome</Text>
        <TextInput
          style={styles.input}
          placeholder="Nome do Evento"
          value={nome}
          onChangeText={setNome}
        />

        <Text style={styles.label}>Local</Text>
        <TextInput
          style={styles.input}
          placeholder="Local do Evento"
          value={local}
          onChangeText={setLocal}
        />

        <View style={styles.checkboxContainer}>
          <View style={styles.checkboxItem}>
            <CheckBox value={isOnline} onValueChange={setIsOnline} />
            <Text style={styles.checkboxLabel}>Online</Text>
          </View>
          <View style={styles.checkboxItem}>
            <CheckBox value={isPresencial} onValueChange={setIsPresencial} />
            <Text style={styles.checkboxLabel}>Presencial</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.botaoPesquisar} onPress={handleSearch}>
        <Text style={styles.textoBotaoPesquisar}>Pesquisar</Text>
      </TouchableOpacity>

      {loading && <Text>Carregando...</Text>}
      {error && <Text>Erro: {error}</Text>}

      {eventos.length > 0 && (
        <ScrollView style={{ paddingHorizontal: '10px', paddingVertical: '10px' }}>
          <ListaEventos setPrecisaRecarregar={setPrecisaRecarregar} listaEventos={eventos} botaoParticipar={true} />
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  input: {
    height: 40,
    backgroundColor: 'white',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: 'bold'
  },
  checkboxContainer: {
    marginBottom: 10
  },
  checkboxItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6,
  },
  checkboxLabel: {
    marginLeft: 5,
    fontSize: 16,
  },
  results: { marginTop: 20 },
  eventItem: { fontSize: 16, padding: 5 },
  botaoPesquisar: {
    padding: 15,
    marginHorizontal: 10,
    backgroundColor: '#1e293b'
  },
  textoBotaoPesquisar: {
    color: 'white',
    textAlign: 'center'
  },
  formularioContainer: {
    marginHorizontal: 10,
    paddingTop: 15,
  }
});
