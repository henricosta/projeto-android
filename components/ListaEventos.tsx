import { FlatList, View } from "react-native"
import EventoListItem from "./EventoListItem"

export default function ListaEventos({ listaEventos, botaoParticipar, setPrecisaRecarregar }) {
    return (
        <FlatList
            data={listaEventos}
            keyExtractor={evento => evento.id}
            renderItem={({ item }) => (
                <EventoListItem setPrecisaRecarregar={setPrecisaRecarregar} botaoParticipar={botaoParticipar} id={item.id} nome={item.name} local={item.location} data={item.date} isOnline={item.is_online} />
            )}
        />
    )
}