import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const BotaoFlutuante = ({ onPress }) => {
    return (
        <TouchableOpacity style={styles.fab} onPress={onPress}>
            <Text style={styles.fabText}>Adicionar</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        bottom: 40, // Distance from the bottom of the screen
        right: 35, // Distance from the right of the screen
        backgroundColor: '#0f172a', // Button background color
        borderRadius: 8, // Very round borders
        paddingHorizontal: 30, // Horizontal padding for rectangular shape
        paddingVertical: 20, // Vertical padding for button height
        elevation: 6, // Add shadow for Android
        shadowColor: '#000', // Shadow color for iOS
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    fabText: {
        color: '#ffffff', // Text color
        fontSize: 18, // Text size
    },
});

export default BotaoFlutuante;
