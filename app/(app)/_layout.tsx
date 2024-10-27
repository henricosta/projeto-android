import { useSession } from "@/context/AuthContext";
import { Href, Redirect, Stack } from "expo-router";
import { Text } from "react-native";

export default function AppLayout() {
    const { session } = useSession();

    if (!session) {
        return <Redirect href={'/cadastro' as Href} />
    }

    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(tabs)"/>
        </Stack>

    )
}