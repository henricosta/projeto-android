import { Stack } from 'expo-router';

export default function DetalhesLayout() {
    return (
        <Stack>
            <Stack.Screen name='[evento]' options={{
                title: "Detalhes",
                headerBackButtonMenuEnabled: true
            }} />
        </Stack>
    )
};