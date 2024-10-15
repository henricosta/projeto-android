import Evento from '@/interfaces/Evento';
import ListaEventos from '@/components/ListaEventos';
import { StyleSheet, Text, View } from 'react-native';
import HeaderPagina from '@/components/HeaderPagina';
import LayoutBasicoComTitulo from '@/layouts/LayoutBasico';

import data from '@/common/Database'
import { ScrollView } from 'react-native-gesture-handler';
import BotaoFlutuante from '@/components/BotaoFlutuante';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <LayoutBasicoComTitulo titulo={"Meus eventos"}>
        <ScrollView contentContainerStyle={styles.scrollView}>
          <ListaEventos listaEventos={data} />
        </ScrollView>
        <BotaoFlutuante onPress={() => alert('pressed')}/>
      </LayoutBasicoComTitulo>
    </View>
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