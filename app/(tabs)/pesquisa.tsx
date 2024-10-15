import LayoutBasicoComTitulo from '@/layouts/LayoutBasico';
import { Text, View } from 'react-native';

export default function TelaPesquisa() {
  return (
    <View>
      <LayoutBasicoComTitulo titulo={"Pesquisar"}>
        <Text>tela de pesquisa de eventos</Text>
      </LayoutBasicoComTitulo>
    </View>
  );
}
