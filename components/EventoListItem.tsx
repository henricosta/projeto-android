import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import ContainerSimples from "./ContainerSimples"
import { Href, Link } from "expo-router";
import axios from "axios";
import API from "@/common/paths";
import { useSession } from "@/context/SessionContext";

const EventoListItem = ({ id, nome, local, data, isOnline, botaoParticipar, setPrecisaRecarregar }) => {

    const { session } = useSession()

    const participarEvento = async () => {
        try {
            console.log("API URL:", API.PARTICIPAR_EVENTO);  // Verifique se a URL está correta
            const response = await axios.post(API.PARTICIPAR_EVENTO, {
                event_id: id,
                user_id: session.id
            });
            console.log(response); 
            setPrecisaRecarregar(true)
        } catch (err: any) {
            console.log(err)
            alert('Erro ao participar de evento:' + err.message)
        }
    }

    return (
        <ContainerSimples>
            <Link href={`(app)/detalhes/${id}` as Href}>
                <View>
                    <Text style={styles.title}>{nome}</Text>
                    <Text style={styles.description}>{local}</Text>
                    <Text style={styles.date}>{data}</Text>
                    <Text style={styles.tipo}>{isOnline == true ? 'Online' : 'Presencial'}</Text>
                </View>
            </Link>
            {botaoParticipar &&
                <View style={styles.btnParticiparContainer}>
                    <TouchableOpacity
                        style={styles.btnParticipar}
                        onPress={() => {
                            participarEvento()
                        }}
                    >
                        <Text>Participar</Text>
                    </TouchableOpacity>
                </View>
            }
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
    btnParticiparContainer: {
        position: 'absolute',
        top: 20,
        right: 10,
        zIndex: 1,
    },
    btnParticipar: {
        backgroundColor: '#4ade80',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        color: 'black',
        fontWeight: 'bold',
        fontFamily: 'System'
    },
});

export default EventoListItem