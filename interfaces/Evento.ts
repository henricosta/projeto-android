
interface Evento {
    id: string,
    nome: string,
    local: string,
    data: string,
    tipo: 'presencial' | 'online';
}

export default Evento