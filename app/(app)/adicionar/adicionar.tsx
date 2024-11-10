import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Switch } from 'react-native';
// import eventos from '@/data/eventos'
import { router } from 'expo-router';
import axios from 'axios';
import API from '@/common/paths';
import { useSession } from '@/context/SessionContext';

const AdicionarEvento = () => {
    const [eventName, setEventName] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [eventDescription, setEventDescription] = useState('');
    const [eventLocation, setEventLocation] = useState('');
    const [isOnline, setIsOnline] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const { session } = useSession()

    const handleAddEvent = async () => {
        const eventData = {
            name: eventName,
            description: eventDescription,
            location: eventLocation,
            date: eventDate,
            is_online: isOnline,
            created_by: session.id,
        };

        setLoading(true); // Start loading

        try {
            const response = await axios.post(API.CREATE_EVENTO, eventData); // Send data to create the event
            console.log('Event created successfully:', response.data); // You can handle the response as needed
        } catch (err: any) {
            setError(err.message); // Capture error if the request fails
        } finally {
            setLoading(false); // End loading
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Event Name</Text>
            <TextInput
                style={styles.input}
                value={eventName}
                onChangeText={setEventName}
                placeholder="Enter event name"
            />
            <Text style={styles.label}>Event Date</Text>
            <TextInput
                style={styles.input}
                value={eventDate}
                onChangeText={setEventDate}
                placeholder="Enter event date"
            />
            <Text style={styles.label}>Event Description</Text>
            <TextInput
                style={styles.input}
                value={eventDescription}
                onChangeText={setEventDescription}
                placeholder="Enter event description"
            />
            <Text style={styles.label}>Event Location</Text>
            <TextInput
                style={styles.input}
                value={eventLocation}
                onChangeText={setEventLocation}
                placeholder="Enter event location"
            />
            <Text style={styles.label}>Is Online</Text>
            <View style={styles.switchContainer}>
                <Switch
                    value={isOnline}
                    onValueChange={setIsOnline}
                />
                <Text>{isOnline ? 'Yes' : 'No'}</Text>
            </View>
            <Button title="Add Event" onPress={() => handleAddEvent()} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 16,
        paddingHorizontal: 8,
    },
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
});

export default AdicionarEvento;
