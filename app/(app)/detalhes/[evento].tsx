import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import { useLocalSearchParams, useGlobalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import API from '@/common/paths';

const DetalhesEvento = () => {
  const [loading, setLoading] = useState(true)
  const [eventoResponse, setEventoResponse] = useState<any>(null)
  const { evento }: any = useLocalSearchParams();

  useEffect(() => {
    const fetchEventos = async () => {
      setLoading(true);
      try {
        const response = await axios.get(API.GET_EVENTO_DETALHES.replace(':id', evento));
        setEventoResponse(response.data.event); // Assuming response.data contains the list of eventos
        console.log(response.data.event)
      } catch (err: any) {
        alert(err)
      } finally {
        setLoading(false);
      }
    };

    fetchEventos();
  }, []);

  const Evento = () => {
    return (
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{eventoResponse.name}</Text>
        <Text style={styles.description}>{eventoResponse.description}</Text>
        <Text style={styles.locality}>{eventoResponse.location}</Text>
        <View style={styles.mapPlaceholder}>
          <Text>Map Placeholder</Text>
        </View>
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      {eventoResponse && <Evento />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f8f8',
  },
  detailsContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    marginBottom: 8,
  },
  locality: {
    fontSize: 16,
    marginBottom: 16,
  },
  mapPlaceholder: {
    height: 200,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
});

export default DetalhesEvento;
