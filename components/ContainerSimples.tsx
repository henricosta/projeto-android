import React from 'react';
import { View, StyleSheet } from 'react-native';

const ContainerSimples = ({ children }) => {
    return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
    container: {
        marginRight: 1,
        marginVertical: 4,
        padding: 16,
        backgroundColor: '#FFFFFF',
        borderRadius: 5,
        borderWidth: 1, 
        borderColor: '#000000', 
    },
});

export default ContainerSimples;