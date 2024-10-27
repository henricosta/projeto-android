import { FlatList, View } from "react-native"
import EventoListItem from "./EventoListItem"

export default function ListaEventos({ listaEventos }) {
    return (
        <FlatList
            data={listaEventos}
            keyExtractor={evento => evento.id}
            renderItem={({ item }) => (
                <EventoListItem id={item.id} nome={item.nome} local={item.local} data={item.data} tipo={item.tipo} />
            )}
        />
    )
}