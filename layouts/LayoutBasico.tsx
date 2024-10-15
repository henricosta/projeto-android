import HeaderPagina from '@/components/HeaderPagina';
import React from 'react';
import { View, StyleSheet } from 'react-native';

export default function LayoutBasicoComTitulo({ titulo, children }) {
    return (
        <View style={styles.container}>
            <HeaderPagina titulo={titulo} />
            <View style={styles.content}>
                {children}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        padding: 16,
        marginTop: 50
    },
});