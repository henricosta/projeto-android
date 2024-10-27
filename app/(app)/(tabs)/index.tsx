import ListaEventos from '@/components/ListaEventos';
import { StyleSheet, Text, View, ScrollView, SafeAreaView } from 'react-native';
import LayoutBasicoComTitulo from '@/layouts/LayoutBasico';

import data from '@/common/Database'
import BotaoFlutuante from '@/components/BotaoFlutuante';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ margin: 8, flex: 1 }}>
        <ListaEventos listaEventos={data} />
        <BotaoFlutuante onPress={() => alert('pressed')} />
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