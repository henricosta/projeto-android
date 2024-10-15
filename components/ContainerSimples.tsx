import React from 'react';
import { View, StyleSheet } from 'react-native';

const ContainerSimples = ({ children }) => {
    return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
    container: {
        margin: 5,
        padding: 16,
        backgroundColor: '#FFFFFF',
        borderRadius: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5,
    },
});

export default ContainerSimples;