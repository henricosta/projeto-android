import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface HeaderPaginaProps {
    titulo: string;
}

const HeaderPagina = ({ titulo }: HeaderPaginaProps) => {
    return (
        <View style={styles.header}>
            <Text style={styles.headerText}>{titulo}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 60,
        backgroundColor: '#fff',
        justifyContent: 'center',
        elevation: 5,
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        paddingHorizontal: 20
    },
});

export default HeaderPagina;