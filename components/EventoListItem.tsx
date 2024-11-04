import { StyleSheet, Text, View } from "react-native"
import ContainerSimples from "./ContainerSimples"
import { Href, Link } from "expo-router";

const EventoListItem = ({ id, nome, local, data, isOnline }) => {
    return (
        <ContainerSimples>
            <Link href={`(app)/detalhes/${id}` as Href}>
                <View>
                    <Text style={styles.title}>{nome}</Text>
                    <Text style={styles.description}>{local}</Text>
                    <Text style={styles.date}>{data}</Text>
                    <Text style={styles.tipo}>{isOnline === true ? 'Online' : 'Presencial'}</Text>
                </View>
            </Link>
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