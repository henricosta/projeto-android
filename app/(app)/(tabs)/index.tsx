import ListaEventos from '@/components/ListaEventos';
import { StyleSheet, Text, View, ScrollView, SafeAreaView } from 'react-native';
import LayoutBasicoComTitulo from '@/layouts/LayoutBasico';
import API from '@/common/paths'
import axios from 'axios';

import BotaoFlutuante from '@/components/BotaoFlutuante';
import { Href, router, useFocusEffect } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { useSession } from '@/context/SessionContext';

export default function HomeScreen() {
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { session } = useSession();

  useFocusEffect(
    useCallback(() => {
      const fetchEventos = async () => {
        setLoading(true);
        try {
          const response = await axios.get(API.LISTAR_EVENTOS, {
            params: {
              user_id: session.id
            }
          });
          
          setEventos(response.data); // Assume que response.data contém a lista de eventos
          console.log(response.data);
        } catch (err) {
          setError(err.message); // Captura o erro caso a requisição falhe
        } finally {
          setLoading(false);
        }
      };

      fetchEventos();
    }, [])
  );


  return (
    <SafeAreaView style={styles.container}>
      <View style={{ margin: 8, flex: 1 }}>
        { eventos.length > 0 && <ListaEventos listaEventos={eventos} botaoParticipar={false} />}
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