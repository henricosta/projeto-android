import { Stack } from 'expo-router';

export default function DetalhesLayout() {
    return (
        <Stack>
            <Stack.Screen name='adicionar' options={{
                title: "Adicionar evento",
                headerBackButtonMenuEnabled: true
            }} />
        </Stack>
    )
};