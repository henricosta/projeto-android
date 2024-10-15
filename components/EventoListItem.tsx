import { StyleSheet, Text } from "react-native"
import ContainerSimples from "./ContainerSimples"

const EventoListItem = ({ nome, local, data, tipo }) => {
    const formattedDate = new Date(data).toLocaleString();

    return (
        <ContainerSimples>
            <Text style={styles.title}>{nome}</Text>
            <Text style={styles.description}>{local}</Text>
            <Text style={styles.date}>{formattedDate}</Text>
            <Text style={styles.tipo}>{tipo === 'presencial' ? 'Presencial' : 'Online'}</Text>
        </ContainerSimples>
    );
};

const styles = StyleSheet.create({
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    description: {
        fontSize: 14,
        color: '#555',
    },
    date: {
        fontSize: 12,
        color: '#888',
    },
    tipo: {
        fontSize: 12,
        fontStyle: 'italic',
        color: '#333',
    },
});

export default EventoListItem