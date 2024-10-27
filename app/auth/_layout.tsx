import { Stack } from 'expo-router';

export default function DetalhesLayout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name='login' />
            <Stack.Screen name='cadastro' />
        </Stack>
    )
};