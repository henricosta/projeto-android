import { View, Text, SafeAreaView } from 'react-native';
import { useLocalSearchParams, useGlobalSearchParams } from 'expo-router';

const DetalhesEvento = () => {
  const { evento } = useLocalSearchParams();

  return (
    <SafeAreaView>
        <View>
          <Text>detalhes do evento: {evento}</Text>
        </View>
    </SafeAreaView>
  );
};

export default DetalhesEvento;
