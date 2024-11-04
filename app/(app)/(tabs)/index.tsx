import ListaEventos from '@/components/ListaEventos';
import { StyleSheet, Text, View, ScrollView, SafeAreaView } from 'react-native';
import LayoutBasicoComTitulo from '@/layouts/LayoutBasico';
import API from '@/common/paths'
import axios from 'axios';

import data from '@/common/Database'
import BotaoFlutuante from '@/components/BotaoFlutuante';
import { Href, router } from 'expo-router';
import { useEffect, useState } from 'react';

export default function HomeScreen() {
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEventos = async () => {
      setLoading(true);
      try {
        const response = await axios.get(API.LISTAR_EVENTOS);
        setEventos(response.data.events); // Assuming response.data contains the list of eventos
        console.log(response.data.events)
      } catch (err: any) {
        setError(err.message); // Capture error if the request fails
      } finally {
        setLoading(false);
      }
    };

    fetchEventos();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ margin: 8, flex: 1 }}>
        { eventos.length > 0 && <ListaEventos listaEventos={eventos} />}
        <BotaoFlutuante onPress={() => router.push('/(app)/adicionar/adicionar' as Href)} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
  },
});