import React from "react";
import LayoutBasicoComTitulo from "@/layouts/LayoutBasico";
import { View, Text, SafeAreaView, Button, StyleSheet } from "react-native";

const PerfilScreen = () => {
    // Dados do usuário simulados para exemplo
    const userData = {
        name: "João Silva",
        email: "joao.silva@email.com",
    };

    const handleLogout = () => {
        // Função de logout simulada
        console.log("Usuário deslogado");
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.profileContainer}>
                <Text style={styles.label}>Nome:</Text>
                <Text style={styles.value}>{userData.name}</Text>

                <Text style={styles.label}>Email:</Text>
                <Text style={styles.value}>{userData.email}</Text>

                <View style={styles.logoutButton}>
                    <Button title="Logout" onPress={handleLogout} color="#FF5C5C" />
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    profileContainer: {
        padding: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 4,
    },
    value: {
        fontSize: 16,
        marginBottom: 12,
    },
    logoutButton: {
        marginTop: 20,
    },
});

export default PerfilScreen;